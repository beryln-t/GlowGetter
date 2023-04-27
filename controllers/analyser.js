const Analyser = require("../models/Analyser");
const User = require("../models/User");
const Skintype = require("../models/Skintype");
const { response } = require("express");

const showQns = async (req, res) => {
  try {
    const analyser = await Analyser.find({});
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
      analyserResponse: user.analyserResponse || [],
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const saveResponse = async (req, res) => {
  try {
    const userId = req.params.userId;
    const responses = req.body;
    const responseArray = responses.map((response) => ({
      question: response.question,
      answer: response.answer,
    }));

    let score = 0;
    const analysers = await Analyser.find({});
    for (const response of responseArray) {
      const question = analysers.find(
        (analyser) => analyser._id.toString() === response.question
      );
      if (question) {
        if (response.answer === 1) {
          score += question.yesScore;
        } else if (response.answer === 0) {
          score += question.noScore;
        }
      }
    }

    const skintype = await Skintype.findOne({
      minScore: { $lte: score },
      maxScore: { $gte: score },
    });

    const result = await User.findByIdAndUpdate(userId, {
      analyserResponse: responseArray,
      analyserScore: score,
      skintype: skintype ? skintype._id.toString() : null,
    });

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Response saved successfully" });
  } catch (error) {
    console.error("analyzer", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { showQns, getUserResponse, saveResponse };
