import './App.css';
import {useState} from 'react';
import socket from './socket.js';
import Chat from './Chat.js';

function App() {
  const [displayChat, setDisplayChat] = useState(false);
  const [username, setUsername] = useState('');

  let enableChat = (e) => {
    socket.emit('join chat', {username: username});
    setDisplayChat(true);
  }

  const usernamePrompt = (
    <p>Username:
      <input id="username" type="text" onChange={(e) => setUsername(e.target.value)}/>
      <button className="btn" onClick={enableChat}>Enter the chat</button>
    </p>
  )
  return (
    <main className="container">
      <h1>Socket.io App</h1>
      {displayChat ? <Chat username={username} leaveChat={(e) => setDisplayChat(false)}/> : usernamePrompt}
    </main>
  );
}

export default App;
