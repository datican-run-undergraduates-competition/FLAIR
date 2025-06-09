import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDYZY4yykrtgS6BG7UFqaiX9kttuvMPC0s",
  authDomain: "flair-chatbot-33162.firebaseapp.com",
  projectId: "flair-chatbot-33162",
  storageBucket: "flair-chatbot-33162.firebasestorage.app",
  messagingSenderId: "689696466848",
  appId: "1:689696466848:web:fefc5a9c23c3224a4926c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

