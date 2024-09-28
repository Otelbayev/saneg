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

userSchema.statics.signup = async function (name, surname, email, password) {
  // Validate inputs
  if (!name || !surname || !email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  // Check if the email already exists
  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("Email already in use.");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create the new user
  const user = await this.create({
    name,
    surname,
    email,
    password: hash,
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  // Validate inputs
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // Find user by email
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  // Compare password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

userSchema.statics.update = async function (
  id,
  name,
  surname,
  email,
  password
) {
  // Validate inputs
  if (!name || !surname || !email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Update the user
  const user = await this.findOneAndUpdate(
    { _id: id },
    { $set: { name, surname, email, password: hash } },
    { new: true }
  );

  return user;
};

module.exports = mongoose.model("User", userSchema);
