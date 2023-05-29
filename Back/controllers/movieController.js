const { Movie } = require("../models/movieModel");

exports.getAllMovies = async (req, res) => {
    try {
        const allMovies = await Movie.find();
        res.status(200).json({
            status: "success",
            results: allMovies.length,
            data: {
                movies: allMovies,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
};
