import { useEffect, useRef, useState } from "react";
import TopBar from "./TopBar";
import axios from "axios";
import "../styles/Chat.css";

export const Chat = () => {
  const Token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [user, setUser] = useState("");

  const messagesEndRef = useRef(null);
  const ws = useRef(null);

  const getUserData = () => {
    axios({
      url: `https://project-rest-api-production.up.railway.app/getUserData`,
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        const name = res.data.firstname;
        const lastname = res.data.lastname;
        setUser(name + ' ' + lastname);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {

    getUserData()

    ws.current = new WebSocket(
      "ws://project-rest-api-production.up.railway.app/api/chat"
    );

    ws.current.onopen = () => {
      console.log("Connected to WebSocket.");
    };

    ws.current.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log("Received message:", receivedMessage);

      // Update chat messages state
      setChatMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      // Clean up WebSocket connection on component unmount
      ws.current.close();
    };
  }, []);

  const sendMessage = () => {
    const newMessage = {
      user: user,
      text: message.trim(),
      timestamp: new Date().toLocaleString(),
    };

    ws.current.send(JSON.stringify(newMessage));

    // Clear the input field
    setMessage("");
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

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
            placeholder="Type your message..."
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
};
