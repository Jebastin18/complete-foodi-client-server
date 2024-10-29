const Reservation = require("../models/ReservationModel"); // Adjust the path to your model
const User = require("../models/User.js"); // Adjust the path to your model
const Table = require("../models/Table.js");

// Get all reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("table reservedBy", "-password")
      .exec();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reservation by ID
const getReservationById = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const reservation = await Reservation.findById(reservationId).populate(
      "table reservedBy",
      "-password"
    );
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json(reservation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getReservationByUserId = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const reservation = await Reservation.find({
      reservedBy: user._id,
    }).populate("table reservedBy");

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    return res.status(200).json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Create a new reservation
const createReservation = async (req, res) => {
  const { table, reservedBy, timing, price } = req.body;

  const reservedUser = await User.findOne({ email: reservedBy });
  if (!reservedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const newReservation = await Reservation.create({
      table,
      reservedBy: reservedUser._id,
      timing,
      price,
    });

    if (!newReservation) {
      return res.status(500).json({ message: "Failed to create reservation" });
    }

    // update the table by pushing the slot into it
    const newTable = await Table.findByIdAndUpdate(
      table,
      {
        $push: {
          timeSlots: {
            startTime: timing.start,
            endTime: timing.end,
            isAvailable: false,
            reservedBy: reservedUser._id,
          },
        },
      },
      { new: true }
    );

    if (!newTable) {
      return res.status(500).json({ message: "Failed to update table" });
    }

    res.status(201).json(newReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update reservation by ID
const updateReservation = async (req, res) => {
  const reservationId = req.params.id;
  const { table, reservedBy, timing, price } = req.body;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { table, reservedBy, timing, price },
      { new: true, runValidators: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete reservation by ID
const deleteReservation = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(
      reservationId
    );

    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllReservations,
  getReservationById,
  getReservationByUserId,
  createReservation,
  updateReservation,
  deleteReservation,
};
