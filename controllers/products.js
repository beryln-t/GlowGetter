const Product = require("../models/Product");

const showProducts = async (req, res) => {
  try {
    const queryParams = req.query;
    let productsInCents;
    if (Object.keys(queryParams).length === 0) {
      // If there are no query parameters, return all products
      productsInCents = await Product.find().populate("skintypes");
    } else {
      // If there are query parameters, filter the products
      const searchQuery = {};
      for (const key in queryParams) {
        if (queryParams.hasOwnProperty(key)) {
          // Use regular expression to search for keyword in any part of the field
          searchQuery[key] = {
            $regex: new RegExp(queryParams[key], "i"),
          };
        }
      }
      productsInCents = await Product.find(searchQuery).populate("skintypes");
    }
    const products = productsInCents.map((product) => ({
      ...product.toObject(),
      price: product.price / 100, // Convert price from cents to dollars
    }));
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const showProdDetail = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productInCents = await Product.findById(productId).populate(
      "skintypes"
    );

    const product = productInCents.toObject();
    product.price = product.price / 100;

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { showProdDetail, showProducts };
