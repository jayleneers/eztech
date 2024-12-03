import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
  const [myList, setMyList] = useState(() => {
    const saved = localStorage.getItem('myList');
    return saved ? JSON.parse(saved) : [];
  });

  const handleAddItem = (item) => {
    const updatedList = [...myList, { text: item, completed: false }];
    setMyList(updatedList);
    localStorage.setItem('myList', JSON.stringify(updatedList));
  };

  const handleDeleteItem = (index) => {
    const updatedList = myList.filter((_, i) => i !== index);
    setMyList(updatedList);
    localStorage.setItem('myList', JSON.stringify(updatedList));
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<StreamList handleAddItem={handleAddItem} handleDeleteItem={handleDeleteItem} />} />
          <Route path="/movies" element={<Movies handleAddItem={handleAddItem} handleDeleteItem={handleDeleteItem} myList={myList} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;