const Product = require("../models/Product");

const showAllProducts = async (req, res) => {
  try {
    const productsInCents = await Product.find().populate("skintypes");
    const products = productsInCents.map((product) => ({
      ...product.toObject(),
      price: product.price / 100, // Convert price from cents to dollars
    }));
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { showAllProducts };
