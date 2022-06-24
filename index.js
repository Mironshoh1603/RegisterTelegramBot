const bot = require("./commands");
const commandFunctions = require("./commands");
let botArr = [];
let step, name, phoneNumber, locationAddress, age, course, university, message;

bot.on("message", (msg) => {
  console.log(msg.text);
  if (!botArr.find((val) => val.id === msg.from.id)) {
    botArr.push({ id: msg.from.id, username: msg.from.username });
  }

  const chatId = msg.chat.id;
  if (msg.text !== "/start") {
    console.log("ISHLADI");
    if (step === 1) {
      // console.log(msg);
      name = msg.text;

      var options = {
        reply_markup: JSON.stringify({
          keyboard: [[{ text: "Share Number", request_contact: true }]],
          resize_keyboard: true,
          one_time_keyboard: true,
        }),
      };
      message = `Sizning Ismingiz:${name}.\n Endi Telefon raqamingizni kiriting`;
      bot.sendMessage(chatId, message, options);
      step = 2;
    } else if (step === 2) {
      phoneNumber = msg.contact.phone_number;
      // telefon raqamni kiritgandan keyin
      var options = {
        reply_markup: JSON.stringify({
          keyboard: [[{ text: "Share Location", request_location: true }]],
          resize_keyboard: true,
          one_time_keyboard: true,
        }),
      };
      message = `Sizning ismingiz ${name}.\nTelefon raqamingiz ${phoneNumber}.\n Endi Joylashgan o'rningizni jo'nating:`;
      bot.sendMessage(chatId, message, options);
      step = 3;
    } else if (step === 3) {
      // telefon raqamni kiritgandan keyin
      locationAddress = msg.location;
      var options = {
        reply_markup: JSON.stringify({
          remove_keyboard: true,
        }),
      };
      message = `Sizning ismingiz ${name}.\nTelefon raqamingiz ${phoneNumber}.\n Endi Joylashgan o'rningizni ${locationAddress.latitude} ${locationAddress.longitude}\n
    Endi Yoshingizni kiriting:`;
      bot.sendMessage(chatId, message, options);
      step = 4;
    }
    //Courslarni  Jo'natish
    else if (step === 4) {
      age = msg.text;
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
      message = `Sizning ismingiz ${name}.\nTelefon raqamingiz ${phoneNumber}.\n Endi Joylashgan o'rningizni ${locationAddress.latitude} ${locationAddress.longitude}\nYoshingiz ${age}\nEndi Bizning kurslarimizdan birini tanlang:`;

      bot.sendMessage(chatId, message, options);
      step = 5;
    }
    // Universitetni olish
    else if (step === 5) {
      course = msg.text;

      var options = {
        reply_markup: JSON.stringify({
          remove_keyboard: true,
        }),
      };
      message = `Sizning ismingiz ${name}.\nTelefon raqamingiz ${phoneNumber}.\n Endi Joylashgan o'rningizni ${locationAddress.latitude} ${locationAddress.longitude}\nYoshingiz ${age}\nSiz ${course}ni tanladingiz! \nEndi Universitetingizni kiriting:`;

      bot.sendMessage(chatId, message);
      step = 6;
    }
    // check Data
    else if (step === 6) {
      console.log(msg);
      university = msg.text;
      const options = {
        reply_to_message_id: msg.message_id,
        parse_mode: "html",
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: "Tasdiqlayman", callback_data: "Checked" }],
          ],
        }),
      };

      message = `Sizning ismingiz ${name}.\nTelefon raqamingiz ${phoneNumber}.\n Endi Joylashgan o'rningizni ${locationAddress.latitude} ${locationAddress.longitude}\nYoshingiz ${age}\nSiz ${course}ni tanladingiz! \nSiz Universitetingiz ${university}\n
    Ma'lumotlar to'gri bo'lsa Tasdiqlashni bosing `;

      bot.sendMessage(chatId, message, options);
      step = 7;
    } else {
      message =
        "Assalamu Aleykum, Botimizga Xush kelibsiz!\n Ism-familyangizni kiriting: ";
      bot.sendMessage(chatId, message);
      step = 1;
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

bot.onText(/\/exit/, (msg) => {
  step -= 1;
  bot.sendMessage(msg.message.chat.id, "Bitta oldingiz operatsiyaga qaytdiz:");
});
bot.onText(/\/start/, (msg) => {
  // console.log("salom");
  message =
    "Assalamu Aleykum, Botimizga Xush kelibsiz!\n Ism-familyangizni kiriting: ";
  bot.sendMessage(msg.chat.id, message);
  step = 1;
});

// bot.on("polling_error", (error) => {
//   console.log(error); // => 'EFATAL'
// });

// process.on("uncaughtException", function (error) {
//   console.log("\x1b[31m", "Exception: ", error, "\x1b[0m");
// });

// process.on("unhandledRejection", function (error, p) {
//   console.log("\x1b[31m", "Error: ", error.message, "\x1b[0m");
// });
commandFunctions();
