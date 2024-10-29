const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const TimeSlotSchema = new Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  reservedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const TableSchema = new Schema({
  tableNo: {
    type: Number,
    required: true,
  },
  orders: {
    type: [ItemsSchema],
    default: [],
  },
  timeSlots: {
    type: [TimeSlotSchema],
    default: [],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const Table = mongoose.model("Table", TableSchema);

module.exports = Table;
