const express = require("express");

const {
  createEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.post("/create", authenticateToken, createEmployee); // Create a new employee
router.get("/getall", authenticateToken, getAllEmployees); // Get all employees
router.get("/get/:id", authenticateToken, getEmployee); // Get employee by ID
router.put("update/:id", authenticateToken, updateEmployee); // Update employee by ID
router.delete("/delete/:id", authenticateToken, deleteEmployee); // Delete employee by ID

module.exports = router;
