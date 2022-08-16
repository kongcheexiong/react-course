import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { PersonProvider } from "./contexts/Person.provider";
import {EmployeeProvider} from "./contexts/employee.provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EmployeeProvider>
    <PersonProvider>
      <App />
    </PersonProvider>

    </EmployeeProvider>
  
  </React.StrictMode>
);
