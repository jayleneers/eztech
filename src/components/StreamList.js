import React, { useState, useEffect } from 'react';

const StreamList = ({ handleAddItem, handleDeleteItem, myList }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const predefinedTopMovies = ['Inception', 'The Dark Knight', 'Interstellar'];
  const predefinedNewMovies = ['Dune', 'No Time to Die', 'Shang-Chi'];

  const allItems = [
    ...predefinedTopMovies,
    ...predefinedNewMovies,
  ];

  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(myList));
  }, [myList]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const results = allItems.filter((item) =>
        item.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const isInMyList = (movie) => {
    return myList.some((item) => item.text === movie);
  };

  return (
    <div>
      <h1>StreamList</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
      
      <div>
        <h2>Top Movies</h2>
        <ul>
          {predefinedTopMovies.map((movie, index) => (
            <li key={index}>
              {movie} 
              {isInMyList(movie) ? (
                <button onClick={() => handleDeleteItem(myList.findIndex(item => item.text === movie))}>Remove</button>
              ) : (
                <button onClick={() => handleAddItem(movie)}>Add</button>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h2>New Movies</h2>
        <ul>
          {predefinedNewMovies.map((movie, index) => (
            <li key={index}>
              {movie} 
              {isInMyList(movie) ? (
                <button onClick={() => handleDeleteItem(myList.findIndex(item => item.text === movie))}>Remove</button>
              ) : (
                <button onClick={() => handleAddItem(movie)}>Add</button>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h2>My List</h2>
        <ul>
          {myList.map((item, index) => (
            <li key={index} style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
              {item.text}
              <button onClick={() => handleDeleteItem(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StreamList;