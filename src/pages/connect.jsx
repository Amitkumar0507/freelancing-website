import React, { useState, useEffect } from 'react';
import ChatWindow from './chatWindo';
import ContactList from './ContactList';
import { useSelectedUser } from './SelectedUserContext';  // Import the context hook
import { useUser } from './UserContext';
import './Connect.css';

function Connect() {
  const { currentUser } = useUser();
  const { selectedUser } = useSelectedUser();  // Access the selected user from context
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatPartners = async () => {
      if (!currentUser?.email) return;

      try {
        const response = await fetch(`http://localhost:3000/user/getpartners/${encodeURIComponent(currentUser.email)}`);
        const data = await response.json();

        if (response.ok) {
          setContacts(data.chatPartners || []);
        } else {
          console.error("Error fetching partners:", data.error);
        }
      } catch (error) {
        console.error("Error fetching chat partners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatPartners();
  }, [currentUser]);

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>Chats</h2>
        {loading ? (
          <p>Loading contacts...</p>
        ) : (
          <ContactList contacts={contacts} />
        )}
      </div>

      <div className="chat-area">
        {selectedUser ? (
          <ChatWindow sender={currentUser.email} receiver={selectedUser} />
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
}

export default Connect;
