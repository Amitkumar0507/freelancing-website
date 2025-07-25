import React, { useState } from "react";
import "./pages.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import registerimg from "./register.png";
import { useUser } from './UserContext'; 
import { getIdToken } from "firebase/auth";
import axios from "axios"; 
function Log() {
  const navigate = useNavigate();
  const { setCurrentUser } = useUser(); // ✅ Access context
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  
    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // important to allow cookies (JWT) to be stored
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Registration successful", data);
  
        setCurrentUser({
          displayName: formData.username,
          email: formData.email,
        });
  
        navigate("/projects");
      } else {
        alert(data.message || "Registration failed");
      }
  
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const idToken = await getIdToken(user);

    // 3. Send token to backend for session creation
    await axios.post("http://localhost:3000/user/jwtSession", {
      idToken,
    }, {
      withCredentials: true, // Important to allow cookies to be set
    });

      setCurrentUser({
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
      });

      alert(`Welcome ${user.displayName}`);
      navigate("/projects"); // redirect
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      alert("Google Sign-in failed!");
    }
  };

  return (
    <div className="auth-container">
      <Link className="home-link" to="/">X</Link>
      <div className="auth-left">
        <img src={registerimg} alt="Custom Card" className="auth-image" />
      </div>

      <div className="auth-right">
        <div className="auth-logo">SkillConnect</div>
        <h1 className="auth-welcome">Hi! Welcome to <br /> <span>SkillConnect....👋</span></h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-name-inputs">
            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
          </div>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          <button type="submit">Sign up</button>
        </form>

        <p className="signin-text">Already have an account? <Link to="/login">Sign In</Link></p>
        <div className="auth-divider">Or sign up with</div>

        <div className="auth-social-buttons">
          <button className="google-btn" onClick={handleGoogleSignup}>Sign up with Google</button>
        </div>
      </div>
    </div>
  );
}

export default Log;
