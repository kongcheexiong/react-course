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
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MenuIcon from "@mui/icons-material/Menu";

import {
  Avatar,
  Divider,
  Stack,
  IconButton,
  Badge,
  Collapse,
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { btnStyle } from "../style";

export default function MyDashboradLayOut() {
  const [collape, setCollape] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);

  const navigate = useNavigate();
  const sideNavData = [
    {
      name: "ໜ້າຫຼັກ",
      icon: <DashboardIcon fontSize="small" />,
      router: `${router.DASHBOARD}`,
    },
    {
      name: "ຈັດການຂໍ້ມູນພຶ້ນຖານ",
      icon: <PersonIcon fontSize="small" />,
      router: ``,
      sub: [
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
      ],
    },
    {
      name: "ຈັດການຂໍ້ມູນ",
      icon: <GroupIcon fontSize="small" />,
      router: ``,
      sub: [
        {
          name: "ປະເພດຜູ້ໃຊ້",
          icon: <GroupIcon fontSize="small" />,
          router: `${router.USERTYPE}`,
        },
        {
          name: "ຜູ້ໃຊ້",
          icon: <PersonIcon fontSize="small" />,
          router: `${router.USERS}`,
        },
      ],
    },
  ];
  const [isPopup, setPopup] = React.useState(false);
  return (
    <div>
      <Dialog open={isPopup} onClose={() => setPopup(!isPopup)}>
        <DialogTitle sx={{ fontFamily: "Noto sans lao" }}>ຢືນຢັນ</DialogTitle>
        <DialogContent>
          <p>Do you really want to exit?</p>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ ...btnStyle }}
            onClick={() => setPopup(false)}
            variant="contained"
            color="error"
            size="small"
            disableElevation
          >
            ຍົກເລີກ
          </Button>
          <Button
            sx={{ ...btnStyle }}
            onClick={() => {
              localStorage.clear();
              navigate(`/`);
            }}
            variant="contained"
            color="primary"
            size="small"
            disableElevation
          >
            ຕົກລົງ
          </Button>
        </DialogActions>
      </Dialog>
      {/** this is side nav */}
      <div>
        <nav>
          <ul className={collape && "open"}>
            {/** side nav header and logo name*/}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "10px",
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
                    <Stack key={index}>
                      <a
                        onClick={() => {
                          if (data.sub && data.name == "ຈັດການຂໍ້ມູນພຶ້ນຖານ") {
                            setOpen(!open);
                            return;
                            // setOpens(!opens)
                          }
                          if (data.sub && data.name == "ຈັດການຂໍ້ມູນ") {
                            // setOpen(!open);
                            setOpens(!opens);
                            return;
                          }
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
                          paddingRight: "10px",
                        }}
                      >
                        <Stack
                          direction={collape ? "row-reverse" : "row"}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <div>{data?.icon}</div>
                            <div>{!collape ? data?.name : null}</div>
                          </Stack>
                          {/**icon */}
                          {!collape && data.sub && (
                            <div>
                              {data?.name == "ຈັດການຂໍ້ມູນພຶ້ນຖານ" ? (
                                <>
                                  {" "}
                                  {open ? (
                                    <ExpandLessIcon />
                                  ) : (
                                    <ExpandMoreIcon />
                                  )}
                                </>
                              ) : data?.name == "ຈັດການຂໍ້ມູນ" ? (
                                <>
                                  {" "}
                                  {opens ? (
                                    <ExpandLessIcon />
                                  ) : (
                                    <ExpandMoreIcon />
                                  )}
                                </>
                              ) : null}
                            </div>
                          )}
                        </Stack>
                      </a>
                      {/**collape of ຈັດການຂໍ້ມູນພຶ້ນຖານ */}
                      {data.name == "ຈັດການຂໍ້ມູນພຶ້ນຖານ" &&
                        data.sub?.map((val, index) => {
                          return (
                            <Collapse in={open} timeout="auto" unmountOnExit>
                              <a
                                onClick={() => {
                                  if (!val.router == "") {
                                    navigate(val?.router);
                                  }
                                }}
                                style={{
                                  backgroundColor:
                                    location.pathname.split("/")[1] ===
                                    val?.router.split("/")[1]
                                      ? "#F8F9FA"
                                      : `rgba(255, 255, 255, 1)`,
                                  paddingLeft: "50px",
                                  paddingRight: "25px",
                                }}
                              >
                                <Stack
                                  direction={!collape ? "row" : "row-reverse"}
                                  alignItems="center"
                                  spacing={2}
                                >
                                  <div>{val?.icon}</div>
                                  <div>{val?.name}</div>
                                </Stack>
                              </a>
                            </Collapse>
                          );
                        })}
                      {/**collape of ຈັດການຂໍ້ມູນ */}
                      {data.name == "ຈັດການຂໍ້ມູນ" &&
                        data.sub?.map((val, index) => {
                          return (
                            <Collapse in={opens} timeout="auto" unmountOnExit>
                              <a
                                onClick={() => {
                                  if (!val.router == "") {
                                    navigate(val?.router);
                                  }
                                }}
                                style={{
                                  backgroundColor:
                                    location.pathname.split("/")[1] ===
                                    val?.router.split("/")[1]
                                      ? "#F8F9FA"
                                      : `rgba(255, 255, 255, 1)`,
                                  paddingLeft: "50px",
                                  paddingRight: "25px",
                                }}
                              >
                                <Stack
                                  direction={!collape ? "row" : "row-reverse"}
                                  alignItems="center"
                                  spacing={2}
                                >
                                  <div>{val?.icon}</div>
                                  <div>{val?.name}</div>
                                </Stack>
                              </a>
                            </Collapse>
                          );
                        })}
                    </Stack>
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
                        setPopup(true);
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
        style={{
          marginLeft: collape && "60px",
        }}
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
              <MenuIcon />
              {/* {collape ? <MenuIcon /> : <KeyboardArrowLeftIcon />} */}
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
