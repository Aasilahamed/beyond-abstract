import React, { useState } from "react";
import { ethers } from "ethers";

function CryptoChatBot({ walletAddress, userSigner }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleChatbotCommand = async (command) => {
    const [action, amount, recipient] = command.split(" ");

    if (action === "/send") {
      if (!recipient || !amount) {
        addMessage("bot", "Provide recipient address and amount (e.g., /send 0.5 0xRecipient).");
        return;
      }
      try {
        const amountInWei = ethers.utils.parseEther(amount);
        const tx = { to: recipient, value: amountInWei };
        const transactionResponse = await userSigner.sendTransaction(tx);
        addMessage("bot", `Transaction sent! Hash: ${transactionResponse.hash}`);
      } catch (error) {
        addMessage("bot", `Error: ${error.message}`);
      }
    } else if (command.toLowerCase().includes("balance")) {
      try {
        const balance = await userSigner.getBalance();
        const formattedBalance = ethers.utils.formatEther(balance);
        addMessage("bot", `Your wallet balance: ${formattedBalance} ETH`);
      } catch (error) {
        addMessage("bot", `Error fetching balance: ${error.message}`);
      }
    } else if (command.toLowerCase().includes("address")) {
      addMessage("bot", `Your wallet address: ${walletAddress}`);
    } else {
      addMessage("bot", "I didn't understand that command.");
    }
  };

  const addMessage = (sender, text) => {
    setMessages((prevMessages) => [...prevMessages, { sender, text }]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addMessage("user", input);
    handleChatbotCommand(input);
    setInput("");
  };

  return (
    <div className="chatbot-section">
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
      <form onSubmit={handleSendMessage} className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command or question..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default CryptoChatBot;
