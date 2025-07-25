import React, { useState } from "react";
import "./verifyAdmin.css";
import Admin from "./admin";

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login status

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login success:", data);
        setIsAuthenticated(true); // ✅ trigger Admin view
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Admin /> // ✅ Show Admin component after login
      ) : (
        <div className="adminLogin">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            required 
            value={formData.email} 
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            required 
            value={formData.password} 
            onChange={handleChange}
          />
          <button onClick={handleLogin}>Submit</button>
        </div>
      )}
    </>
  );
}

export default AdminLogin;
