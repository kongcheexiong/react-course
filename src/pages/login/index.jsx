import React, { useState } from "react";

import { Button, Select, TextField, MenuItem, AppBar } from "@mui/material";
import { borderRadius } from "@mui/system";
import { withStyles } from "@mui/styles";

import { textFieldStyle } from "../../style";

import { Outlet, useNavigate, Navigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

import axios from "axios";
import { router } from "../../constants";

export default function Login() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [person, setPerson] = useState("");
  const [role, setRole] = useState("none");
  const matches = useMediaQuery("(max-width:800px)");

  const token = localStorage.getItem("token");

  const handleLogin = async () => {
    //console.log(userId + password)
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
        console.log(res.data);
      });
    // console.log(localStorage.getItem("token"))
    navigate(router.DASHBOARD).catch((err) => console.error(err));
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
