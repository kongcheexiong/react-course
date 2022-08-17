import React, { useEffect } from "react";

import { Outlet } from "react-router-dom";
import { AppBar, Box, Typography } from "@mui/material";

export default function LoginsLayout() {

    const height = window.screen.height

    useEffect(()=>{
        console.log(height)
    })
  return (
    <>
   
      {/**app bar */}
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" sx={{padding: '10px', backgroundColor: '#F3F4F8' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:'black'}}>
            News
          </Typography>
        </AppBar>
      </Box>


      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          height: height/1.5,
          alignItems: 'center'
          
        }}
      >
        {/**logo and title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="img.jpg"
            alt="img.jpg"
            style={{
              height: "150px",
              width: "170px",
            }}
          />
          <h3 className="en">Information Announcement System of FNS</h3>
        </div>
        {/**login and register */}
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
