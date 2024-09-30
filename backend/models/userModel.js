const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Login method
userSchema.statics.login = async function (email, password) {
  // Validate inputs
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }

  // Find user by email
  let user = await this.findOne({ email });

  // If user is not found and email is 'admin@admin.admin', create the admin user
  if (!user && email === "admin@admin.admin") {
    // Check if the provided password matches the default admin password
    if (password === "Admin@Admin1") {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      user = await this.create({
        name: "Admin",
        surname: "Super",
        email,
        password: hash,
      });

      return user;
    } else {
      throw Error("Incorrect admin password.");
    }
  }

  // If user exists, compare the password
  if (!user) {
    throw Error("User not found.");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password.");
  }

  return user;
};

// Update method
userSchema.statics.update = async function (
  id,
  name,
  surname,
  email,
  password
) {
  // Validate inputs
  if (!name || !surname || !email) {
    throw new Error("Name, surname, and email are required.");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid.");
  }

  const updateFields = {
    name,
    surname,
    email,
  };

  // Check if password needs to be updated
  if (password) {
    if (!validator.isStrongPassword(password)) {
      throw new Error("Password not strong enough.");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    updateFields.password = hash; // Include hashed password if updated
  }
  // Update the user
  const user = await this.findOneAndUpdate(
    { _id: id },
    { $set: updateFields },
    { new: true } // Return the updated document
  );

  if (!user) {
    throw new Error("User not found."); // Handle user not found error
  }

  return user; // Return the updated user
};

userSchema.statics.get = async function (token) {
  if (!token) {
    throw new Error("Token is required.");
  }

  // Verify and decode the token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret here
  } catch (error) {
    throw new Error("Invalid token.");
  }

  // Find user by ID and exclude the password field
  const user = await this.findById(decoded.id).select("-password");

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
