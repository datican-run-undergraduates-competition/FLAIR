import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Landing from './Landing';
import Auth from './Auth';
import './App.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [context, setContext] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = useRef(null);
  const auth = getAuth();
  const user = auth.currentUser;

  // Replace with your Cloud Function and Worker URLs
  const CLOUD_FUNCTION_URL = 'YOUR_CLOUD_FUNCTION_URL/chat';
  const WORKER_URL = 'YOUR_CLOUD_WORKER_URL';

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim()) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [...prev, { sender: 'You', text: input, timestamp }]);
      setIsTyping(true);
      try {
        const token = await user.getIdToken();
        const response = await fetch(CLOUD_FUNCTION_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ message: input, context })
        });
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { sender: 'Flair', text: data.response, sentiment: data.sentiment, timestamp: data.timestamp }
        ]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { sender: 'Flair', text: 'Sorry, something went wrong!', timestamp }
        ]);
      } finally {
        setIsTyping(false);
      }
      setInput('');
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Flair Chatbot</h1>
        <p>Your mental health companion</p>
        <button onClick={() => auth.signOut()} className="signout">Sign Out</button>
      </header>
      <main className="chat-container">
        <div className="context-box">
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Optional: Provide context for Q&A..."
            aria-label="Context for questions"
          />
        </div>
        <div className="chat-box" ref={chatBoxRef} role="log" aria-live="polite">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === 'You' ? 'user' : 'bot'}`}
            >
              <div className="message-content">
                <span className="sender">{msg.sender}</span>
                <p>{msg.text}</p>
                {msg.sentiment && <span className="sentiment">Sentiment: {msg.sentiment}</span>}
                <span className="timestamp">{msg.timestamp}</span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message bot typing">
              <div className="message-content">
                <span className="sender">Flair</span>
                <p className="typing-indicator">...</p>
              </div>
            </div>
          )}
        </div>
        <div className="input-box">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            aria-label="Type your message"
            autoFocus
          />
          <button onClick={sendMessage} aria-label="Send message">
            Send
          </button>
        </div>
      </main>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="/auth" />}
        />
      </Routes>
    </Router>
  );
}

export default App;