const bot = require("./bot");
const user = require("./userFinder");
const botArr = require("./data");

const commandFunctions = () => {
  bot.onText(/\/exit/, (msg) => {
    user(msg).step -= 1;
    bot.sendMessage(msg.chat.id, "Bitta oldingiz operatsiyaga qaytdiz:");
  });
  bot.onText(/\/start/, (msg) => {
    // console.log("salom");
    let message =
      "Assalamu Aleykum, Botimizga Xush kelibsiz!\n Ism-familyangizni kiriting: ";
    bot.sendMessage(msg.chat.id, message);

    user(msg.chat.id)["step"] = 1;
    
  });
};

module.exports = commandFunctions;
