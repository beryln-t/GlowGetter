const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skintypeSchema = new Schema({
  type: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    enum: ["Oily", "Normal", "Dry"],
  },
  minScore: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} must be an integer",
    },
  },
  maxScore: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} must be an integer",
    },
  },
});

const Skintype = mongoose.model("Skintype", skintypeSchema);
