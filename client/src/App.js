import React, { useState } from 'react';
import { io } from 'socket.io-client';

import logo from './logo.svg';
import productImg from './product.jpg';

const socket = io('http://127.0.0.1:8000');

function App() {
  socket.on('vote', (data) => {
    console.log(data);
  });

  socket.on('state', (data) => {
    const parsedData = JSON.parse(data);
    setProducts(Array.from(parsedData.products));
    setVotes(Array.from(parsedData.votes));
  });

  const [products, setProducts] = useState([]);
  const [votes, setVotes] = useState([]);

  const handleVote = (vote) => {
    socket.emit('vote', {
      user: 'User1',
      product: 'B',
      comment: 'Mi comentario',
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Lets get this party started</p>
      </header>
      <section className="products">
        {products.map((product) => {
          return (
            <article key={product.id} className="product">
              <h1 className="title">{product.title}</h1>
              <p className="description">{product.description}</p>
              <img src={productImg} alt={product.title} width="300"></img>
              <div className="votes">
                <ul>
                  {votes.map((vote) => {
                    return (
                      <li key={vote.user} className="vote">
                        <span className="user">{vote.user}:</span>{' '}
                        {vote.comment}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

export default App;
