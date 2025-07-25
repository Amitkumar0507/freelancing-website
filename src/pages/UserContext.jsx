  import { createContext, useContext, useState, useEffect } from "react";

  export const UserContext = createContext(null);

  export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
      if (storedUser) setCurrentUser(storedUser);
    }, []);

    useEffect(() => {
      if (currentUser) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("currentUser");
      }
    }, [currentUser]);

    return (
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
      </UserContext.Provider>
    );
  };

  export const useUser = () => {
    const context = useContext(UserContext);
    if (context === null) {
      console.warn("useUser must be used within a UserProvider");
      return { currentUser: null, setCurrentUser: () => {} };
    }
    return context;
  };
