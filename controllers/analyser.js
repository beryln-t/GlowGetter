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

const getUserResponse = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const response = {
      name: user.name,
      _id: user._id,
      analyserResponse: user.analyserResponse || [], // Check if analyserResponse is null or undefined
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const saveResponse = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { responses } = req.body;
    const responseArray = responses.map((response) => ({
      question: response.question,
      answer: response.answer,
    }));

    // If the user already has responses, merge the new responses with the existing ones
    if (user.analyserResponse) {
      user.analyserResponse = [...user.analyserResponse, ...responseArray];
    } else {
      user.analyserResponse = responseArray;
    }

    await user.save();

    res.status(200).json({ message: "Response saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { showQns, getUserResponse, saveResponse };
