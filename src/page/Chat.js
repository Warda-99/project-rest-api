import { useEffect, useRef, useState } from "react";
import TopBar from "./TopBar";
import "../styles/Chat.css";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        user: "Agent007",
        text: message.trim(),
        timestamp: new Date().toLocaleString()
      };
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <>
      <TopBar />
      <div className="chat-page">
        <h2>Chat, not GPT4</h2>
        <div className="chat-container">
          {chatMessages.map((msg, index) => (
            <div key={index} className="chat-message">
              <strong>{msg.user}: </strong>
              {msg.text}
              <span className="timestamp">{msg.timestamp}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type here..."
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSendMessage}>
            <span>Send</span>
          </button>
        </div>
      </div>
    </>
  );
};
