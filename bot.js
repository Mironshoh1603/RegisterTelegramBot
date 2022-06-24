const TelegramBot = require("node-telegram-bot-api");

const token = "2078043643:AAGrVNggsdhnMSoVkjkCjzx70eEiqfun3u4";

const bot = new TelegramBot(token, { polling: true });
module.exports = bot;
