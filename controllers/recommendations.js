const Skintype = require("../models/Skintype");
const User = require("../models/User");
const Product = require("../models/Product");
const Stockist = require("../models/Stockist");

const showAllProducts = async (req, res) => {
  try {
    const productsInCents = await Product.find()
      .populate("stockists")
      .populate("skintypes");
    const products = productsInCents.map((product) => ({
      ...product.toObject(),
      price: product.price / 100, // Convert price from cents to dollars
    }));
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const showSkintypeProducts = async (req, res) => {
  try {
    const skintypeId = req.params.skintypeId;
    const productsInCents = await Product.find({ skintypes: skintypeId });

    const products = productsInCents.map((product) => {
      return {
        ...product.toObject(),
        price: product.price / 100, // Convert price from cents to dollars
      };
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { showAllProducts, showSkintypeProducts };
