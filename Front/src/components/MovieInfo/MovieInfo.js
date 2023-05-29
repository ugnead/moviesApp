import React from "react";
import MovieInfoCSS from "./MovieInfo.module.css";

function MovieInfo(props) {
    let { image, title, releaseYear, genre, rating } = props;

    return (
        <>
            <div className="container w-75 mt-5">
                <div className="row">
                    <div className="col">
                        <h3 className="fs-1">{title}</h3>
                        <p>Išleidimo data: {releaseYear}</p>
                        <p>Žanras: {genre}</p>
                        <p>Mano įvertinimas: {rating}</p>
                        <div className="col">
                            <button type="button" className="btn btn-outline-primary me-2">Redaguoti</button>
                            <button type="button" className="btn btn-outline-danger">Ištrinti</button>
                        </div>
                    </div>
                    <div className="col text-center">
                        <img
                            className={`rounded-1 ${MovieInfoCSS.img}`}
                            src={image}
                            alt={title}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieInfo;
