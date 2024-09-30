// controllers/employeeController.js
const Employee = require("../models/employeeModel");
const JobTitle = require("../models/jobTitleModel");

// Create a new employee
const createEmployee = async (req, res) => {
  const { name, surname, job_title, entry_date, gender } = req.body;

  try {
    const jobTitle = await JobTitle.findOne({ title: job_title });
    if (!jobTitle) {
      // If job title does not exist, create a new one
      const newJobTitle = await JobTitle.create({ title: job_title });
      const employee = await Employee.create({
        name,
        surname,
        job_title: newJobTitle._id, // Store the job title reference
        entry_date,
        gender,
      });
      res.status(201).json(employee);
    } else {
      // If job title exists, create the employee with the existing job title
      const employee = await Employee.create({
        name,
        surname,
        job_title: jobTitle._id, // Store the job title reference
        entry_date,
        gender,
      });
      res.status(201).json(employee);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("job_title"); // Populate job title
    res.status(200).json(employees);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single employee
const getEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id).populate("job_title");
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an employee
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, surname, job_title, entry_date, gender } = req.body;

  try {
    const jobTitle = await JobTitle.findOne({ title: job_title });
    if (!jobTitle) {
      // If job title does not exist, create a new one
      const newJobTitle = await JobTitle.create({ title: job_title });
      const employee = await Employee.findByIdAndUpdate(
        id,
        {
          name,
          surname,
          job_title: newJobTitle._id,
          entry_date,
          gender,
        },
        { new: true }
      );
      res.status(200).json(employee);
    } else {
      const employee = await Employee.findByIdAndUpdate(
        id,
        {
          name,
          surname,
          job_title: jobTitle._id,
          entry_date,
          gender,
        },
        { new: true }
      );
      res.status(200).json(employee);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
