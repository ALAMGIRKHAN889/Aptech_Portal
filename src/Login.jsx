import { useState } from "react";
import Logo from "./Logo";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) return setError("Please enter your name (at least 2 characters).");
    onLogin(name);
  };

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={submit}>
        <Logo size={56} />
        <h1>AK × Aptech Portal</h1>
        <p>Enter your name to continue.</p>
        <input
          autoFocus
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => { setName(e.target.value); setError(""); }}
        />
        {error && <span className="login-error">{error}</span>}
        <button type="submit">Continue →</button>
        <small>Made by AK</small>
      </form>
    </div>
  );
}
