const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const yup = require("yup");

const createUserSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter a name")
    .max(100, "Name is too long"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .max(150, "Email is too long")
    .required("Please enter an email"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(30, "Password is too long")
    .required("Please enter a password"),
  role: yup
    .string()
    .oneOf(["Member", "Admin"], "Invalid user role")
    .required("Please select a user role"),
});

const signinSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const create = async (req, res) => {
  const { password, name, email, role } = await createUserSchema.validate(
    req.body
  );
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "Email address already taken" });
      return;
    }

    const user = await User.create(req.body);
    const payload = { name, email, password, role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 60 * 600 });
    res.status(201).json(token);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = error.errors.join(", ");
      res.status(400).json({ error: errors });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const signin = async (req, res) => {
  const { email, password } = await signinSchema.validate(req.body);
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
    if (error.name === "ValidationError") {
      const errors = error.errors.join(", ");
      res.status(400).json({ error: errors });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = { create, signin };
