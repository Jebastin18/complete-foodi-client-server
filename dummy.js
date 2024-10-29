const Table = require("./api/models/Table.js"); // Adjust the path to your model

async function generateTable() {
  const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let table of tables) {
    await Table.create({ tableNo: table });
  }
}

module.exports = {
  generateTable,
};
