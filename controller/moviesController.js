const Movie = require('../model/movie');

exports.getAllMovies = async (req, res) => {

  //destructuring page and limit and set default values
  const { page = 1, limit = 20 } = req.query;

  try {
    // execute query with page and limit values
    const movieList = await Movie.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection 
    const count = await Movie.count();

    // return response with posts, total pages, and current page
    res.status(200).json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      nbHits: `${movieList.length} items`,
      totalCount: count,

      movieList,
    });


  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};

exports.createOneMovie = async (req, res) => {
  const reqBody = req.body;
  // res.send(reqBody);

  const movie = new Movie({
    title: reqBody.title,
    plot: reqBody.plot,
    rated: reqBody.rated,
    released: reqBody.released
  });
  // console.log(movie);
  // res.send({ New: movie });

  try {
    const newMovie = await movie.save();

    res.status(201).json({ "Success": newMovie });


  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMovieByName = async (req, res) => {
  const { title, year, rated, imdb, type } = req.query;

  const queryObj = {};

  if (title) {
    queryObj.title = { $regex: title, $options: "i" };
  }

  if (year) {
    queryObj.year = year;
  }

  if (rated) {
    queryObj.rated = rated;
  }

  if (imdb) {
    queryObj.imdb = imdb;
  }

  if (type) {
    queryObj.type = type;
  }

  // console.log("🚀  queryObj", queryObj);

  // Check query is blank on not
  if (Object.keys(queryObj).length === 0) {
    res.status(400).json({ Error: "One query is required" });
  } else {
    try {
      const getMovieByName = await Movie.find(queryObj).exec();
      const count = getMovieByName.length;

      res.status(200)
        .json({
          movies: getMovieByName.length >= 1 ? getMovieByName : "No data found",
          Count: count,
        });
      res.end();

    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

};

exports.getMovieByID = async (req, res) => {

  const queryByID = req.params.id;

  try {
    const getMovieByID = await Movie.findById(queryByID).exec();
    res.status(200).json({ Success: getMovieByID ?? "No data found on this ID" });
  } catch (err) {
    res.status(400).json({ "msg": err.message });
  }

};

exports.updateOne = async (req, res) => {
  const queryID = req.params.id;
  const queryBody = req.body;

  // Check body is empty or not
  if (Object.keys(queryBody).length === 0) {
    return res.status(400).json({ Error: "Invalid Update update details" });
  }

  try {
    const updateOne = await Movie.findByIdAndUpdate(queryID, queryBody).exec();

    if (updateOne) {
      res.status(201).json({ Success: updateOne ?? "No data found on this ID" });
    } else {
      res.status(204).json({ "msg": "No data found on this ID" });
    }

  } catch (err) {
    res.status(400).json({ "msg": "Something went wrong" });
  }

};

exports.deleteOne = async (req, res) => {
  const queryByID = req.params.id;
  if (!queryByID) return;

  try {
    const deleteOne = await Movie.findByIdAndDelete(queryByID).exec();

    if (deleteOne) {
      res.status(202).json({ "Successfully deleted": deleteOne ?? "No data found on this ID" });
    } else {
      res.json({ "msg": "No data found on this ID" });
      // res.status(204)
    }

  } catch (err) {
    res.status(500).json({ "msg": err.message });
  }
};


/*
app.get('/api/v1/movies', async (req, res) => {

  //destructuring page and limit and set default values
  const { page = 1, limit = 20 } = req.query;

  try {
    // execute query with page and limit values
    const movieList = await Movie.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection
    const count = await Movie.count();

    // return response with posts, total pages, and current page
    res.json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalCount: count,
      movieList,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
*/

/*
app.post('/api/v1/movies', async (req, res) => {
  const reqBody = req.body;


  const movie = new Movie({
    name: req.body.name,
    cast: req.body.cast,
    releaseYear: req.body.releaseYear,
  });

  try {
    const newMovie = await movie.save();

    res.status(201).json("Success");
    newMovie;
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
*/

// Get One Movie by ID
// app.route('/api/v1/movies/:id')
//   .get(movieRouter);

// app.get('/api/v1/movies/:id', async (req, res) => {
//   const queryByID = req.params.id;
//   // console.log(req.params.id);

//   try {
//     const getOneMovie = await Movie.findById({ _id: queryByID });
//     if (!getOneMovie) return;
//     res.status(200).json({ found: getOneMovie });
//   } catch (err) {
//     res.status(202).json({ message: "Given ID is wrong! Try Again💥" });
//   }
// });

// app.get('/api/v1/movies/:name', async (req, res) => {
//   const queryByName = req.params.name;
//   console.log("Get by name", req.params);

//   try {
//     const getOneMovie = await Movie.find({ title: queryByName }).exec();

//     if (!getOneMovie) return;
//     res.status(200).json({ found: getOneMovie });
//   } catch (err) {
//     res.status(202).json({ message: "Given name not matched! Try Again💥" });
//   }
// });

// app.get('/api/v1/movies/movie/?title=Titanic', async (req, res) => {
//   const queryByName = req.query;
//   console.log("Get by name", req.query);

//   try {
//     const getOneMovie = await Movie.find({ title: req.query }).exec();

//     if (!getOneMovie) return;

//     res.status(200).json({ found: getOneMovie });

//   } catch (err) {

//     res.status(202).json({ message: "Given name not matched! Try Again💥" });
//   }
// });

// Update One Movie
// app.patch('/api/v1/movies/:id', async (req, res) => {

//   const queryID = req.params.id;
//   console.log("🚀  file: app.js:39  queryID:", queryID);
//   const queryBody = req.body;
//   console.log("🚀  file: app.js:39  query:", queryBody);

//   const updateOne = await Movie.findByIdAndUpdate(queryID, queryBody);
//   console.log("🚀  file: app.js:42  updateOne:", updateOne);

//   res.send(updateOne);

// });

// Delete One Movie
// app.delete('/api/v1/movies/:id', async (req, res) => {

//   const queryByID = req.params.id;
//   if (!queryByID) return;

//   try {
//     const deleteOne = await Movie.findByIdAndDelete(queryByID);
//     res.status(200).json(deleteOne ?? "No data found");
//   } catch (err) {
//     res.status(204).json({ "msg": err.message });
//   }

// });