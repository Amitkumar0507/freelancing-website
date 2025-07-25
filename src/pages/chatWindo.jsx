import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageInput from './MessageInput';
import './ChatWindow.css';

function ChatWindow({ sender, receiver }) {
  const [messages, setMessages] = useState([]);  // Default to an empty array

  useEffect(() => {
    // Fetch messages when sender and receiver change
    axios.get(`http://localhost:3000/user/chatload/${sender}/${receiver}`)
      .then(res => {
        console.log("Response data:", res.data); // Log the entire response for debugging
        
        // Check if the response contains a 'messages' array
        if (res.data && Array.isArray(res.data.messages)) {
          setMessages(res.data.messages);  // Set the messages state if it's an array
        } else {
          console.error("Expected 'messages' array, but got:", res.data);
          setMessages([]); // Set an empty array in case of an invalid response
        }
      })
      .catch(err => {
        console.log("Error fetching messages:", err);
      });
  }, [sender, receiver]);

  const handleSend = (text) => {
    // Send message using the new URL format
      console.log("Receiver:", receiver); // Add this line to check if receiver is passed correctly
    axios.post("http://localhost:3000/user/sendmessage", {
  userId1: sender,
  userId2: receiver,
  text: text
    }).then(res => {
      // Log the response for debugging
      console.log("Message sent response:", res.data);
      
      // Ensure the new message is added correctly
      if (res.data && res.data.text) {
        setMessages([...messages, res.data]); // Add new message to state
      }
    }).catch(err => console.log("Error sending message:", err));
  };

  return (
    <div className="chat-window">
      <h3>Chat with {receiver}</h3>
      <div className="messages-box">
        {messages && messages.length > 0 ? (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`message ${msg.senderId === sender ? 'sent' : 'received'}`}
            >
              {msg.text}
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
}

export default ChatWindow;
