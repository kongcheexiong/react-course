import { display } from "@mui/system";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { font, router } from "../constants";
import "./sideNav.css";

//icon
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import { Avatar, Divider, Stack,IconButton, Badge } from "@mui/material";

export default function MyDashboradLayOut() {
 
  const navigate = useNavigate();
   const sideNavData = [
    {
      name: "ໜ້າຫຼັກ",
      icon: <DashboardIcon fontSize="small" />,
      router: `${router.DASHBOARD}`,
    },
    {
      name: "ຈັດການຂໍ້ມູນຜູ້ໃຊ້",
      icon: <PersonIcon fontSize="small" />,
      router: `${router.USERS}`,
    },

  ]
  return (
    <div>
      {/** this is side nav */}
      <div>
        <nav>
          <ul>
            {/** side nav header and logo name*/}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "5px",
                alignItems: "center",
                maxHeight: "40px",
              }}
            >
              {/**
               * <img src="../IMG.JPG" alt="img" height={50} />
               */}

              <h1
                style={{
                  color: "rgba(27, 21, 76, 1)",
                  fontFamily: `${font.EN}`,
                }}
              >
                Logo
              </h1>
            </div>
            <Divider/>
            {/**side nav menu */}

            <div
              style={{
                marginTop: '20px',
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "85%",
              }}
            >
              {/* user menu */}
               <div>
                {sideNavData?.map((data, index) => {
                  return (
                    <a
                      key={index}
                      onClick={() => {
                        if (!data.router == "") {
                          navigate(data?.router);
                        }
                      }}
                      style={{
                        backgroundColor:
                          location.pathname.split("/")[1] ===
                          data?.router.split("/")[1]
                            ? "#F8F9FA"
                            : `rgba(255, 255, 255, 1)`,
                      }}
                    >
                      <Stack direction="column">
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={2}
                          justifyContent="space-between"
                          sx={{
                            paddingRight: "30px",
                          }}
                        >
                          <Stack direction="row" spacing={1}>
                            <div>{data?.icon}</div>
                            <div>{data?.name}</div>
                          </Stack>
                          
                        </Stack>
                      </Stack>
                    </a>
                  );
                })}
              </div>
              
              {/* <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                }}
                component="nav"
              >
                {materialNavData?.map((val, idx) => {
                  if (val.access.includes(userRole)) {
                    return (
                      <>
                        <ListItemButton
                          key={idx}
                          sx={{
                            backgroundColor:
                              location.pathname.split("/")[1] ===
                              val?.router?.split("/")[1]
                                ? "#F8F9FA"
                                : `rgba(255, 255, 255, 1)`,
                          }}
                          onClick={() => {
                            if (val.name == "ຈັດການຂໍ້ມູນພຶ້ນຖານ") {
                              setOpen(!open);
                              setOpenService(false);
                            }
                            if (val.name == "ບໍລິການ") {
                              setOpenService(!openService);
                              setOpen(false);
                            }
                            if (val.router) {
                              navigate(val?.router);
                              setOpen(false);
                              setOpenService(false);
                            }
                          }}
                          // key={idx}
                        >
                          <ListItemIcon>{val.icon}</ListItemIcon>
                          <ListItemText
                            primary={
                              <span
                                style={{
                                  fontFamily: `${font.LAO_FONT}`,
                                  fontSize: "14px",
                                }}
                              >
                                {val.name}
                              </span>
                            }
                          />
                          {val.sub ? (
                            val.name == "ຈັດການຂໍ້ມູນພຶ້ນຖານ" ? (
                              open ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )
                            ) : val.name == "ບໍລິການ" ? (
                              openService ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )
                            ) : null
                          ) : null}
                        </ListItemButton>
                        {val.name == "ບໍລິການ" ? (
                          <Collapse
                            in={openService}
                            timeout="auto"
                            unmountOnExit
                          >
                            {val?.sub?.map((data, index) => {
                              return (
                                <List
                                  key={index}
                                  component="div"
                                  disablePadding
                                >
                                  <ListItemButton
                                    onClick={() => navigate(data.router)}
                                    sx={{
                                      pl: 4,
                                      backgroundColor:
                                        location.pathname.split("/")[1] ===
                                        data?.router?.split("/")[1]
                                          ? "#F8F9FA"
                                          : `rgba(255, 255, 255, 1)`,
                                    }}
                                  >
                                    <ListItemIcon>{data.icon}</ListItemIcon>
                                    <ListItemText
                                      primary={
                                        <span
                                          style={{
                                            fontFamily: `${font.LAO_FONT}`,
                                            fontSize: "14px",
                                          }}
                                        >
                                          {data.name}
                                        </span>
                                      }
                                    />
                                  </ListItemButton>
                                </List>
                              );
                            })}
                          </Collapse>
                        ) : val.name == "ຈັດການຂໍ້ມູນພຶ້ນຖານ" ? (
                          <Collapse in={open} timeout="auto" unmountOnExit>
                            {val?.sub?.map((data, index) => {
                              if(data?.access.includes(userRole))
                              return (
                                <List
                                  key={index}
                                  component="div"
                                  disablePadding
                                >
                                  <ListItemButton
                                    onClick={() => navigate(data.router)}
                                    sx={{
                                      pl: 4,
                                      backgroundColor:
                                        location.pathname.split("/")[1] ===
                                        data?.router?.split("/")[1]
                                          ? "#F8F9FA"
                                          : `rgba(255, 255, 255, 1)`,
                                    }}
                                  >
                                    <ListItemIcon>{data.icon}</ListItemIcon>
                                    <ListItemText
                                      primary={
                                        <span
                                          style={{
                                            fontFamily: `${font.LAO_FONT}`,
                                            fontSize: "14px",
                                          }}
                                        >
                                          {data.name}
                                        </span>
                                      }
                                    />
                                  </ListItemButton>
                                </List>
                              );
                            })}
                          </Collapse>
                        ) : null}
                      </>
                    );
                  }
                })}
              </List> */}

              {/** log out menu */}
              <div>
                <a>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <LogoutIcon fontSize="small" />
                    <div
                      onClick={() => {
                        localStorage.clear();
                        navigate(`/`);
                      }}
                    >
                      ອອກຈາກລະບົບ
                    </div>
                  </Stack>
                </a>
              </div>
            </div>
          </ul>
        </nav>
      </div>
      {/*** this is header layout */}
      <div style={{ marginLeft: "280px" }}>
        <Stack
          direction="row-reverse"
          alignItems="center"
          spacing={3}
          sx={{
            backgroundColor: "#F8F9FA",
            height: "60px",
            paddingRight: "30px",
          }}
        >
          <Stack direction="row-reverse" spacing={0} alignItems="center">
            {/**profile */}
            
              <IconButton onClick={() => {}}>
                <Avatar
                  alt="Remy Sharp"
                  //src="/static/images/avatar/1.jpg"
                  sx={{ width: 30, height: 30 }}
                />
              </IconButton>
           

            {/**name */}
            <span
              className="en"
              style={{ fontSize: "16px", fontWeight: "500" }}
            >
              {localStorage.getItem("name")}
            </span>
          </Stack>

          
        
        </Stack>
        <div style={{ margin: "30px 30px", padding: "", backgroundColor: "" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );


}
