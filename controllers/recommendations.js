const Skintype = require("../models/Skintype");
const User = require("../models/User");
const Product = require("../models/Product");

const showSkintypeProducts = async (req, res) => {
  try {
    const skintypeId = req.params.skintypeId;
    const productsInCents = await Product.find({
      skintypes: skintypeId,
    }).populate("skintypes");

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

const showSkintypeCategory = async (req, res) => {
  try {
    const skintypeId = req.params.skintypeId;
    const category = req.query.category;

    let productsInCents = null;
    if (category === "All Products") {
      productsInCents = await Product.find({
        skintypes: skintypeId,
      }).populate("skintypes");
    } else {
      productsInCents = await Product.find({
        skintypes: skintypeId,
        category: category,
      }).populate("skintypes");
    }

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

module.exports = { showSkintypeProducts, showSkintypeCategory };
