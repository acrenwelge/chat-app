import './App.css';
import {useEffect, useState} from 'react';
import socket from './socket.js';
import Chat from './Chat.js';

function App() {
  const [displayChat, setDisplayChat] = useState(false);
  const [username, setUsername] = useState('');
  const [activeUsers, setActiveUsers] = useState([]);

  let enableChat = (e) => {
    socket.emit('join chat', username);
    setDisplayChat(true);
  }

  useEffect(() => {
    socket.on('active userlist', (set) => {
      setActiveUsers(set);
    });
    return () => { socket.off('active userlist'); }
  });

  const usernamePrompt = (
    <p>Username:
      <input id="username" type="text" onChange={(e) => setUsername(e.target.value)}/>
      <button className="btn" onClick={enableChat}>Enter the chat</button>
    </p>
  )
  return (
    <main className="container">
      <h1>Socket.io App</h1>
      <div>
        {displayChat ? <Chat username={username} leaveChat={(e) => setDisplayChat(false)}/> : usernamePrompt}
      </div>
      <div>
        <ul>
          {activeUsers.map(user => <li>{user}</li>)}
        </ul>
      </div>
    </main>
  );
}

export default App;
