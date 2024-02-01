import React from 'react';
import { Link } from 'react-router-dom';

const MovieItem = ({ movie }) => {
  return (
    <Link to={`/movie-detail/${movie.id}`} className="moveToDetail">
    <div className="movie-item">
        
      <img src={movie.imageSrc} alt={movie.title} />
      <h3 style={{opacity:0.8,textDecoration: 'none',color:'black'}}>{movie.title}</h3>
      
    </div>
    </Link>
  );
};

export default MovieItem;
