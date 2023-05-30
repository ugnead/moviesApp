import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import MovieBox from "../MovieBox/MovieBox";
import MovieInfo from "../MovieInfo/MovieInfo";
import MovieListCSS from "./MovieList.module.css";

const url = "http://localhost:4000/api/v1/movies/";

function MovieList(props) {
    const [movies, setMovies] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState([]);

    const [imageInput, setImageInput] = useState("");
    const [titleInput, setTitleInput] = useState("");
    const [yearInput, setYearInput] = useState("");
    const [genreInput, setGenreInput] = useState("");
    const [ratingInput, setRatingInput] = useState("");

    const [editMode, setEditMode] = useState(false);
    const [updateMovie, setUpdateMovie] = useState({});

    const [error, setError] = useState(false);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }
            const data = await response.json();
            setMovieList(data.data.movies.reverse());
            setSelectedMovie(data.data.movies[0]);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const handleMovieBoxClick = (movieId) => {
        const selectedMovie = movieList.find((movie) => movie._id === movieId);
        setSelectedMovie(selectedMovie);
        console.log(selectedMovie);
    };

    const handleDismiss = () => {
        setEditMode(false);
        setImageInput("");
        setTitleInput("");
        setYearInput("");
        setGenreInput("");
        setRatingInput("");
        setError(false);
    };

    const handleEditMovie = (movieId) => {
        // console.log("edit mode: " + editMode);
        let findMovie = movieList.find((movie) => movie._id === movieId);
        //console.log(findMovie);
        setImageInput(findMovie.movieImage);
        setTitleInput(findMovie.movieTitle);
        setYearInput(findMovie.releaseYear);
        setGenreInput(findMovie.movieGenre);
        setRatingInput(findMovie.movieRating);
        setEditMode(true);
        setUpdateMovie(findMovie);
        console.log(findMovie);
    };

    useEffect(() => {
        console.log("edit mode: " + editMode);
    }, [editMode]);

    const handleUpdateMovie = async ({ id }) => {
        const updatedMovie = {
            _id: id,
            movieImage: imageInput,
            movieTitle: titleInput,
            releaseYear: yearInput,
            movieGenre: genreInput,
            movieRating: ratingInput,
        };
        const response = await fetch(url + id, {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMovie),
        });
        if (!response.ok) {
            throw new Error("Failed to update movie");
        }
        const updatedMovieList = movieList.map((movie) =>
            movie._id === id ? updatedMovie : movie
        );

        setMovieList(updatedMovieList);
        setSelectedMovie(updatedMovie);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Add new movie
            if (!editMode) {
                if (
                    imageInput.length == 0 ||
                    titleInput.length == 0 ||
                    yearInput == 0 ||
                    genreInput.length == 0 ||
                    ratingInput == 0
                ) {
                    setError(true);
                    console.log("error on add: " + error);
                } else {
                    let newMovie = {
                        movieImage: imageInput,
                        movieTitle: titleInput,
                        releaseYear: yearInput,
                        movieGenre: genreInput,
                        movieRating: ratingInput,
                    };
                    const response = await fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newMovie),
                    });
                    if (!response.ok) {
                        throw new Error("Failed to add movie");
                    }
                    const data = await response.json();
                    await fetchMovies();
                    //console.log(newMovie)
                    

                    //console.log(movieList)
                    setImageInput("");
                    setTitleInput("");
                    setYearInput("");
                    setGenreInput("");
                    setRatingInput("");
                    setError(false);
                    console.log(newMovie);
                }
                // Update movie
            } else {
                if (
                    imageInput.length == 0 ||
                    titleInput.length == 0 ||
                    yearInput == 0 ||
                    genreInput.length == 0 ||
                    ratingInput == 0
                ) {
                    setError(true);
                    console.log("error on edit: " + error);
                } else {
                    await handleUpdateMovie({ id: updateMovie._id });
                    setError(false);
                    setEditMode(false);
                    setImageInput("");
                    setTitleInput("");
                    setYearInput("");
                    setGenreInput("");
                    setRatingInput("");
                    console.log(updateMovie);
                }
            }
        } catch (error) {
            console.error("Error adding/updating movie:", error);
        }
    };

    const handleDelete = async (movieId) => {
        try {
            const response = await fetch(url + movieId, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete movie");
            }
            setMovieList(movieList.filter((movie) => movie._id !== movieId));
            setSelectedMovie(movieList[0]);
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };

    const handleFilter = (filterOption) => {
        let filteredList = [...movieList];
        if (filterOption === "A-Z") {
            filteredList.sort((a, b) =>
                a.movieTitle.localeCompare(b.movieTitle)
            );
        } else if (filterOption === "Z-A") {
            filteredList.sort((a, b) =>
                b.movieTitle.localeCompare(a.movieTitle)
            );
        }
        setMovieList(filteredList);
    };

    let allMovies = movieList
    .map((movie) => {
        return (
            <MovieBox
                key={uuidv4()}
                id={movie._id}
                image={movie.movieImage}
                title={movie.movieTitle}
                handleMovieBoxClick={handleMovieBoxClick}
            />
        );
    });

    return (
        <>
            <MovieInfo
                id={selectedMovie._id}
                image={selectedMovie.movieImage}
                title={selectedMovie.movieTitle}
                releaseYear={selectedMovie.releaseYear}
                genre={selectedMovie.movieGenre}
                rating={selectedMovie.movieRating}
                handleDelete={handleDelete}
                handleEditMovie={handleEditMovie}
                handleDismiss={handleDismiss}
                handleSubmit={handleSubmit}
                titleInput={titleInput}
                imageInput={imageInput}
                yearInput={yearInput}
                genreInput={genreInput}
                ratingInput={ratingInput}
                setTitleInput={setTitleInput}
                setImageInput={setImageInput}
                setYearInput={setYearInput}
                setGenreInput={setGenreInput}
                setRatingInput={setRatingInput}
                error={error}
                editMode={editMode}
            />

            <div className={`mb-3 ${MovieListCSS.movieList}`}>
                <div className={`d-flex ${MovieListCSS.movieSearch}`}>
                    {/* Movie Filter */}
                    <div className="dropdown me-4">
                        <button
                            className="btn btn-outline-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Filtruoti
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <a
                                    className="dropdown-item"
                                    onClick={() => handleFilter("A-Z")}
                                >
                                    Pavadinimas A-Z
                                </a>
                            </li>
                            <li>
                                <a
                                    className="dropdown-item"
                                    onClick={() => handleFilter("Z-A")}
                                >
                                    Pavadinimas Z-A
                                </a>
                            </li>
                            <li>
                                <a
                                    className="dropdown-item"
                                    onClick={() => fetchMovies()}
                                >
                                    Išjungti filtravimą
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Movie Search */}
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Armagedonas"
                            aria-label="Search"
                        />
                        <button
                            className="btn btn-outline-danger"
                            type="submit"
                        >
                            Ieškoti
                        </button>
                    </form>
                </div>

                {/* Movie List */}
                <div className="d-flex">
                    <button
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        className={`mt-1 ms-1 pb-5 ${MovieListCSS.addMovieBtn}`}
                    >
                        +
                    </button>
                    <div className="d-flex">{allMovies}</div>
                </div>
            </div>
        </>
    );
}

export default MovieList;
