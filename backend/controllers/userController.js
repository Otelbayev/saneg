const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const ADMIN_EMAIL = "admin@admin.admin";

// Function to create a JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const loginSuperAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Use the static method from the User model to log in
    const user = await User.login(email, password);

    // Create a JWT token upon successful login
    const token = createToken(user._id);

    // Return the user details and token
    res.status(200).json({
      message: "Login successful",
      name: user.name,
      surname: user.surname,
      email: user.email,
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateSuperAdmin = async (req, res) => {
  const { name, surname, password } = req.body; // Get updated fields from request body

  try {
    // Fetch the current super admin from the database
    const admin = await User.findOne({ email: ADMIN_EMAIL });

    if (!admin) {
      return res.status(404).json({ error: "Super admin not found." });
    }

    // Update super admin's fields
    if (name) admin.name = name;
    if (surname) admin.surname = surname;

    if (password) {
      // Hash new password
      admin.password = await bcrypt.hash(password, 10);
    }

    await admin.save(); // Save changes

    res
      .status(200)
      .json({ message: "Super admin profile updated successfully." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getSuperAdmin = async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is required." });
    }

    // Find the super admin user by email
    const superAdminEmail = "admin@admin.admin"; // Define the super admin email
    const superAdmin = await User.findOne({ email: superAdminEmail }).select(
      "-password"
    );

    if (!superAdmin) {
      return res.status(404).json({ message: "Super admin not found." });
    }

    // Return the super admin user profile
    res.json(superAdmin);
  } catch (error) {
    // Handle errors (e.g., token verification failures)
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token." });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginSuperAdmin, updateSuperAdmin, getSuperAdmin };
