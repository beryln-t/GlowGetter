const User = require("../models/User");
const Product = require("../models/Product");

const editProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, email } = req.body;

    const user = await User.findById(userId);
    console.log("user ", user);
    if (user.email !== email) {
      // Check if email is already taken
      let emailExists = await User.exists({ email });
      if (emailExists) {
        return res.status(400).json({ error: "Email taken" });
      }
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );
    console.log("updated user ", updatedUser);

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
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ error: "Product already in wishlist" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { wishlist: productId } },
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
