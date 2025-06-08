from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Flair API")

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple rule-based responses
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