const fetch = require("node-fetch");
const chalk = require("chalk");
const rl = require("readline-sync");
const figlet = require("figlet");

const mulai = (auth, type) => new Promise((resolve, reject) => {
  fetch("http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/" + type, {
    method: "GET",
    headers: {
      "authorization": auth
    }
  })
  .then(res => res.text())
  .then(data=> {
    resolve(data);
  })
  .catch(err => {
    reject(err);
   });
});

function title() {
  console.log(chalk.bold.green(figlet.textSync("STUMBLE", {
    font: "standard",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true
  })));
  console.log(chalk.green(`\t${chalk.yellow("[ Created By Lindow ]")}\n\n${chalk.blue("Project Name")} : ${chalk.white("Stumble Guys Cheat")}\n${chalk.blue("Contact Me On Whatsapp")} : ${chalk.white("+43 650 8888856888")}\n${chalk.blue("Github")} : ${chalk.white("https://github.com/Idxxlism")}`));
};

(async () => {
  const start = async function () {
    console.clear();
    title();
    console.log(chalk.red("\nPERINGATAN"))
    console.log("Script atau cheat ini dapat menyebabkan akun stumble atau perangkat anda di banned permanent. Creator tidak bertanggung jawab atas apa yang akan terjadi pada akun kalian.");
    console.log(chalk.green("\nHOW TO GET AUTH TOKEN"))
    console.log("1. instal HTTP Cannary atau apk Traffic Intercept apa pun ke ponsel kamu\n2. login stumble guys! kemudian mainkan sampai Anda mendapat Peringkat 1 atau menang di ronde terakhir\n3. jika kamu sudah mendapat peringkat 1, klaim hadiahnya dan pastikan mahkota kamu meningkat\n4. buka HTTP Cannary dan cari http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/3\n5. pergi ke request tab lalu copy authorization value\n6. Setelah menjalankan script, tutup game stumble mu & jangan masuk kembali karena dapat menyebabkan token")
    console.log(chalk.yellow("\n[+] TIPE RONDE [+]"))
    const round = rl.question("1. Menang di ronde ke dua\n2. Tereliminasi di ronde terakhir\n3. Menang di semua ronde\n\nPilih tipe ronde kamu : ");
    if (round == "1") {
      type = "1";
    } else if (round == "2") {
      type = "2";
    } else if (round == "3") {
      type = "3";
    } else {
      console.log(chalk.red("\n[+] Jawaban salah ! tolong ketik \"1\", \"2\", atau \"3\""));
      start();
    }
    const authorized = rl.question("\n[+] Masukan auth token kamu : ");
    console.log("");
    while (true) {
      const res = await mulai(authorized, type);
      if (!res) {
        console.log(chalk.red("\r[ LOG ] Auth token kamu salah atau expired !"));
        break;
      } else if (res.includes("User")) {
        const data = JSON.parse(res);
        const { Username, Country, SkillRating, Crowns } = data.User
        console.log(chalk.green(`\r[ LOG ] Nickname : ${Username} | Country : ${Country} | ${chalk.blue(`Trophy : ${SkillRating}`)} | ${chalk.blue(`Crown : ${Crowns}`)}`));
      } else if (res == "BANNED") {
        console.log(chalk.red("[ LOG ] Akun anda telah di banned !"));
        break;
      } else if (res == "SERVER_ERROR") {
        continue;
      }
    }
  }
  start();
})();