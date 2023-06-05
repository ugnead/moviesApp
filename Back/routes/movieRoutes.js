const express = require("express");
const router = express.Router();

const { getMoviesByUsername, getMovieById, createNewMovie, updateMovie, deleteMovie  } = require("../controllers/movieController");

router.route("/user/:username").get(getMoviesByUsername);
router.route("/:id/user/:username").get(getMovieById);
router.route("/user/:username").post(createNewMovie);
router.route("/:id/").patch(updateMovie);
router.route("/:id/").delete(deleteMovie);


module.exports = router;