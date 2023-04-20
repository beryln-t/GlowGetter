const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const analyserSchema = new Schema({
  question: { type: String, required: true, trim: true, unique: true },
  yesScore: {
    type: Number,
    required: true,
    trim: true,
    min: 0,
    max: 1,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} must be an integer",
    },
  },
  noScore: {
    type: Number,
    required: true,
    trim: true,
    min: 0,
    max: 1,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} must be an integer",
    },
  },
});

const Analyser = mongoose.model("Analyser", analyserSchema);
module.exports = Analyser;
