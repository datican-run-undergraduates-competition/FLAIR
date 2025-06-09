import os
import functions_framework
from fastapi import FastAPI, HTTPException, Header
from pydantic import BaseModel
from firebase_admin import initialize_app, auth
import requests
from datetime import datetime

# Initialize Firebase
initialize_app()

# Initialize FastAPI
app = FastAPI()

# Hugging Face API endpoints
HF_API_URLS = {
    "text_generation": "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
    "sentiment": "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
    "qa": "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2"
}

# Request models
class ChatRequest(BaseModel):
    message: str
    context: str = ""

class ChatResponse(BaseModel):
    response: str
    sentiment: str
    timestamp: str

# Verify Firebase token
def verify_token(authorization: str):
    try:
        token = authorization.replace("Bearer ", "")
        decoded_token = auth.verify_id_token(token)
        return decoded_token["uid"]
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, authorization: str = Header(None)):
    try:
        # Verify user
        verify_token(authorization)
        
        # Hugging Face headers
        hf_headers = {"Authorization": f"Bearer {os.environ.get('HUGGINGFACE_TOKEN')}"}
        
        # 1. Sentiment analysis
        sentiment_response = requests.post(
            HF_API_URLS["sentiment"],
            headers=hf_headers,
            json={"inputs": request.message}
        )
        sentiment_response.raise_for_status()
        sentiment = sentiment_response.json()[0]["label"]
        
        # 2. Question answering if context provided
        if request.context:
            qa_response = requests.post(
                HF_API_URLS["qa"],
                headers=hf_headers,
                json={"inputs": {"question": request.message, "context": request.context}}
            )
            qa_response.raise_for_status()
            response_text = qa_response.json()["answer"]
        else:
            # 3. Text generation
            tg_response = requests.post(
                HF_API_URLS["text_generation"],
                headers=hf_headers,
                json={"inputs": f"You are Flair, a mental health chatbot. Respond supportively to: {request.message}"}
            )
            tg_response.raise_for_status()
            response_text = tg_response.json()[0]["generated_text"].split("You are Flair")[0].strip()
        
        # Timestamp
        timestamp = datetime.now().strftime("%I:%M %p")
        return ChatResponse(response=response_text, sentiment=sentiment, timestamp=timestamp)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Cloud Function entry point
@functions_framework.http
def flair_chatbot(request):
    from starlette.middleware.cors import CORS
    app.add_middleware(CORS, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
    from uvicorn import Config, Server
    config = Config(app=app, host="0.0.0.0", port=8080)
    server = Server(config)
    return server.handle_request(request)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)