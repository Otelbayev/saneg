const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const signupUser = async (req, res) => {
  const { name, surname, email, password } = req.body;

  try {
    const user = await User.signup(name, surname, email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res
      .status(200)
      .json({ name: user.name, surname: user.surname, email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params; // Get user ID from request parameters
  const { name, surname, email, password } = req.body; // Get updated fields from request body

  try {
    // Call the static update method from the user model
    const updatedUser = await User.update(id, name, surname, email, password);

    // If user is not found, throw an error
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the updated user details in response
    res.status(200).json(updatedUser);
  } catch (err) {
    // Handle errors
    res.status(400).json({ error: err.message });
  }
};

module.exports = { signupUser, loginUser, updateUser };
