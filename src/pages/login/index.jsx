import React, { useState } from "react";

import { Button, Select, TextField, MenuItem, AppBar, InputAdornment, IconButton } from "@mui/material";
import { borderRadius } from "@mui/system";
import { withStyles } from "@mui/styles";

import { textFieldStyle } from "../../style";

import { Outlet, useNavigate, Navigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

import axios from "axios";
import { router } from "../../constants";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [person, setPerson] = useState("");
  const [role, setRole] = useState("none");
  const matches = useMediaQuery("(max-width:800px)");

  const [isLoading, setIsLoading] = useState(false)
  const [isErr , setIsErr] = useState(false)
 

  const token = localStorage.getItem("token");

  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    //  console.log(userId + password)
    setIsErr(false)
    setIsLoading(true)
    await axios
      .post(
        "http://127.0.0.1:8000/api/login",
        {
          userId: userId,
          password: password,
        },
        {
          timeout: 5000,
        }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", `${res.data?.data[0]?.firstName} ${res.data?.data[0]?.lastName}`)
        
        navigate(router.DASHBOARD)
        console.log(res.data);
      }).catch((err) => {
        setIsLoading(false)
        setIsErr(true)
        // alert("There is an error")
        console.error(err)});
  };
  if (token) {
    return <Navigate to={router.DASHBOARD} />;
  }

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
        width: matches ? "200px" : "300px",
      }}
      className="form"
    >
      <TextField
        onChange={(e) => {
          setUserId(e.target.value);
        }}
        placeholder="user id"
        size="small"
        sx={{ ...textFieldStyle }}
      />
      <TextField
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="password"
        size="small"
        sx={{ ...textFieldStyle }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={()=>{}}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />

      {
        isLoading ? <span>Loging in...</span> : isErr ? <span>There is an err</span> : null
      }
      <Button onClick={handleLogin} variant="contained">
        Login
      </Button>
    </div>
  );
}

export const Card = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
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
          <Outlet />
        </div>
      </div>
    </div>
  );
};
