import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Movies = ({ handleAddItem, handleDeleteItem, myList }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        setMovies(response.data.results);
      } catch (error) {
        setError('Error fetching movies');
      }
    };

    fetchMovies();
  }, []);

  const isInMyList = (movie) => {
    return myList.some((item) => item.text === movie);
  };

  return (
    <div>
      <h1>Popular Movies</h1>
      {error && <p>{error}</p>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            {isInMyList(movie.title) ? (
              <button onClick={() => handleDeleteItem(myList.findIndex(item => item.text === movie.title))}>Remove from My List</button>
            ) : (
              <button onClick={() => handleAddItem(movie.title)}>Add to My List</button>
            )}
          </li>
        ))}
      </ul>
      <h2>My List</h2>
      <ul>
        {myList.map((item, index) => (
          <li key={index}>
            {item.text}
            <button onClick={() => handleDeleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;