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

  const fetchData = async () => {
    setIsLoading(true)
    await axios
      .get("http://localhost:5000/user",{
        timeout: 1000
      })
      .then((res) => {
        console.log(res);
        setData(res.data.message)
        setIsLoading(false)
        setErr(false)
      })
      .catch((err) => {
        setIsLoading(false)
        setErr(true)
        console.log(err)});
  };

  useEffect(() => {
    fetchData();
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
            News {
              isLoading? <span>Loading...</span> : isErr? <>there is an err</>: <>{data}</>
            }
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
            src="../../img.jpg"
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
