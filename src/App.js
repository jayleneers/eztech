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
          <Route path="/" element={<StreamList handleAddItem={handleAddItem} handleDeleteItem={handleDeleteItem} myList={myList} />} />
          <Route path="/movies" element={<Movies handleAddItem={handleAddItem} handleDeleteItem={handleDeleteItem} myList={myList} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, (error) => {
      console.log('ServiceWorker registration failed: ', error);
    });
  });
}
export default App;