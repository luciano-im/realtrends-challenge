import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Products from './components/products';
import Form from './components/form';
import logo from './logo.svg';

const socket = io('http://127.0.0.1:8000');

function App() {
  const [products, setProducts] = useState([]);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    socket.on('state', (data) => {
      const parsedData = JSON.parse(data);
      setProducts(Array.from(parsedData.products));
      setVotes(Array.from(parsedData.votes));
    });
  }, []);

  useEffect(() => {
    socket.on('vote', (data) => {
      const parsedData = JSON.parse(data);
      setVotes(Array.from(parsedData.votes));
    });
  }, []);

  const handleVote = (product, comment) => {
    socket.emit('vote', {
      // TODO Set user
      user: 'User1',
      product: product,
      comment: comment,
    });
  };

  return (
    <div className="app">
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <p>Lets get this party started</p>
      </header>
      <Products products={products} votes={votes} />
      <Form products={products} handleVote={handleVote} />
    </div>
  );
}

export default App;
