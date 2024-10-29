const express = require("express");
const router = express.Router();

const tableController = require("../controllers/tableController"); // Adjust the path to your controller
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

// Get all tables
router.get("/", (req, res) => {
  tableController.getAllTables(req, res);
});

// Get a table by ID
router.get("/:id", verifyToken, (req, res) => {
  tableController.getTableById(req, res);
});

// Create a new table (admin only)
router.post("/", verifyToken, verifyAdmin, (req, res) => {
  tableController.createTable(req, res);
});

// Update a table by ID (admin only)
router.put("/:id", verifyToken, verifyAdmin, (req, res) => {
  tableController.updateTable(req, res);
});

// Delete a table by ID (admin only)
router.delete("/:id", verifyToken, verifyAdmin, (req, res) => {
  tableController.deleteTable(req, res);
});

// Get available time slots for a specific table
router.get("/:id/timeSlots", verifyToken, (req, res) => {
  tableController.getTableAvailableTimeSlots(req, res);
});

module.exports = router;
