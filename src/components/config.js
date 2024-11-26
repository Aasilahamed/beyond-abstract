import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "CryptoBot",
  initialMessages: [
    createChatBotMessage("Welcome! How can I help with crypto transfers today?")
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5CCC9D",
    },
  },
};

export default config;
