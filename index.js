const bot = require("./bot");
const commandFunctions = require("./commands");
const user = require("./userFinder");
const botArr = require("./data");

const app = function () {
  bot.on("message", (msg) => {
    console.log(msg.text);
    if (!user(msg.from.id)) {
      botArr.push({ id: msg.from.id, username: msg.from.username, step: 0 });
    }

    const chatId = msg.chat.id;
    if (msg.text !== "/start") {
      console.log("ISHLADI");
      const step = user(chatId).step;
      let userObj = user(chatId);
      if (step === 1) {
        // console.log(msg);
        userObj.name = msg.text;

        var options = {
          reply_markup: JSON.stringify({
            keyboard: [[{ text: "Share Number", request_contact: true }]],
            resize_keyboard: true,
            one_time_keyboard: true,
          }),
        };
        message = `Sizning Ismingiz:${userObj.name}.\n Endi Telefon raqamingizni kiriting`;
        bot.sendMessage(chatId, message, options);
        user(chatId).step = 2;
      } else if (step === 2) {
        userObj.phoneNumber = msg.contact.phone_number;
        // telefon raqamni kiritgandan keyin
        var options = {
          reply_markup: JSON.stringify({
            keyboard: [[{ text: "Share Location", request_location: true }]],
            resize_keyboard: true,
            one_time_keyboard: true,
          }),
        };
        message = `Sizning ismingiz ${userObj.name}.\nTelefon raqamingiz ${userObj.phoneNumber}.\n Endi Joylashgan o'rningizni jo'nating:`;
        bot.sendMessage(chatId, message, options);
        user(chatId).step = 3;
      } else if (step === 3) {
        userObj.locationAddress = msg.location;
        var options = {
          reply_markup: JSON.stringify({
            remove_keyboard: true,
          }),
        };
        message = `Sizning ismingiz ${userObj.name}.\nTelefon raqamingiz ${userObj.phoneNumber}.\n Endi Joylashgan o'rningizni ${userObj.locationAddress.latitude} ${userObj.locationAddress.longitude}\nEndi Yoshingizni kiriting:`;
        bot.sendMessage(chatId, message, options);
        user(chatId).step = 4;
      }
      //Courslarni  Jo'natish
      else if (step === 4) {
        userObj.age = msg.text;
        var options = {
          reply_markup: JSON.stringify({
            keyboard: [
              [{ text: "FullStack Bootcamp" }],
              [{ text: "Backend Bootcamp" }],
              [{ text: "Mobile Bootcamp" }],
              [{ text: "Front-End Bootcamp" }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
          }),
        };
        message = `Sizning ismingiz ${userObj.name}.\nTelefon raqamingiz ${userObj.phoneNumber}.\n Endi Joylashgan o'rningizni ${userObj.locationAddress.latitude} ${userObj.locationAddress.longitude}\nYoshingiz ${userObj.age}\nEndi Bizning kurslarimizdan birini tanlang:`;

        bot.sendMessage(chatId, message, options);
        user(chatId).step = 5;
      }
      // Universitetni olish
      else if (step === 5) {
        userObj.course = msg.text;

        var options = {
          reply_markup: JSON.stringify({
            remove_keyboard: true,
          }),
        };
        message = `Sizning ismingiz ${userObj.name}.\nTelefon raqamingiz ${userObj.phoneNumber}.\n Endi Joylashgan o'rningizni ${userObj.locationAddress.latitude} ${userObj.locationAddress.longitude}\nYoshingiz ${userObj.age}\nSiz ${userObj.course}ni tanladingiz! \nEndi Universitetingizni kiriting:`;

        bot.sendMessage(chatId, message);
        user(chatId).step = 6;
      }
      // check Data
      else if (step === 6) {
        console.log(msg);
        userObj.university = msg.text;
        const options = {
          reply_to_message_id: msg.message_id,
          parse_mode: "html",
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: "Tasdiqlayman", callback_data: "Checked" }],
            ],
          }),
        };

        message = `Sizning ismingiz ${userObj.name}.\nTelefon raqamingiz ${userObj.phoneNumber}.\n Endi Joylashgan o'rningizni ${userObj.locationAddress.latitude} ${userObj.locationAddress.longitude}\nYoshingiz ${userObj.age}\nSiz ${userObj.course}ni tanladingiz! \nSiz Universitetingiz ${userObj.university}\n
      Ma'lumotlar to'gri bo'lsa Tasdiqlashni bosing `;

        bot.sendMessage(chatId, message, options);
        user(chatId).step = 7;
      }
    }
  });

  // callback_data
  bot.on("callback_query", function (query) {
    // increment counter when everytime the button is pressed
    console.log(query);
    if (query.data === "Checked") {
      console.log(query, "qalesan");
      bot.sendMessage(query.message.chat.id, "Ma'lumotlar tasdiqlandi");
    }
  });

  bot.on("polling_error", (error) => {
    console.log(error); // => 'EFATAL'
  });

  // process.on("uncaughtException", function (error) {
  //   console.log("\x1b[31m", "Exception: ", error, "\x1b[0m");
  // });

  // process.on("unhandledRejection", function (error, p) {
  //   console.log("\x1b[31m", "Error: ", error.message, "\x1b[0m");
  // });
  commandFunctions();
};

module.exports = app;
