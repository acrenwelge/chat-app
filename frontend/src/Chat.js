import Message from './Message.js';
import {useEffect, useState} from 'react';
import socket from './socket.js';
import './Chat.css';

export default function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [userMsg, setUserMsg] = useState('');

  useEffect(() => {
    socket.emit('join chat', {username: props.username});
    socket.on('chat message', (msg) => {
      console.log(`received msg: ${JSON.stringify(msg)}`);
      setMessages(messages.concat(msg));
    });
    socket.on('disconnect', () => {
      socket.removeAllListeners();
    });
    return () => { socket.off('chat message') }
  });

  let sendMsg = (e) => {
    socket.emit('chat message', {
      username: props.username,
      text: userMsg
    });
    setUserMsg('');
  }

  return (<div>
    <div className="chat">
      {messages.map((msg, i) =>
        <p key={i} >
          <Message msg={msg} />
        </p>)}
    </div>
    <div className="message">
      <input placeholder="What's on your mind?"
        id="chatMsgInput"
        cols="100"
        rows="2"
        onChange={(e) => setUserMsg(e.target.value)}
        value={userMsg}></input>
      <button className="btn" onClick={sendMsg}>Send</button>
    </div>
  </div>);
}
