import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Products from './components/products';
import Form from './components/vote-form';
import UserForm from './components/user-form';
import logo from './logo.svg';
import twitter from './twitter.svg';
import github from './github.svg';

const socket = io('http://127.0.0.1:8000');

function App() {
  const [products, setProducts] = useState([]);
  const [votes, setVotes] = useState([]);
  const [user, setUser] = useState('');

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

  const handleUser = (user) => {
    setUser(user);
  };

  const handleVote = (product, comment) => {
    socket.emit('vote', {
      user: user,
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
      {user.length > 0 ? (
        <>
          <Products products={products} votes={votes} />
          <Form products={products} handleVote={handleVote} />
        </>
      ) : (
        <UserForm handleUser={handleUser} />
      )}
      <footer className={user.length > 0 ? '' : 'sticky'}>
        <p>
          <a href="https://www.real-trends.com/" className="real-trends">
            Real Trends
          </a>{' '}
          challenge por <a href="https://www.luciano.im/">Luciano Muñoz</a>
        </p>
        <p className="social">
          <span>
            <img src={twitter} className="twitter" alt="twitter" />
            <a href="https://twitter.com/luciano_dev">@luciano_dev</a>
          </span>
          <span>
            <img src={github} className="github" alt="github" />
            <a href="https://github.com/luciano-im">luciano-im</a>
          </span>
        </p>
      </footer>
    </div>
  );
}

//TODO Mercado Libre --> https://api.mercadolibre.com/sites/MLM/search?q=
//TODO Pausar, Reanudar y Reiniciar votación

export default App;
