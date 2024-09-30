// routes/jobTitleRoutes.js
const express = require("express");
const {
  createJobTitle,
  getAllJobTitles,
  getJobTitle,
  updateJobTitle,
  deleteJobTitle,
} = require("../controllers/jobTitleController");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

// Job title routes
router.post("/create", authenticateToken, createJobTitle); // Create a job title
router.get("/getall", authenticateToken, getAllJobTitles); // Get all job titles
router.get("/get/:id", authenticateToken, getJobTitle); // Get a specific job title by ID
router.put("/update/:id", authenticateToken, updateJobTitle); // Update a job title
router.delete("/delete/:id", authenticateToken, deleteJobTitle); // Delete a job title

module.exports = router;
