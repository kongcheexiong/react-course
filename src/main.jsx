import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { PersonProvider } from "./contexts/Person.provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PersonProvider>
      <App />
    </PersonProvider>
  </React.StrictMode>
);
