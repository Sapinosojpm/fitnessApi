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
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching movie', error });
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({ message: 'Movie updated successfully', movie });
  } catch (error) {
    res.status(400).json({ message: 'Error updating movie', error });
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
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      // Push new comment to the movie's comments array
      movie.comments.push({
        userId: req.body.userId, // User who commented (must be a valid user ID)
        commentText: req.body.commentText // The text of the comment
      });
      await movie.save(); // Save the updated movie with the new comment
      res.status(201).json({ message: 'Comment added successfully', movie });
    } catch (error) {
      res.status(400).json({ message: 'Error adding comment', error });
    }
  };
  

// Get all comments for a movie
exports.getMovieComments = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json(movie.comments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching comments', error });
  }
};
