// controllers/jobTitleController.js
const JobTitle = require("../models/jobTitleModel");

// Create a new job title
const createJobTitle = async (req, res) => {
  const { title } = req.body; // Make sure you're sending `title` in the request body

  try {
    const existingJobTitle = await JobTitle.findOne({ title });
    if (existingJobTitle) {
      return res.status(400).json({ error: "Job title already exists" });
    }

    const jobTitle = await JobTitle.create({ title });
    res.status(201).json(jobTitle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all job titles
const getAllJobTitles = async (req, res) => {
  try {
    const jobTitles = await JobTitle.find({});
    res.status(200).json(jobTitles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single job title by ID
const getJobTitle = async (req, res) => {
  const { id } = req.params;

  try {
    const jobTitle = await JobTitle.findById(id);
    if (!jobTitle) {
      return res.status(404).json({ error: "Job title not found" });
    }
    res.status(200).json(jobTitle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a job title
const updateJobTitle = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedJobTitle = await JobTitle.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedJobTitle) {
      return res.status(404).json({ error: "Job title not found" });
    }
    res.status(200).json(updatedJobTitle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a job title
const deleteJobTitle = async (req, res) => {
  const { id } = req.params;

  try {
    const jobTitle = await JobTitle.findByIdAndDelete(id);
    if (!jobTitle) {
      return res.status(404).json({ error: "Job title not found" });
    }
    res.status(200).json({ message: "Job title deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createJobTitle,
  getAllJobTitles,
  getJobTitle,
  updateJobTitle,
  deleteJobTitle,
};
