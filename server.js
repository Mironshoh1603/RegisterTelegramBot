const env = require("dotenv");
env.config({ path: "./config.env" });
const app = require("./index");
const mongoose = require("mongoose");

const db = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

mongoose
  .connect(db, {})
  .then(() => {
    console.log("DATABASE connected...");
  })
  .catch((err) => {
    console.log(err);
  });
app();
