const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('../model/movie');

// Configuration file
dotenv.config({ path: './config_dev.env' });

// Connection String
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

// Read Json File
const movies = fs.readFileSync(`${__dirname}/movie.json`);

// Connect to DB
mongoose.connect(DB)
  .then(() => console.log('Connection Successful'))
  .catch(() => console.log("Something wrong in connection"));

const importData = async () => {

  try {
    await Movie.create(movies);
    console.log("Data Successfully loaded");
  } catch (err) {
    console.log("🚀  err.message", err.message);
  }
  process.exit();
};
importData();

// if (process.argv[1] === '--import') {
// }