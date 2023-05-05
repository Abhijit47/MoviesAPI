const express = require('express');

const Movie = require('./model/movie');

const movieRouter = require('./routes/movieRoutes');

// Initialize app with express
const app = express();

// app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON
app.use(express.json());

// Default Route
app.get('/', async (req, res) => {
  res.send({ Message: 'Welcome to mFlix Movies API' });
});

// Get All Movies
app.use('/api/v1/movies', movieRouter);

//Create one Movie
app.use('/api/v1/movies', movieRouter);

// Get Movies By Name
app.use('/api/v1/movies', movieRouter);

// Get Movies By ID
app.use('/api/v1/movies', movieRouter);

// Update One Movies
app.use('/api/v1/movies', movieRouter);

// Delete One Movie
app.use('/api/v1/movies', movieRouter);


// rubbish point
app.all('*', (req, res, next) => {
  console.log(`Can't find ${req.originalUrl} on this server!`);
  res.send({ message: `Can't find ${req.originalUrl} on this server!` });
  next();
});

module.exports = app;