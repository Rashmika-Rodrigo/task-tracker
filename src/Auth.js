import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Auth = ({ onUserChange }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const auth = getAuth();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } 
      else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      onUserChange(userCredential.user);
    } 
    catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">

      <h1 className="main-heading">-Task Tracker-</h1>
      
      <h2 className="auth-title">{isRegistering ? "Sign Up" : "Login"}</h2>
  
      <form onSubmit={handleSubmit} className="auth-form">

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="auth-input"/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="auth-input"/>
        
        <button type="submit" className="auth-button">{isRegistering ? "Register" : "Login"}</button>

      </form>
  
      <button onClick={() => setIsRegistering(!isRegistering)} className="switch-button">
        {isRegistering ? "Already have an account? Login" : "New here? Register"}
      </button>

    </div>
  );
};

export default Auth;