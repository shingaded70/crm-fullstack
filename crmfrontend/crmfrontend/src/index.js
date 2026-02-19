
import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div style={{padding:20}}>
      <h1>CRM Frontend Running</h1>
      <p>Connect this with Spring Boot APIs</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
