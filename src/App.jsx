import { useEffect, useState, useContext, createContext } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import Login from "./pages/login";
import Register from "./pages/register";

import { router } from "./constants";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginsLayout from "./layouts/LoginLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/**login layout */}
        <Route element={<LoginsLayout />}>
          <Route path="/" element={<Login />} />
          <Route path={`${router.REGISTER}`} element={<Register />} />

        </Route>
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
