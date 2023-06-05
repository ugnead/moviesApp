import React from 'react';
import MovieBoxCSS from './MovieBox.module.css';

function MovieBox(props) {
    let {id, image, title, handleMovieBoxClick} = props;

    const handleClick = () => {
        handleMovieBoxClick(id);
    };

    return (
        <>
            <div onClick={handleClick} className={`m-1 ${MovieBoxCSS.box}`}>
                <img className={`rounded-1 ${MovieBoxCSS.img}`} src={image} alt={title} />
                <div>{title}</div>
            </div>
        </>
        
    )
}

export default MovieBox