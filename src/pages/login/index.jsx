import React, { useState } from "react";

import { Button, Select, TextField, MenuItem , AppBar } from "@mui/material";
import { borderRadius } from "@mui/system";
import { withStyles } from "@mui/styles";

import { textFieldStyle } from "../../style";

import {Outlet} from 'react-router-dom'

export default function Login() {
  const [role, setRole] = useState("none");
  const WithStyleTextField = withStyles({
    root: {
      width: "300px",
      backgroundColor: "white",
    },
  })(TextField);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "15px",
        backgroundColor: "#F3F4F8",
        padding: "60px 50px",
        borderRadius: "15px",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <TextField
        placeholder="username"
        size="small"
        sx={{ ...textFieldStyle }}
      />
      <TextField
        placeholder="password"
        size="small"
        sx={{ ...textFieldStyle }}
      />
      <Select
        value={role}
        onChange={(e) => {
          setRole(e.target.value);
          console.log("sdfasd");
        }}
        size="small"
      >
        <MenuItem value="none">None</MenuItem>
        <MenuItem value="Teacher">Teacher</MenuItem>
        <MenuItem value="Student">Student</MenuItem>
      </Select>
      <a
        style={{
          alignSelf: "end",
        }}
        href="/register"
      >
        Don't have account?
      </a>
      <Button variant="contained">Login</Button>
    </div>
  );
}

export const Card = () => {
  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <img src="img.png" alt="" />
        <h1>sdfsd</h1>
      </div>
      <div>
        <div>
            <AppBar>
                <h1>safasdf</h1>
            </AppBar>
            
        </div>
        <div>
            <Outlet/>
        </div>
      </div>
    </div>
  );
};
