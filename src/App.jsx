import { useEffect, useState, useContext, createContext } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import Login from "./pages/login";
import Register from "./pages/register";

import { router } from "./constants";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginsLayout from "./layouts/LoginLayout";
import Dogs from "./pages/dogs";
import ProtectedRoute from "./routes/protectedRoute";

import Dashboard from "./pages/dashboard";
import DashboardLauOut from "./layouts/dashborad.layout";
import MyDashboradLayOut from "./layouts/MyDashboradLayOut";
import Users from "./pages/users";

const App = () => {
  const privateRoute = [
    {
      path: router.DASHBOARD,
      element: <Dashboard/>
    },
    {
      path: router.USERS,
      element: <Users/>
    },
    
  
  ]
   

  
  return (
    <BrowserRouter>
      <Routes>
        {/**login layout */}
        <Route element={<LoginsLayout />}>
          <Route path={`${router.REGISTER}`} element={<Register />} />
          <Route path={`/dogs/:id`} element={<Dogs />} />
          <Route path={`/dogs`} element={<Dogs />} />
          <Route path="/" element={<Login />} />
        </Route>
        {/** */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route element={<MyDashboradLayOut />}>
          {
            privateRoute.map((val, index)=>{
              return <Route key={index} path={val.path} element={
                <privateRoute>
                  {val.element}
                </privateRoute>
              }/>
            })
          }
          
          
        </Route>

        {/*        
        <Route element={<DashboardLauOut />}>
          <Route
            exact
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
