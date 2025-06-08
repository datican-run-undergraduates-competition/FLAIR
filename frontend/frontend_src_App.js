import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8000/ws/chat');
    setWs(websocket);

    websocket.onmessage = (event) => {
      setMessages((prev) => [...prev, { sender: 'Flair', text: event.data }]);
    };

    return () => websocket.close();
  }, []);

  const sendMessage = () => {
    if (input.trim() && ws) {
      ws.send(input);
      setMessages((prev) => [...prev, { sender: 'You', text: input }]);
      setInput('');
    }
  };

  return (
    <div className="app">
      <h1>Flair Chatbot</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'You' ? 'user' : 'bot'}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;