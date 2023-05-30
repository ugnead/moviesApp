import React from "react";
import MovieInfoCSS from "./MovieInfo.module.css";

function MovieInfo(props) {
    let {
        id,
        image,
        title,
        releaseYear,
        genre,
        rating,
        
        handleDelete,
        handleEditMovie,
        handleDismiss,
        handleSubmit,
        
        titleInput,
        imageInput,
        yearInput,
        genreInput,
        ratingInput,

        setTitleInput,
        setImageInput,
        setYearInput,
        setGenreInput,
        setRatingInput,

        error,
        editMode
    } = props;

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
                            <button
                                onClick={() => handleEditMovie(id)}
                                type="button"
                                className="btn btn-outline-primary me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                            >
                                Redaguoti
                            </button>
                            <button
                                onClick={() => handleDelete(id)}
                                type="button"
                                className="btn btn-outline-danger"
                            >
                                Ištrinti
                            </button>
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

            {/* POP UP */}
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-4 Edit-pop-up">
                        <div className="modal-header mx-2 border-bottom-0">
                            <h5
                                className="modal-title"
                                id="exampleModalToggleLabel"
                            >
                                {editMode ? 'Redaguoti įrašą' : "Pridėti naują filmą"}                                
                            </h5>
                            <button
                                onClick={handleDismiss}
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="">
                                    <input
                                        onChange={(e) => {
                                            setTitleInput(e.target.value);
                                            console.log(titleInput)
                                        }}
                                        type="text"
                                        id="titleInput"
                                        name="titleInput"
                                        value={titleInput}
                                        className="form-control IncomeNewEntry-input F-size-20"
                                        placeholder="Pavadinimas"
                                        maxLength="50"
                                    />
                                </div>
                                {error && titleInput.length <= 0 ? (
                                    <div className="Error-msg">
                                        Šis laukelis yra privalomas
                                    </div>
                                ) : (
                                    ""
                                )}
                                <div className="">
                                    <input
                                        onChange={(e) =>
                                            setImageInput(e.target.value)
                                        }
                                        type="text"
                                        id="imageInput"
                                        name="imageInput"
                                        value={imageInput}
                                        className="form-control IncomeNewEntry-input F-size-20"
                                        placeholder="Nuotrauka"
                                    />
                                </div>
                                {error && imageInput.length <= 0 ? (
                                    <div className="Error-msg">
                                        Šis laukelis yra privalomas
                                    </div>
                                ) : (
                                    ""
                                )}
                                <div className="">
                                    <input
                                        onChange={(e) =>
                                            setYearInput(e.target.value)
                                        }
                                        type="number"
                                        id="yearInput"
                                        name="yearInput"
                                        value={yearInput}
                                        className="form-control IncomeNewEntry-input F-size-20"
                                        placeholder="Išleidimo metai"
                                        min={1900}
                                        max={9999}
                                    />
                                </div>
                                {error && yearInput <= 0 ? (
                                    <div className="Error-msg">
                                        Šis laukelis yra privalomas
                                    </div>
                                ) : (
                                    ""
                                )}
                                <div className="">
                                    <input
                                        onChange={(e) =>
                                            setGenreInput(e.target.value)
                                        }
                                        type="text"
                                        id="genreInput"
                                        name="genreInput"
                                        value={genreInput}
                                        className="form-control IncomeNewEntry-input F-size-20"
                                        placeholder="Žanras"
                                        maxLength="15"
                                    />
                                </div>
                                {error && genreInput.length <= 0 ? (
                                    <div className="Error-msg">
                                        Šis laukelis yra privalomas
                                    </div>
                                ) : (
                                    ""
                                )}
                                <div className="">
                                    <input
                                        onChange={(e) =>
                                            setRatingInput(e.target.value)
                                        }
                                        type="number"
                                        id="ratingInput"
                                        name="ratingInput"
                                        value={ratingInput}
                                        className="form-control IncomeNewEntry-input F-size-20"
                                        placeholder="Mano įvertinimas"
                                        min={1}
                                        max={5}
                                    />
                                </div>
                                {error && ratingInput <= 0 ? (
                                    <div className="Error-msg">
                                        Šis laukelis yra privalomas
                                    </div>
                                ) : (
                                    ""
                                )}

                                <div className="d-flex my-3">
                                    <button
                                        type="submit"
                                        className="btn F-size-20 Roboto-condensed Main-btn3 Bg-light-blue Edit-btn me-2"
                                        data-bs-target={
                                            titleInput.length <= 0 ||
                                            imageInput.length <= 0 ||
                                            yearInput <= 0 ||
                                            genreInput.length <= 0 ||
                                            ratingInput <= 0
                                                ? ""
                                                : "#exampleModalToggle2"
                                        }
                                        data-bs-toggle={
                                            titleInput.length <= 0 ||
                                            imageInput.length <= 0 ||
                                            yearInput <= 0 ||
                                            genreInput.length <= 0 ||
                                            ratingInput <= 0
                                                ? ""
                                                : "modal"
                                        }
                                    >
                                        Patvirtinti
                                    </button>
                                    <button
                                        onClick={handleDismiss}
                                        type="button"
                                        className="btn F-size-20 Roboto-condensed Main-btn3 Bg-light-red Del-btn ms-2"
                                        data-bs-dismiss="modal"
                                    >
                                        Atšaukti
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="modal fade"
                id="exampleModalToggle2"
                aria-hidden="true"
                aria-labelledby="exampleModalToggleLabel2"
                tabIndex="-1"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-4 Edit-pop-up">
                        <div className="modal-header border-bottom-0">
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body mb-4">
                            <div className="success-animation mb-4">
                                <svg
                                    className="checkmark"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 52 52"
                                >
                                    <circle
                                        className="checkmark__circle"
                                        cx="26"
                                        cy="26"
                                        r="25"
                                        fill="none"
                                    />
                                    <path
                                        className="checkmark__check"
                                        fill="none"
                                        d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                    />
                                </svg>
                            </div>
                            <p className="F-size-25 Roboto-condensed text-center">
                                Įrašas sėkmingai atnaujintas
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieInfo;
