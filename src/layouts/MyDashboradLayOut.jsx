import { display } from "@mui/system";
import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { font, router } from "../constants";
import "./sideNav.css";

//icon
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import GroupIcon from "@mui/icons-material/Group";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { Avatar, Divider, Stack, IconButton, Badge } from "@mui/material";

export default function MyDashboradLayOut() {
  const [collape, setCollape] = React.useState(false);

  const navigate = useNavigate();
  const sideNavData = [
    {
      name: "ໜ້າຫຼັກ",
      icon: <DashboardIcon fontSize="small" />,
      router: `${router.DASHBOARD}`,
    },
    {
      name: "ຈັດການຂໍ້ມູນປະເພດຜູ້ໃຊ້",
      icon: <GroupIcon fontSize="small" />,
      router: `${router.USERTYPE}`,
    },
    {
      name: "ຈັດການຂໍ້ມູນຜູ້ໃຊ້",
      icon: <PersonIcon fontSize="small" />,
      router: `${router.USERS}`,
    },
    {
      name: "ຈັດການຂໍ້ມູນປະເພດຂ່າວສານ",
      icon: <AutoAwesomeMotionIcon fontSize="small" />,
      router: `${router.NEWSCATEGORY}`,
    },
    {
      name: "ຈັດການຂໍ້ມູນຂ່າວສານ",
      icon: <NewspaperIcon fontSize="small" />,
      router: `${router.NEWS}`,
    },
  ];
  return (
    <div>
      {/** this is side nav */}
      <div>
        <nav > 
          <ul className={collape && "open"}> 
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
            <Divider />
            {/**side nav menu */}

            <div
              style={{
                marginTop: "20px",
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
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <div>{data?.icon}</div>
                            <div>{data?.name}</div>
                          </Stack>
                        </Stack>
                      </Stack>
                    </a>
                  );
                })}
              </div>

              

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
      <div
       className={collape ? "body open " : "body"}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
          sx={{
            backgroundColor: "#F8F9FA",
            height: "60px",
            padding: "0px 30px",
          }}
        >
          <Stack>
            <IconButton
              onClick={() => {
                setCollape((collape) => !collape);
              }}
            >
              {
                collape ? <KeyboardArrowRightIcon/> : <KeyboardArrowLeftIcon/>
              }
              
              

            </IconButton>
          </Stack>
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
