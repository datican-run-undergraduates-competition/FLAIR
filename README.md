# Flair Chatbot

Flair Chatbot is an AI-powered mental health companion designed to provide supportive conversations using Hugging Face APIs. Featuring a world-class, grok.com-inspired user interface, user authentication, and edge computing for low-latency responses, Flair offers a modern, accessible, and responsive experience. 
## Demo
- Live Demo: [flair/chat](#deploy-to-netlify)
- Local Demo: Run at `http://localhost:3000`

## Features
- AI-Powered Chat:
  - Text Generation: Hugging Face `mistralai/Mixtral-8x7B-Instruct-v0.1` for supportive conversational responses.
  - Sentiment Analysis: `distilbert-base-uncased-finetuned-sst-2-english` to detect user emotions (e.g., "POSITIVE" or "NEGATIVE").
  - Question Answering: `deepset/roberta-base-squad2` for context-based Q&A.
- User Interface: Inspired by [grok.com](https://grok.com), with a sleek dark theme, animated landing page, and modern chat interface (bubbles, typing indicator).
- Authentication: Firebase Authentication with email/password and Google sign-in.
- Edge Computing: Cloudflare Workers cache API responses for low-latency access, optimized for users in Nigeria.
- Responsive Design: Mobile-friendly layout with smooth animations (Framer Motion).
- Accessibility: ARIA labels, keyboard navigation, and semantic HTML for inclusive use.
- Deployment: Frontend hosted on Netlify, backend on Google Cloud Functions.

## Tech Stack
- Frontend: React, Tailwind CSS, Framer Motion, React Router
- Backend: Google Cloud Functions, FastAPI, Firebase Admin SDK
- AI: Hugging Face Inference API (Mixtral, DistilBERT, RoBERTa)
- Auth: Firebase Authentication
- Edge: Cloudflare Workers
- Hosting: Netlify
- Version Control: Git, GitHub

## Prerequisites
To set up and run Flair Chatbot, you need:
- Hardware: Windows PC (based on your path: `C:\Users\IGNATIUS EMMANUEL`)
- Software:
  - Node.js 18+ ([nodejs.org](https://nodejs.org))
  - Git ([git-scm.com](https://git-scm.com))
  - Google Cloud CLI ([cloud.google.com/sdk](https://cloud.google.com/sdk))
  - Visual Studio Code (optional, [code.visualstudio.com](https://code.visualstudio.com))
- Accounts:
  - Hugging Face ([huggingface.co](https://huggingface.co)) for API token
  - Firebase ([firebase.google.com](https://firebase.google.com)) for authentication
  - Google Cloud ([cloud.google.com](https://cloud.google.com)) for backend
  - Cloudflare ([cloudflare.com](https://cloudflare.com)) for edge computing
  - Netlify ([netlify.com](https://netlify.com)) for frontend hosting
  - GitHub ([github.com](https://github.com)) for repository

## Installation
Follow these steps to set up the project on your Windows PC.

### 1. Install Software
1. Node.js:
   - Download and install LTS version from [nodejs.org](https://nodejs.org).
   - Verify in Command Prompt:
     ```cmd
     node --version
     npm --version
     ```
     - Expect: `v18.x.x` and `v9.x.x` or higher.
2. Git:
   - Download and install from [git-scm.com](https://git-scm.com).
   - Verify:
     ```cmd
     git --version
     ```
     - Expect: `git version 2.x.x`.
3. Google Cloud CLI:
   - Download Windows installer from [cloud.google.com/sdk](https://cloud.google.com/sdk).
   - Install and initialize:
     ```cmd
     gcloud init
     ```
     - Sign in via browser, create project `flair-chatbot-backend`, select region `us-central1`.
   - Authenticate:
     ```cmd
     gcloud auth application-default login
     ```
4. Visual Studio Code (optional):
   - Download from [code.visualstudio.com](https://code.visualstudio.com).

### 2. Set Up Accounts
1. Hugging Face:
   - Sign up at [huggingface.co](https://huggingface.co).
   - Go to Profile > Settings > Access Tokens > New token > Name: `flair-chatbot`, Role: `read`.
   - Copy and save the token (e.g., `hf_...`) securely.
2. Firebase:
   - Go to [firebase.google.com](https://firebase.google.com) > Add project > Name: `flair-chatbot`.
   - In “Build” > “Authentication”, enable Email/Password and Google providers.
   - In “Project settings” > Add Web app > Name: `flair-chatbot` > Copy `firebaseConfig`.
3. Google Cloud:
   - In [console.cloud.google.com](https://console.cloud.google.com), select `flair-chatbot-backend`.
   - Enable **Cloud Functions API** and **Cloud Build API** in “APIs & Services” > “Library”.
4. Cloudflare:
   - Sign up at [cloudflare.com](https://cloudflare.com).
   - Go to “Workers & Pages” > Create Worker > Name: `flair-api-proxy`.
5. Netlify:
   - Sign up at [netlify.com](https://netlify.com) with GitHub or email.
6. GitHub:
   - Create a repository named `flair-chatbot`.

### 3. Clone or Set Up Repository
1. Navigate to your project folder:
   
2. If the folder is empty, initialize a Git repository:
   ```cmd
   git init
   git remote add origin https://github.com/your-username/flair-chatbot.git
   git branch -M main
   ```
3. If cloning an existing repo:
   ```cmd
   git clone https://github.com/your-username/flair-chatbot.git
   cd flair-chatbot
   ```

### 4. Add Project Files
- Ensure all files from the provided list are in the correct folders (see [Project Structure](#project-structure)).
- Update:
  - src/App.js: Replace `YOUR_CLOUD_FUNCTION_URL/chat` and `YOUR_CLOUD_WORKER_URL` with your URLs (obtained in Step 5).
  - src/firebase.js: Paste your Firebase `firebaseConfig`.

### 5. Deploy Backend and Cloudflare Worker
1. Google Cloud Functions:
   - Navigate to backend:
     ```cmd
     cd C:\Users\IGNATIUS EMMANUEL\onedrive\documents\github\flair\flair-chatbot\backend
     ```
   - Deploy:
     ```cmd
     gcloud functions deploy flair-chatbot ^
       --gen2 ^
       --runtime python39 ^
       --region us-central1 ^
       --source . ^
       --entry-point flair_chatbot ^
       --trigger-http ^
       --allow-unauthenticated ^
       --set-env-vars HUGGINGFACE_TOKEN=your-hf-token
     ```
     - Replace `your-hf-token` with your Hugging Face token.
     - Copy the URL (e.g., `https://us-central1-flair-chatbot-backend.cloudfunctions.net/flair-chatbot`).
2. Cloudflare Worker:
   - In Cloudflare Dashboard, edit `flair-api-proxy`, paste `worker.js`.
   - Go to Settings > Variables > Add `HUGGINGFACE_TOKEN` with your token > Encrypt.
   - Deploy and copy the URL (e.g., `https://flair-api-proxy.your-username.workers.dev`).

### 6. Install Frontend Dependencies
1. Navigate to project root:
   ```cmd
   cd C:\Users\IGNATIUS EMMANUEL\onedrive\documents\github\flair\flair-chatbot
   ```
2. Install:
   ```cmd
   npm install
   ```

### 7. Run Locally
1. Start the app:
   ```cmd
   npm start
   ```
2. Open `http://localhost:3000` in Chrome.
3. Test:
   - Landing Page: Verify grok.com-inspired design (dark theme, animated CTA).
   - Authentication: Sign up or sign in with email/password or Google.
   - Chat:
     - Type “I’m feeling sad” → Expect supportive response and sentiment (e.g., “NEGATIVE”).
     - Add context (e.g., “I’m stressed about work”) and ask “What should I do?” → Expect Q&A response.
   - Check Chrome Console (F12 > Console) for errors.

### 8. Push to GitHub
1. Commit and push:
   ```cmd
   git add .
   git commit -m "Flair Chatbot MVP with Hugging Face APIs"
   git push -u origin main
   ```
2. Verify files on GitHub: `https://github.com/your-username/flair-chatbot`.

### 9. Deploy to Netlify
1. Log in to [netlify.com](https://netlify.com).
2. Click “New site from Git” > Connect GitHub > Select `flair-chatbot`.
3. Configure:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Deploy and copy the live URL (e.g., `https://your-site-name.netlify.app`).
5. Test the live site with the same steps as local testing.

## Project Structure
```
flair-chatbot/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   ├── PULL_REQUEST_TEMPLATE.md
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
├── README.md
├── netlify.toml
├── package.json
├── tailwind.config.js
├── worker.js
```

## For the Demo (June 9, 2025)
- Showcase:
  - Use the Netlify URL or `http://localhost:3000`.
  - Navigate through:
    - Landing page (highlight grok.com-inspired design).
    - Sign-up/sign-in with email or Google.
    - Chat interface with messages like:
      - “I’m feeling sad” (shows sentiment analysis).
      - Context: “I’m stressed about work”, Question: “What should I do?” (shows Q&A).
  - Highlight:
    - World-class UI with animations and accessibility.
    - Hugging Face APIs for text generation, sentiment, and Q&A.
    - Firebase authentication.
    - Cloudflare Workers for low-latency responses.
    - Responsive design for mobile users.
- **Talking Points**:
  - “Flair Chatbot is a mental health companion built with free Hugging Face APIs, offering supportive chats, sentiment analysis, and Q&A.”
  - “The UI is inspired by grok.com, with a modern, animated, and accessible design.”
  - “It uses Firebase for secure authentication, Google Cloud for the backend, and Cloudflare for edge computing, all hosted on Netlify.”
  - “Future plans include mood tracking, a mobile app, and additional AI integrations.”
- **Fallback**:
  - If the live demo fails, show the GitHub repository: `https://github.com/your-username/flair-chatbot`.
  - Use screenshots of the landing page, auth, and chat (take from `http://localhost:3000`).
  - Explain the setup and features verbally.

## Troubleshooting
- Hugging Face API Errors:
  - Test token:
    ```cmd
    curl -X POST -H "Authorization: Bearer YOUR_TOKEN" -H "Content-Type: application/json" -d "{\"inputs\": \"Hello!\"}" https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1
    ```
  - Check `HUGGINGFACE_TOKEN` in Cloud Function and Worker.
- **Firebase Auth Issues**:
  - Verify `firebaseConfig` in `src/firebase.js`.
  - Ensure Email/Password and Google providers are enabled.
- **Google Cloud Functions**:
  - Check logs:
    ```cmd
    gcloud functions logs read flair-chatbot --region us-central1
    ```
  - Confirm APIs are enabled and token is set.
- Cloudflare Worker:
  - Check logs in Cloudflare Dashboard.
  - Verify `HUGGINGFACE_TOKEN` variable.
- Netlify Deployment:
  - Ensure `netlify.toml` is correct.
  - Check build logs in Netlify Dashboard.
- CORS Errors:
  - Verify `netlify.toml` headers and backend CORS settings.
- Share errors from Chrome Console (F12) or Command Prompt for quick fixes.

## Contributing
Interested in contributing? See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on reporting bugs, suggesting features, or submitting pull requests.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Contact
For questions or support, contact:
- Author: Ignatius Emmanuel
- Email: inyangignatius@hotmail.com 
- GitHub: [ignatius-kara](https://github.com/ignatius-kara)
