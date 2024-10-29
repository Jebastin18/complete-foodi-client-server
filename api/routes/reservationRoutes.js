const express = require("express");
const router = express.Router();

const reservationController = require("../controllers/reservationController"); // Adjust the path to your controller
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

// Get all reservations
router.get("/", verifyToken, (req, res) => {
  reservationController.getAllReservations(req, res);
});

// Get a reservation by ID
router.get("/:id", verifyToken, (req, res) => {
  reservationController.getReservationById(req, res);
});

// Create a new reservation
router.post("/", (req, res) => {
  reservationController.createReservation(req, res);
});

// Update a reservation by ID
router.put("/:id", verifyToken, verifyAdmin, (req, res) => {
  reservationController.updateReservation(req, res);
});

// Delete a reservation by ID
router.delete("/:id", verifyToken, verifyAdmin, (req, res) => {
  reservationController.deleteReservation(req, res);
});

router.get("/user", (req, res) => {
  reservationController.getReservationByUserId(req, res);
});

module.exports = router;
