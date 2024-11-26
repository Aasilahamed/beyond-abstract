import React, { useState, useEffect } from "react";
import { connectWallet, getBalance } from "./components/Web3Utils";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load saved theme preference from local storage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.body.classList.add(savedMode ? "dark" : "light");
  }, []);

  // Update body class whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode); // Save preference
  };

  const handleConnectWallet = async () => {
    try {
      const { provider, address } = await connectWallet();
      setWalletAddress(address);
      const walletBalance = await getBalance(address, provider);
      setBalance(walletBalance);

      setMessages([
        ...messages,
        { sender: "bot", text: "Wallet connected! How can I assist you?" },
      ]);
    } catch (error) {
      console.error("Error connecting wallet:", error.message);
      alert(error.message);
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);

    if (input.toLowerCase().includes("address")) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: `Your Wallet Address: ${walletAddress}` },
      ]);
    } else if (input.toLowerCase().includes("balance")) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: `Your Balance: ${balance} ETH` },
      ]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "Sorry, I didn't understand that. Can you try again?",
        },
      ]);
    }

    setInput(""); // Clear input field after sending the message
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h1>Crypto Assist</h1>
        <button onClick={toggleDarkMode}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
        <button onClick={handleConnectWallet}>Connect Wallet</button>
        <div className="wallet-info">
          {walletAddress ? (
            <>
              <p><strong>Wallet Address:</strong> {walletAddress}</p>
              <p><strong>Balance:</strong> {balance} ETH</p>
            </>
          ) : (
            <p>wallet aha connect pannu da.</p>
          )}
        </div>
      </div>
      <div className="chat-section">
        <div className="chat-window">
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.sender === "bot" ? "bot-message" : "user-message"}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about your wallet..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
