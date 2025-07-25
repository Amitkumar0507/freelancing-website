import React from 'react';
import './ContactList.css';
import { useSelectedUser } from './SelectedUserContext';

function ContactList({ contacts }) {
  const { setSelectedUser } = useSelectedUser();  // Access the setSelectedUser function from context

  const handleSelect = (user) => {
    setSelectedUser(user);  // Store the selected user in context
  };

  return (
    <div className="contact-list">
      <h3 className="chat-header">Contacts</h3>
      {contacts.map((user, index) => (
        <div key={index} className="contact" onClick={() => handleSelect(user)}>
          {user}  {/* Displaying the name of the user */}
        </div>
      ))}
    </div>
  );
}

export default ContactList;
