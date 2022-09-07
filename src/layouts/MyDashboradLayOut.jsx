import { display } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import { router } from "../constants";
import "./nav.css";

import { Avatar, Divider, Stack } from "@mui/material";

export default function MyDashboradLayOut() {
  return (
    <div>
      {/**side nav */}

      <nav>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            padding: "20px",
          }}
        >
          <img
            src="app-icon.png"
            alt="img"
            style={{
              height: "50px",
            }}
          />
          <h1>asfsadf</h1>
        </Stack>
        <Divider />

       <Stack justifyContent="space-between" sx={{
        height: '80%'
       }}>
             {/**menu */}
             <ul>
          <li>
            {" "}
            <a href={router.DASHBOARD}>dashborad</a>
          </li>
          <li>
            {" "}
            <a href={router.USERS}>user</a>
          </li>
         
          
        </ul>
        {/**logout */}
        <ul>
            <li><a onClick={()=> localStorage.clear()} href={`/`}>Logout</a></li>
        </ul>

       </Stack>
      </nav>

      {/**body */}
      <div className="mybody">
        {/**header */}
        <header style={{
            height: '60px',
            paddingRight: '10px',
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            columnGap: '10px'
            
        }}>
              {localStorage.getItem("name")}
            <Avatar/>
         
         
        </header>
        {/**body */}
        <div style={{
            padding: '20px'
        }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
