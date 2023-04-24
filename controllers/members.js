const User = require("../models/User");

const editProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, email } = req.body;

    const user = await User.findById(userId);
    console.log("user ", user);
    if (user.email !== email) {
      // Check if email is already taken
      let emailExists = await User.exists(email);
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

module.exports = { editProfile };
