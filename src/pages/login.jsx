import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.css"; 
import registerimg from "./register.png";
import { useUser } from './UserContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { setCurrentUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const user = {
          email: formData.email,
          displayName: data.username || "User",
        };
  
        setCurrentUser(user);
        alert("Login successful", user);
        navigate("/projects");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  
  return (
    <div className="box">
    <div className="login-container">
      <div className="login-left">
        <form onSubmit={handleLogin} className="login-form">
          <div className="close-button">
            <Link to="/">X</Link>
          </div>
          <h2 className="login-title">Login</h2>

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>

          <p className="register-text">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>

      <div className="login-right">
        <img src={registerimg} alt="Login visual" />
      </div>
      </div>
    </div>
  );

}

export default Login;
