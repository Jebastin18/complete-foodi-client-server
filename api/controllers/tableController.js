const Table = require("../models/Table.js"); // Adjust the path to your model

const checkTableAvailability = (table) => {
  const currentTime = new Date();

  // Loop through the time slots and update availability
  table.timeSlots.forEach((slot) => {
    if (currentTime >= slot.startTime && currentTime <= slot.endTime) {
      table.isAvailable = false;
    } else {
      table.isAvailable = true;
    }
  });

  return table;
};

// Get all tables
const getAllTables = async (req, res) => {
  try {
    const tables = await Table.find();

    // Check and update availability of each table based on current time
    const updatedTables = tables.map((table) => checkTableAvailability(table));

    res.status(200).json(updatedTables);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get a table by ID
const getTableById = async (req, res) => {
  const tableId = req.params.id;
  try {
    const table = await Table.findById(tableId);

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    // Check and update availability of the table
    const updatedTable = checkTableAvailability(table);

    res.status(200).json(updatedTable);
  } catch (error) {
    res.status(500).json({ message: "Error fetching the table" });
  }
};

// Create a new table
const createTable = async (req, res) => {
  const { tableNo } = req.body;
  try {
    const existingTable = await Table.findOne({ tableNo });

    if (existingTable) {
      return res.status(403).json({ message: "Table number already exists" });
    }

    const newTable = await Table.create({
      tableNo,
    });

    res.status(201).json(newTable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a table by ID
const updateTable = async (req, res) => {
  const tableId = req.params.id;
  const { tableNo, orders, timeSlots } = req.body;
  try {
    const updatedTable = await Table.findByIdAndUpdate(
      tableId,
      { tableNo, orders, timeSlots },
      { new: true, runValidators: true }
    );

    if (!updatedTable) {
      return res.status(404).json({ message: "Table not found" });
    }

    res.status(200).json(updatedTable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a table by ID
const deleteTable = async (req, res) => {
  const tableId = req.params.id;
  try {
    const deletedTable = await Table.findByIdAndDelete(tableId);

    if (!deletedTable) {
      return res.status(404).json({ message: "Table not found" });
    }

    res.status(200).json({ message: "Table deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all available time slots for a table by ID
const getTableAvailableTimeSlots = async (req, res) => {
  const tableId = req.params.id;
  try {
    const table = await Table.findById(tableId);

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    const availableTimeSlots = table.timeSlots.filter(
      (slot) => slot.isAvailable
    );

    res.status(200).json(availableTimeSlots);
  } catch (error) {
    res.status(500).json({ message: "Error fetching available time slots" });
  }
};

module.exports = {
  getAllTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable,
  getTableAvailableTimeSlots,
};
