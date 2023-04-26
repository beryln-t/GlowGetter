const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: { type: String, required: true, unique: true, trim: true },
    imgurl: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: {
      type: String,
      enum: ["Cleanser", "Moisturiser", "Sunscreen"],
      required: true,
    },
    skintypes: [{ type: Schema.Types.ObjectId, ref: "Skintype" }],
  },

  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
