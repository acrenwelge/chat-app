import Message from './Message.js';
import {useEffect, useState} from 'react';
import socket from './socket.js';
import './Chat.css';

export default function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [userMsg, setUserMsg] = useState('');
  const [userTyping, setUserTyping] = useState(null);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      console.log(`received msg: ${JSON.stringify(msg)}`);
      setMessages(messages.concat(msg));
    });
    socket.on('typing', (username) => {
      setUserTyping(username);
    });
    socket.on('stop typing', (username) => {
      if (userTyping === username) {
        setUserTyping(null);
      }
    })
    socket.on('disconnect', () => {
      socket.removeAllListeners();
    });
    return () => {
      socket.off('chat message');
    }
  });

  let sendMsg = (e) => {
    if (userMsg.trim().length !== 0) {
      socket.emit('chat message', {
        username: props.username,
        text: userMsg
      });
      setUserMsg('');
    }
  }

  let handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMsg();
      socket.emit('stop typing');
    } else {
      setUserMsg(e.target.value)
    }
    if (userMsg.trim().length > 1) {
      socket.emit('typing');
    } else if (userMsg.trim().length === 0) {
      socket.emit('stop typing');
    }
  }

  let disconnect = (e) => {
    socket.close();
    props.leaveChat();
  }

  return (<div>
    <div className="chat">
      {messages.map((msg, i) =>
        <p key={i} >
          <Message msg={msg} />
        </p>)}
      {userTyping && <p id="type"><em><strong>{userTyping}</strong> is typing...</em></p>}
    </div>
    <div className="message">
      <textarea placeholder="What's on your mind?"
        id="chatMsgInput"
        onChange={(e) => setUserMsg(e.target.value)}
        onKeyDown={handleKeyDown}
        value={userMsg}></textarea>
      <button className="bg-green" onClick={sendMsg}>Send</button>
      <button className="bg-red" onClick={disconnect}>Leave Chat</button>
    </div>
  </div>);
}
