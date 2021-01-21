import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import { io } from 'socket.io-client';

function App() {
  const socket = io("ws://localhost:8080");
  const [msg, setMsg] = useState({});
  useEffect(() => {
    fetch("http://localhost:8080/hello")
      .then(resp => resp.json())
      .then(data => setMsg(data))
      .catch(e => console.error(e));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit me <code>src/App.js</code> and {msg.msg}.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
