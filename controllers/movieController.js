// controllers/movieController.js
const Movie = require('../models/movieModel');

// Add a new movie
exports.addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json({ message: 'Movie added successfully', movie });
  } catch (error) {
    res.status(400).json({ message: 'Error adding movie', error });
  }
};

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching movies', error });
  }
};

// Get movie by ID
exports.getMovieById = async (req, res) => {
  console.log("Fetching movie with ID:", req.params.id);
  
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      console.log("Movie not found:", req.params.id);
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(400).json({ message: "Error fetching movie", error });
  }
};


// Update a movie
exports.updateMovie = async (req, res) => {
  console.log("Update request received. Movie ID:", req.params.id);
  console.log("Request Body:", req.body);

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      console.log("Movie not found:", req.params.id);
      return res.status(404).json({ message: "Movie not found" });
    }

    console.log("Movie updated successfully:", updatedMovie);
    res.status(200).json({ message: "Movie updated successfully", movie: updatedMovie });
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(400).json({ message: "Error updating movie", error });
  }
};


// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting movie', error });
  }
};

// controllers/movieController.js
exports.addMovieComment = async (req, res) => {
  try {
    const { commentText } = req.body;
    const userId = req.user._id; // Get user ID from `authMiddleware`

    if (!commentText) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Add new comment
    movie.comments.push({ userId, commentText });
    await movie.save();

    res.status(201).json({ message: "Comment added successfully", comments: movie.comments });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error: error.message });
  }
};

  

// Get all comments for a movie
exports.getMovieComments = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("comments.userId", "name email");
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie.comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
};

