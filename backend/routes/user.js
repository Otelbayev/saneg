const express = require("express");
const {
  loginSuperAdmin,
  updateSuperAdmin,
  getSuperAdmin,
} = require("../controllers/userController");

const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.post("/login", loginSuperAdmin);
router.put("/update-profile", authenticateToken, updateSuperAdmin);
router.get("/admin-data", authenticateToken, getSuperAdmin);

module.exports = router;
