import React, { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import { AppBar, Box, Typography, useMediaQuery } from "@mui/material";

import axios from "axios";


export default function LoginsLayout() {
  const matches = useMediaQuery("(max-width:800px)");
  const height = window.screen.height;

  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [isErr, setErr] = useState(false)

  

  useEffect(() => {
  
    console.log(height);
  });
  return (
    <>
      {/**app bar */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="sticky"
          sx={{ padding: "10px", backgroundColor: "#F3F4F8" }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            News 
          </Typography>
        </AppBar>
      </Box>

      <div className="container">
        {/**logo and title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="http://127.0.0.1:8000/api/image/1662020083957.jpeg"
            alt="img.jpg"
            style={{
              height: "150px",
              width: "170px",
            }}
          />
          <h3 className="en">Information Announcement System of FNS</h3>
        </div>
        {/**login and register */}
        <div className="form">
          <Outlet />
        </div>
      </div>
    </>
  );
}
