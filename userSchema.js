const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    trim: true,
  },
  username: { type: String, unique: true, trim: true },
  step: Number,
  name: {
    type: String,
  },
});
