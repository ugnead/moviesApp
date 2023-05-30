const express = require("express");
const router = express.Router();

const { getAllMovies, getMovieById, createNewMovie, updateMovie, deleteMovie  } = require("../controllers/movieController");

router.route("/").get(getAllMovies);
router.route("/:id").get(getMovieById);
router.route("/").post(createNewMovie);
router.route("/:id").patch(updateMovie);
router.route("/:id").delete(deleteMovie);


module.exports = router;