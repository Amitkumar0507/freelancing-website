import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // ✅ Make sure your global styles are still here
import { UserProvider } from "./pages/UserContext"; // ✅ adjust path as needed
import { SelectedUserProvider } from './pages/SelectedUserContext';  // Import the new context provider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <SelectedUserProvider> {/* Wrap App with both providers */}
        <App />
      </SelectedUserProvider>
    </UserProvider>
  </React.StrictMode>
);
