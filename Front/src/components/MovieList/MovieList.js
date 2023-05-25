import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MovieBox from "../MovieBox/MovieBox";
import MovieInfo from "../MovieInfo/MovieInfo";
import MovieListCSS from "./MovieList.module.css";

function MovieList() {
    const [movies, setMovies] = useState([
        {
            id: 1,
            movieImage:
                "https://static3.go3.tv/scale/go3/webuploads/rest/upload/vod/5010385/images/19307744?dsth=1080&dstw=1920&srcmode=0&quality=65&type=1&srcx=1&srcy=1&srcw=1/1&srch=1/1",
            movieTitle: "Armagedonas",
        },
        {
            id: 2,
            movieImage:
                "https://wallpaper_finder.s3.amazonaws.com/wallpapers/thumbs_2/titanic-movie-poster.jpg",
            movieTitle: "Titanikas",
        },
        {
            id: 3,
            movieImage:
                "https://static3.go3.tv/scale/go3/webuploads/rest/upload/vod/5010385/images/19307744?dsth=1080&dstw=1920&srcmode=0&quality=65&type=1&srcx=1&srcy=1&srcw=1/1&srch=1/1",
            movieTitle: "Armagedonas",
        },
        {
            id: 4,
            movieImage:
                "https://static3.go3.tv/scale/go3/webuploads/rest/upload/vod/5010385/images/19307744?dsth=1080&dstw=1920&srcmode=0&quality=65&type=1&srcx=1&srcy=1&srcw=1/1&srch=1/1",
            movieTitle: "Armagedonas",
        },
        {
            id: 5,
            movieImage:
                "https://static3.go3.tv/scale/go3/webuploads/rest/upload/vod/5010385/images/19307744?dsth=1080&dstw=1920&srcmode=0&quality=65&type=1&srcx=1&srcy=1&srcw=1/1&srch=1/1",
            movieTitle: "Armagedonas",
        },
        {
            id: 6,
            movieImage:
                "https://static3.go3.tv/scale/go3/webuploads/rest/upload/vod/5010385/images/19307744?dsth=1080&dstw=1920&srcmode=0&quality=65&type=1&srcx=1&srcy=1&srcw=1/1&srch=1/1",
            movieTitle: "Armagedonas",
        },
        {
            id: 7,
            movieImage:
                "https://static3.go3.tv/scale/go3/webuploads/rest/upload/vod/5010385/images/19307744?dsth=1080&dstw=1920&srcmode=0&quality=65&type=1&srcx=1&srcy=1&srcw=1/1&srch=1/1",
            movieTitle: "Armagedonas",
        },
    ]);

    const [selectedMovie, setSelectedMovie] = useState([]);

    const handleMovieBoxClick = (id) => {
        const selectedMovie = movies.find((movie) => movie.id === parseInt(id));
        setSelectedMovie(selectedMovie);
    };
    

    let allMovies = movies.map((movie) => {
        return (
            <MovieBox
                key={uuidv4()}
                id={movie.id}
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
            />
            <div className={`d-flex align-items-end mb-4 ${MovieListCSS.movieList}`}>{allMovies}</div>
        </>
    );
}

export default MovieList;
