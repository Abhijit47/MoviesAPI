const express = require('express');
const router = express.Router();

const {
  getHome,
  getAllMovies,
  createOneMovie,
  getMovieByName,
  getMovieByID,
  updateOne,
  deleteOne,
} = require('../controller/moviesController');

// Get Default
router.route("/")
  .get(getHome);

//Get All
router.route('/view')
  .get(getAllMovies);

// Create one
router.route('/create')
  .post(createOneMovie);

// Get one by name
router.route('/q')
  .get(getMovieByName);

// Get one by id
router.route('/:id')
  .get(getMovieByID);

// Update One
router.route('/:id')
  .patch(updateOne);

// Delete One
router.route('/:id')
  .delete(deleteOne);


module.exports = router;