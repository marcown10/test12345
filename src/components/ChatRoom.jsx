import { useRef, useEffect } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 80vh;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const MessageForm = styled.form`
  display: flex;
  padding: 1rem;
  border-top: 1px solid #eee;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  margin-right: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #0084ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0073e6;
  }
`;

const Message = styled.div`
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: ${props => props.$type === 'system' ? '#f0f2f5' : '#e3f2fd'};
`;

function ChatRoom({ username, messages, onSendMessage }) {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <Message key={index} $type={msg.type}>
            {msg.type === 'system' ? (
              <em>{msg.content}</em>
            ) : (
              <><strong>{msg.user}:</strong> {msg.content}</>
            )}
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <MessageForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </MessageForm>
    </ChatContainer>
  );
}

export default ChatRoom;
