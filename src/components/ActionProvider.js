
class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    handleTransfer = () => {
      const message = this.createChatBotMessage(
        "To transfer crypto, please provide the wallet address and amount."
      );
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    };
  
    handleHelp = () => {
      const message = this.createChatBotMessage(
        "I'm here to help! You can ask about crypto transfers or wallet information."
      );
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    };
  
    handleUnknown = () => {
      const message = this.createChatBotMessage(
        "I'm sorry, I didn't understand that. Can you rephrase?"
      );
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    };
  }
  
  export default ActionProvider;
  