const Analyser = require("../models/Analyser");
const User = require("../models/User");
const Skintype = require("../models/Skintype");

const showQns = async (req, res) => {
  try {
    const analyser = await Analyser.find({});
    console.log(analyser);
    res.status(200).json(analyser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { showQns };
