const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const analyzerSchema = new Schema(
  {
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
  },

  {
    timestamps: true,
  }
);

const Analyzer = mongoose.model("Analyzer", analyzerSchema);
module.exports = Analyzer;
