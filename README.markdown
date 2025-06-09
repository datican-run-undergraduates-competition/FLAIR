# Flair Chatbot

AI-powered mental health chatbot with Hugging Face APIs, Firebase auth, and grok.com-inspired UI. Hosted on Netlify with Google Cloud Functions backend and Cloudflare Workers for edge computing.

## Demo

- Live: \[flair/chat\](netlifylivedemo)
- Local: `http://localhost:3000`

## Features

- AI trained Models: Mixtral (text gen), DistilBERT (sentiment), RoBERTa (Q&A)
- UI: grok.com-inspired, animated, responsive
- Auth: Firebase (email, Google)
- Edge: Cloudflare Workers
- Accessible: ARIA, keyboard nav

## Setup

1. **Software**: Node.js 18+, Git, Google Cloud CLI, VS Code (optional)
2. **Accounts**: Hugging Face, Firebase, Google Cloud, Cloudflare, Netlify, GitHub
3. **Clone**: `git clone https://github.com/your-username/flair-chatbot.git`
4. **Backend**:

   ```cmd
   cd backend
   gcloud functions deploy flair-chatbot ^
     --gen2 --runtime python39 --region us-central1 ^
     --source . --entry-point flair_chatbot --trigger-http ^
     --allow-unauthenticated --set-env-vars HUGGINGFACE_TOKEN=your-hf-token
   ```
5. **Worker**: Paste `worker.js` in Cloudflare, add `HUGGINGFACE_TOKEN`, deploy
6. **Frontend**:
   - Update `src/App.js` (Cloud Function, Worker URLs)
   - Update `src/firebase.js` (Firebase config)
   - Run:

     ```cmd
     npm install
     npm start
     ```
7. **Deploy**: Push to GitHub, connect to Netlify (build: `npm run build`, publish: `build`)

## Demo Prep

- Show: Netlify URL or local
- Flow: Landing, auth, chat (“I’m sad” for sentiment, Q&A with context)
- Highlight: UI, APIs, auth, edge, accessibility
- Fallback: GitHub repo, screenshots

## Structure

```
flair-chatbot/
├── .github/ISSUE_TEMPLATE/
│   ├── bug_report.md
│   ├── feature_request.md
├── backend/
│   ├── main.py
│   ├── requirements.txt
├── public/
│   ├── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   ├── Auth.js
│   ├── Landing.js
│   ├── firebase.js
│   ├── index.js
│   ├── index.css
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
├── netlify.toml
├── package.json
├── tailwind.config.js
├── worker.js
```

## Troubleshooting

- Hugging Face: Test token with `curl`
- Firebase: Check config
- Cloud Functions: `gcloud functions logs read`
- Cloudflare: Verify Worker logs
- Netlify: Check build logs, `netlify.toml`

## Contributing

See CONTRIBUTING.md

## License

MIT - see LICENSE

## Contact

inyangignatius@hotmail.com