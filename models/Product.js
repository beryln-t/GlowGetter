const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: { unique: true },
    },
    content: { type: String, required: true },
    rating: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
  },
  {
    timestamps: true,
  }
);

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
    stockists: [{ type: Schema.Types.ObjectId, ref: "Stockist", unique: true }],
    reviews: [reviewSchema],
  },

  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
