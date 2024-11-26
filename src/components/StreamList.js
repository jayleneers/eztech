import React, { useState } from 'react';

const StreamList = () => {
  const [myList, setMyList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState('');

  const predefinedTopMovies = ['Inception', 'The Dark Knight', 'Interstellar'];
  const predefinedNewMovies = ['Dune', 'No Time to Die', 'Shang-Chi'];

  const allItems = [
    ...predefinedTopMovies,
    ...predefinedNewMovies,
  ];

  const handleAddItem = (item) => {
    setMyList((prev) => [...prev, { text: item, completed: false }]);
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

  const handleEditChange = (e) => {
    setEditInput(e.target.value);
  };

  const handleEditSubmit = (index) => {
    const updatedList = myList.map((item, i) =>
      i === index ? { ...item, text: editInput } : item
    );
    setMyList(updatedList);
    setEditIndex(null);
    setEditInput('');
  };

  const handleDelete = (index) => {
    const updatedList = myList.filter((_, i) => i !== index);
    setMyList(updatedList);
  };

  const handleComplete = (index) => {
    const updatedList = myList.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setMyList(updatedList);
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
            <li key={index} style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editInput}
                    onChange={handleEditChange}
                  />
                  <button onClick={() => handleEditSubmit(index)}>Save</button>
                </>
              ) : (
                <>
                  {item.text}
                  <button onClick={() => setEditIndex(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                  <button onClick={() => handleComplete(index)}>
                    {item.completed ? 'Undo' : 'Complete'}
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StreamList;