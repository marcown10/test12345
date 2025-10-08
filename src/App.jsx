import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
`;

const socket = io('http://localhost:3000');

function App() {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const handleLogin = (name) => {
    setUsername(name);
    socket.emit('join', name);
  };

  const sendMessage = (message) => {
    socket.emit('message', message);
  };

  return (
    <AppContainer>
      {!username ? (
        <Login onLogin={handleLogin} />
      ) : (
        <ChatRoom
          username={username}
          messages={messages}
          onSendMessage={sendMessage}
        />
      )}
    </AppContainer>
  </AppContainer>
}

export default App;
