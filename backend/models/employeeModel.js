// models/employeeModel.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  job_title: {
    type: mongoose.Schema.Types.ObjectId, // Reference to JobTitle
    ref: "JobTitle",
    required: true,
  },
  entry_date: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
