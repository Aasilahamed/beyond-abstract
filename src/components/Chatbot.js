import React from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

const config = {
  botName: "CryptoBot",
  initialMessages: [
    { type: "text", id: 1, message: "Welcome! How can I help with crypto transfers today?" },
  ],
};

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes("transfer")) {
      actions.handleTransfer();
    }
  };
  return <div>{children(parse)}</div>;
};

export default function CryptoChatbot() {
  return <Chatbot config={config} />;
}
