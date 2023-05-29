import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import MovieBox from "../MovieBox/MovieBox";
import MovieInfo from "../MovieInfo/MovieInfo";
import MovieListCSS from "./MovieList.module.css";

const url = "http://localhost:4000/api/v1/movies/";

function MovieList() {
    const [movies, setMovies] = useState([]);
    // const [moviesList, setMoviesList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState([]);

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
            setMovies(data.data.movies);
            setSelectedMovie(data.data.movies[0]);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const handleMovieBoxClick = (id) => {
        const selectedMovie = movies.find((movie) => movie._id === id || movie[0]);
        setSelectedMovie(selectedMovie);
        console.log(selectedMovie);
    };

    let allMovies = movies.map((movie) => {
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
                image={selectedMovie.movieImage}
                title={selectedMovie.movieTitle}
                releaseYear={selectedMovie.releaseYear}
                genre={selectedMovie.movieGenre}
                rating={selectedMovie.movieRating}
            />
            <div className={`d-flex ${MovieListCSS.movieSearch}`}>
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
                            <a className="dropdown-item" href="#">
                                Pavadinimas A-Z
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                                Pavadinimas Z-A
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                                Išjungti filtravimą
                            </a>
                        </li>
                    </ul>
                </div>
                <form className="d-flex" role="search">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Armagedonas"
                        aria-label="Search"
                    />
                    <button className="btn btn-outline-danger" type="submit">
                        Ieškoti
                    </button>
                </form>
            </div>

            <div
                className={`d-flex align-items-end mb-3 ${MovieListCSS.movieList}`}
            >
                {allMovies}
            </div>
        </>
    );
}

export default MovieList;
