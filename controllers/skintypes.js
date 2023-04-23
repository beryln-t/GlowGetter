const Skintype = require("../models/Skintype");

const showST = async (req, res) => {
  try {
    const skintype = await Skintype.find({});
    res.status(200).json(skintype);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { showST };
