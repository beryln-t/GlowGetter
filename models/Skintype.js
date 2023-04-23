const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skintypeSchema = new Schema({
  type: {
    type: String,
    trim: true,
    enum: ["Oily", "Normal", "Dry"],
  },
  message: {
    type: String,
    trim: true,
  },
  minScore: {
    type: Number,
    min: 0,
    max: 10,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} must be an integer",
    },
  },
  maxScore: {
    type: Number,
    min: 0,
    max: 10,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} must be an integer",
    },
  },
});

const Skintype = mongoose.model("Skintype", skintypeSchema);
module.exports = Skintype;
