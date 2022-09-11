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

// layout
import DashboardLauOut from "./layouts/dashborad.layout";
import MyDashboradLayOut from "./layouts/MyDashboradLayOut";
// pages
import Users from "./pages/users";
import Dashboard from "./pages/dashboard";
import UserType from "./pages/userType";
import NewsCategory from "./pages/newsCategory";
import News from "./pages/news";

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
    {
      path: router.USERTYPE,
      element: <UserType/>
    },
    {
      path: router.NEWSCATEGORY,
      element: <NewsCategory/>
    },
    {
      path: router.NEWS,
      element: <News/>
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
                <ProtectedRoute>
                  {val.element}
                </ProtectedRoute>
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
