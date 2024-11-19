import React, { useState } from 'react';

const StreamList = () => {
  const [myList, setMyList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const predefinedTopMovies = ['Inception', 'The Dark Knight', 'Interstellar'];
  const predefinedNewMovies = ['Despicable Me 4', 'Deadpool & Wolverine', 'Twisters'];


  const allItems = [
    ...predefinedTopMovies,
    ...predefinedNewMovies,
  
  ];

  const handleAddItem = (item) => {
    setMyList((prev) => [...prev, item]);
  };

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
              {movie} <button onClick={() => handleAddItem(movie)}>Add</button>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h2>New Movies</h2>
        <ul>
          {predefinedNewMovies.map((movie, index) => (
            <li key={index}>
              {movie} <button onClick={() => handleAddItem(movie)}>Add</button>
            </li>
          ))}
        </ul>
      </div>
      
  
      
      <div>
        <h2>My List</h2>
        <ul>
          {myList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StreamList;