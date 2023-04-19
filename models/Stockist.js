const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockistSchema = new Schema(
  {
    storeName: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
  },

  {
    timestamps: true,
  }
);

const Stockist = mongoose.model("Stockist", stockistSchema);
module.exports = Stockist;
