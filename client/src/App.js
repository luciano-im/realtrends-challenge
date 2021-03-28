import { io } from 'socket.io-client';

import logo from './logo.svg';

const socket = io('http://127.0.0.1:8000');

socket.on('connect', () => {
  console.log(socket.id);
});

// socket.emit('vote', { user: 'User1', product: 'B', comment: 'Mi comentario' });

socket.on('vote', (data) => {
  console.log(data);
});

socket.on('state', (data) => {
  console.log(data);
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
