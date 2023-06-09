const User = require("../models/User");
const Product = require("../models/Product");

const editProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name } = req.body;

    const user = await User.findById(userId);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to update user" });
  }
};

const addWishlist = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = await User.findById(userId);

    // Delete wishlist if it exists or add wishlist if it doesn't exist
    const command = user.wishlist.includes(productId) ? "$pull" : "$push";

    // Add wishlist if it doesn't exists
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { [command]: { wishlist: productId } },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to update user" });
  }
};
const showWishlist = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = await User.findById(userId).populate("wishlist");

    const wishlist = user.wishlist.map(async (item) => {
      const product = await Product.findById(item).lean().exec();
      return {
        ...product,
        price: product.price / 100,
      };
    });

    const populatedWishlist = await Promise.all(wishlist);

    res.status(200).json(populatedWishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch user wishlist" });
  }
};

const delWishlist = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: productId } },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to update user" });
  }
};

module.exports = { editProfile, addWishlist, showWishlist, delWishlist };
