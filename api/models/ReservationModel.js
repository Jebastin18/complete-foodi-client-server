const mongoose = require("mongoose");
const { Schema } = mongoose;

const Reservation = new mongoose.Schema({
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true,
  },
  reservedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timing: {
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
  },
  price: {
    type: Number,
    required: true,
  },
});

const ReservationModel = mongoose.model("Reservation", Reservation);

module.exports = ReservationModel;
