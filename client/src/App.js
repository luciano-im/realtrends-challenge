import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import logo from './logo.svg';
import productImg from './product.jpg';

const socket = io('http://127.0.0.1:8000');

function App() {
  const [products, setProducts] = useState([]);
  const [votes, setVotes] = useState([]);
  const [formData, setFormData] = useState({
    product: '',
    comment: '',
  });

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

  const handleFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleVote = (event) => {
    event.preventDefault();
    socket.emit('vote', {
      // TODO Set user
      user: 'User1',
      product: formData.product,
      comment: formData.comment,
    });
    // setFormData({ product: '', comment: '' });
  };

  return (
    <div className="app">
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
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
                  {votes
                    .filter((vote) => {
                      return vote.product === product.id;
                    })
                    .map((vote) => {
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
      <section className="vote-form">
        <form method="">
          <div>
            {products.map((product) => {
              return (
                <label key={product.id}>
                  <input
                    type="radio"
                    id={product.id}
                    name="product"
                    value={product.id}
                    onChange={handleFormData}
                  ></input>
                  {product.title}
                </label>
              );
            })}
          </div>
          <div>
            <label>
              Comentario
              <input
                type="text"
                name="comment"
                onChange={handleFormData}
                placeholder="Comentario"
              ></input>
            </label>
          </div>
          <div>
            <input type="submit" value="Votar!" onClick={handleVote}></input>
          </div>
        </form>
      </section>
    </div>
  );
}

export default App;
