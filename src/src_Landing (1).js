import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="landing"
    >
      <header className="header">
        <h1>Flair Chatbot</h1>
        <p>Your AI-powered mental health companion</p>
      </header>
      <main className="hero">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Connect, Chat, Feel Better
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/auth')}
          className="cta-button"
          aria-label="Get started with Flair"
        >
          Get Started
        </motion.button>
      </main>
    </motion.div>
  );
}

export default Landing;