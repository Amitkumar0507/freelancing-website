import React, { createContext, useState, useContext } from 'react';

// Create Context
const SelectedUserContext = createContext();

// Create a custom hook to use the context
export const useSelectedUser = () => {
  return useContext(SelectedUserContext);
};

// Create a provider component
export const SelectedUserProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <SelectedUserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </SelectedUserContext.Provider>
  );
};
