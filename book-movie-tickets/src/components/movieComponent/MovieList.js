import React from 'react';
import MovieItem from './MovieItem';
import { useNavigate } from 'react-router-dom';

const MovieList = ({ movies,onClick }) => {
    
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieItem key={movie.id} movie={movie}  />
      ))}
    </div>
  );
};

export default MovieList;