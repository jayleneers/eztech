import React, { useState } from 'react';



const StreamList = () => {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
     
      <h1>StreamList Page</h1>
      <input type="text" value={input} onChange={handleInputChange} placeholder="Enter title" />
    </div>
  );
};

export default StreamList;
