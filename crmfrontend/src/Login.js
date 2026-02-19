import React, { useState } from "react";
import axios from "axios";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios.post("http://localhost:8080/api/auth/login", {
      email,
      password,
    }).then(res => {
      setToken(res.data);
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>CRM Login</h2>

        <input
          style={styles.input}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },
  card: {
    background: "#1e293b",
    padding: 30,
    borderRadius: 10,
    width: 300,
    color: "white",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    margin: "10px 0",
    borderRadius: 5,
    border: "none",
  },
  button: {
    width: "100%",
    padding: 10,
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};

export default Login;
