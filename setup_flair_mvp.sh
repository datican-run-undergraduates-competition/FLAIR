#!/bin/bash

# Create folders
mkdir -p backend frontend/src .github/ISSUE_TEMPLATE

# Create backend files
cat > backend/main.py << 'EOF'
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Flair API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

responses = {
    "hi": "Hello! How can I help you today?",
    "how are you": "I'm here for you! How about you, how are you feeling?",
    "sad": "I'm sorry to hear that. Want to share more? I'm listening.",
    "happy": "That's awesome! What's making you happy today?",
}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.websocket("/ws/chat")
async def websocket_chat(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            message = await websocket.receive_text()
            response = responses.get(message.lower(), "I'm not sure how to respond, but I'm here for you!")
            await websocket.send_text(response)
    except:
        await websocket.close()
EOF

cat > backend/requirements.txt << 'EOF'
fastapi==0.104.1
uvicorn==0.24.0
EOF

cat > backend/Dockerfile << 'EOF'
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
EOF

# Create frontend files
cat > frontend/package.json << 'EOF'
{
  "name": "flair-chatbot-frontend",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "websocket": "^1.0.34"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
EOF

cat > frontend/src/App.js << 'EOF'
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
          <div key={index} className={'message ${msg.sender === 'You' ? 'user' : 'bot'}'}>
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
EOF

cat > frontend/src/App.css << 'EOF'
.app {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.chat-box {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
}

.message {
  margin: 5px 0;
  padding: 8px;
  border-radius: 5px;
}

.message.user {
  background-color: #e1f5fe;
  text-align: right;
}

.message.bot {
  background-color: #f0f0f0;
  text-align: left;
}

.input-box {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
EOF

cat > frontend/Dockerfile << 'EOF'
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
EOF

# Create Docker Compose
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    command: npm start
EOF

# Create .env.example
cat > .env.example << 'EOF'
REACT_APP_API_URL=http://localhost:8000
EOF

# Create .gitignore
cat > .gitignore << 'EOF'
.env
node_modules/
venv/
*.pyc
.DS_Store
EOF

# Create LICENSE
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2025 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF

# Create README.md
cat > README.md << 'EOF'
# Flair

A mental health chatbot with AI-driven chat for real-time support.

## Demo
Try the live demo at http://localhost:3000 (after setup).

## Quick Start

### What You Need
- Python 3.11+
- Node.js 18+
- Docker (optional)
- GitHub account

### Set Up
1. Clone the project:
   ```bash
   git clone https://github.com/your-username/flair-chatbot.git
   cd flair-chatbot