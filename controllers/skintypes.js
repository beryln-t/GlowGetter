const Skintype = require("../models/Skintype");
const User = require("../models/User");

const showST = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const skintypeId = user.skintype._id;
    const skintype = await Skintype.findById(skintypeId);
    if (!skintype) {
      return res.status(404).json({ error: "Skintype not found" });
    }

    res.status(200).json(skintype);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { showST };
