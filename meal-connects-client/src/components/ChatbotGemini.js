import React, { useState } from 'react';
import './ChatbotGemini.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // New state for minimizing

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInput = input.trim();
    if (!userInput) return;
  
    setChatHistory((prev) => [...prev, { user: userInput }]);
    setInput('');
    setLoading(true);
  
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(userInput);
      const botResponse = result.response.text();
  
      setChatHistory((prev) => [...prev, { user: userInput, bot: botResponse }]);
    } catch (error) {
      console.error('Error fetching data from Gemini API:', error);
      alert('An error occurred while fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`chatbot ${isMinimized ? 'chatbot-minimized' : ''}`}> {/* Add conditional class */}
      <div className="chatbot-header">
        <h3>Food Facts Chatbot</h3>
        <button 
          className="chatbot-minimize-btn" 
          onClick={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? '▲' : '▼'} {/* Toggle icon */}
        </button>
      </div>
      {!isMinimized && (  // Render chatbot content only when not minimized
        <>
          <div className="chatbot-messages">
            {chatHistory.map((chat, index) => (
              <div key={index}>
                <strong>You:</strong> {chat.user}
                <br />
                {chat.bot && (
                  <>
                    <strong>Bot:</strong> {chat.bot}
                    <br />
                  </>
                )}
              </div>
            ))}
            {loading && <p>Loading...</p>}
          </div>
          <form onSubmit={handleSubmit} className="chatbot-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              required
            />
            <button type="submit">Send</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Chatbot;
