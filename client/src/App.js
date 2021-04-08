import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Products from './components/products';
import Form from './components/vote-form';
import UserForm from './components/user-form';
import Modal from './components/modal';
import Footer from './components/footer';
import PollButtons from './components/poll-buttons';
import logo from './logo.svg';

const socket = io('http://127.0.0.1:8000');

function App() {
  const [products, setProducts] = useState([]);
  const [votes, setVotes] = useState([]);
  const [user, setUser] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showVoting, setShowVoting] = useState(false);
  const [paused, setPaused] = useState(false);

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

  useEffect(() => {
    socket.on('products', (data) => {
      const parsedData = JSON.parse(data);
      setProducts(Array.from(parsedData.products));
    });
  }, []);

  useEffect(() => {
    if (products.length === 2) {
      setShowVoting(true);
    }
  }, [products]);

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

  const handleSetProducts = (data) => {
    socket.emit('product', {
      data: [...data],
    });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handlePause = (status) => {
    setPaused(status);
  };

  const handleRestart = () => {
    setProducts([]);
    setVotes([]);
    setShowVoting(false);
    setPaused(false);
    socket.emit('restart', {
      restart: true,
    });
  };

  const AppContent = () => {
    if (user.length > 0) {
      if (showVoting) {
        return (
          <>
            <PollButtons
              paused={paused}
              onPause={handlePause}
              onRestart={handleRestart}
            />
            <Products products={products} votes={votes} />
            <Form products={products} handleVote={handleVote} paused={paused} />
          </>
        );
      } else {
        return (
          <button className="search-products" onClick={handleShowModal}>
            Buscar productos!
          </button>
        );
      }
    } else {
      return <UserForm handleUser={handleUser} />;
    }
  };

  return (
    <div className="app">
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <p>Lets get this party started</p>
      </header>
      <AppContent />
      <Modal
        show={showModal}
        products={products}
        setShowModal={setShowModal}
        setProducts={handleSetProducts}
      />
      <Footer
        sticky={user.length > 0 && products.length === 2 ? false : true}
      />
    </div>
  );
}

export default App;
