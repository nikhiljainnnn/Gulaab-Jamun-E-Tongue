import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken(); // 🔑 Firebase token
      onLogin(token); // pass token to parent
    } catch (err) {
      console.error(err);
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="p-4">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mt-2"
      />
      <br />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 mt-2">
        Login
      </button>
    </div>
  );
}
