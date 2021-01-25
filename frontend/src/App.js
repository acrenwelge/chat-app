import './App.css';
import {useState} from 'react';
import Chat from './Chat.js';

function App() {
  const [displayChat, setDisplayChat] = useState(false);
  const [username, setUsername] = useState('');

  // useEffect(() => {
  //   fetch("http://localhost:8080/messages")
  //     .then(resp => resp.json())
  //     .then(data => setMessages(data))
  //     .catch(e => console.error(e));
  // }, []);

  let enableChat = (e) => {
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
      {displayChat ? <Chat username={username}/> : usernamePrompt}
    </main>
  );
}

export default App;
