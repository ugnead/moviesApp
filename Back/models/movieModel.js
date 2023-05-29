const mongoose = require("mongoose");
const { Schema, model } = mongoose;

let movieSchema = new Schema({
    movieTitle: {
        type: String,
        minlength: 1,
        maxlength: 50,
        required: true,
    },
    releaseYear: {
        type: Number,
        min: 1900,
        max: 9999,
        required: true,
    },
    movieGenre: {
        type: String,
        minlength: 1,
        maxlength: 15,
        required: true,
    },
    movieRating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    movieImage: {
        type: String,
        required: true,
    }
});

const Movie = new model("Movie", movieSchema);

module.exports = { Movie };
