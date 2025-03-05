const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

router.post("/addMovie", authMiddleware, adminMiddleware, movieController.addMovie);
router.get("/getMovies", movieController.getAllMovies);
router.get("/getMovie/:id", movieController.getMovieById);
router.patch("/updateMovie/:id", authMiddleware, adminMiddleware, movieController.updateMovie);
router.delete("/deleteMovie/:id", authMiddleware, adminMiddleware, movieController.deleteMovie);
router.patch("/addComment/:id", authMiddleware, movieController.addMovieComment);
router.get("/getComments/:id", movieController.getMovieComments);

module.exports = router;
