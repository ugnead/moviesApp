const { Movie } = require("../models/movieModel");

exports.getMoviesByUsername = async (req, res) => {
    try {
        const username = req.params.username;
        const movies  = await Movie.find({ username});
        res.status(200).json({
            status: "success",
            results: movies.length,
            data: {
                movies,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
};

// GET MOVIE BY ID
// http://localhost:4000/api/v1/movies/id
exports.getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findOne({ _id: id });
        
        if (!movie) {
            return res.status(404).json({ msg: `No movie with id: ${id}` });
        } else {
            res.status(200).json({
                status: "success",
                data: {
                    movie: movie,
                },
            });
        }
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
};

// CREATE MOVIE
// http://localhost:4000/api/v1/movies
// app.post("/api/v1/movies",
exports.createNewMovie = async (req, res) => {
    try {
        const {username} = req.body;
        const movieData = { ...req.body, username };
        const newMovie = await Movie.create(movieData);
        res.status(201).json({
            status: "success",
            data: {
                movie: newMovie,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
};

// UPDATE MOVIE
// http://localhost:4000/api/v1/movies/id
// app.patch("/api/v1/movies/:id",
exports.updateMovie = async (req, res) => {
    try {
        const upatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({
            status: "success",
            data: {
                movie: upatedMovie,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
};

// DELETE MOVIE
// http://localhost:4000/api/v1/movies/id
// app.delete("/api/v1/movies/:id",
exports.deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByIdAndDelete(id);

        if (!movie) {
            return res.status(404).json({ msg: `No movie with id: ${id}` });
        } else {
            res.status(200).json({
                status: "success",
                message: `Movie with id: ${id} deleted successfully.`,
                movie: movie,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
