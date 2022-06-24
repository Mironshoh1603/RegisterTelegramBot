const botArr = require("./data");

const user = function (id) {
  return botArr.find((val) => val.id === id);
};
module.exports = user;
