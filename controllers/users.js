const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const yup = require("yup");

const create = async (req, res) => {
  const { password, name, email, role } = req.body;
  if (password.length < 3) {
    return res.status(400).json({ error: "your password is too short" });
  }
  if (password.length > 30) {
    return res.status(400).json({ error: "your password is too long" });
  }
  if (name.length > 100) {
    return res.status(400).json({ error: "your name is too long" });
  }
  try {
    const user = await User.create(req.body);
    const payload = { user };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 60 * 600 });
    res.status(201).json(token);
  } catch (error) {
    console.log("fucking shit", error);
    res.status(500).json(error);
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User or password is invalid" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const payload = { user };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 60 * 600 });
      res.status(200).json(token);
    } else {
      res.status(401).json({ message: "User or password is invalid" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { create, signin };
