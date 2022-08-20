import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { PersonProvider } from "./contexts/Person.provider";
import { EmployeeProvider } from "./contexts/employee.provider";

import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <EmployeeProvider>
      <PersonProvider>
        <App />
      </PersonProvider>
    </EmployeeProvider>

    </QueryClientProvider>
   
  </React.StrictMode>
);
