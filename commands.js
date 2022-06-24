const bot = require("./commands");

const commandFunctions = () => {
  bot.onText(/\/exit/, (msg) => {
    step -= 1;
    bot.sendMessage(
      msg.message.chat.id,
      "Bitta oldingiz operatsiyaga qaytdiz:"
    );
  });
  bot.onText(/\/start/, (msg) => {
    // console.log("salom");
    message =
      "Assalamu Aleykum, Botimizga Xush kelibsiz!\n Ism-familyangizni kiriting: ";
    bot.sendMessage(msg.chat.id, message);
    step = 1;
  });
};

module.exports = commandFunctions;
