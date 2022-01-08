const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/socio_db');
}

const db = mongoose.connection;
module.exports = db;