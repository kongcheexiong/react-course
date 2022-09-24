import {
  Alert,
  Backdrop,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Stack } from "@mui/system";
import * as React from "react";
import { btnStyle, textFieldStyle } from "../../style";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { router, server_url } from "../../constants";
import { instance } from "../../api";
import { DenyBtn, OkBtn } from "../../components/components";
import axios from "axios";

import { useNavigate, useLocation } from "react-router-dom";

export default function AddNews() {
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (location?.state) {
      getUpdatedTypeAndUserFromUrlState();
    }
    // console.log("===>", location?.state);
    fetchUserType();
    fetchNewsType();
  }, []);
  const myWidth = "88%";
  const arr = ["asd", "fgdfg", "wer"];
  const [userType, setUserType] = React.useState([]);
  const [newsType, setNewsType] = React.useState([]);

  const [title, setTitle] = React.useState( location?.state.title || "");
  const [body, setBody] = React.useState(location?.state.body || "");

  //   const [a, setA] = React.useState(10)
  const fileRef = React.useRef();

  const [selectedUserType, setSelectedUserType] = React.useState([]);
  const [SeletectedUserTypeId, setSeletectedUserTypeId] = React.useState([]);

  const [selectedNewsType, setSelectedNewsType] = React.useState([]);
  const [SeletectedNewsTypeId, setSeletectedNewsTypeId] = React.useState([]);

  const [selectedDate, setSelectedDate] = React.useState( location?.state.endAt || "");
  const [selectedFile, setSelectedFile] = React.useState("");
  const [selectedFileName, setSelectdeFileName] = React.useState("");

  const matches = useMediaQuery("(max-width:800px)");

  const [loading, setLoading] = React.useState(false);
  const [success, setSucess] = React.useState(false);
  const [err, setErr] = React.useState(false);

  const [editFile, setEditfile] = React.useState(false);

  const Fetching = () => {
    setLoading(true);
    setSucess(false);
    setErr(false);
  };
  const FetchErr = () => {
    setLoading(false);
    setSucess(false);
    setErr(true);
  };
  const FetchSuccess = () => {
    setLoading(false);
    setSucess(true);
    setErr(false);
  };

  const fetchUserType = async () => {
    instance
      .get(`${server_url}/user-types/skip/0/limit/30`)
      .then((res) => {
        console.log(res.data.data);
        setUserType(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchNewsType = async () => {
    await instance
      .get(`news-cate/all`)
      .then((res) => {
        setNewsType(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUserTypeIdIdforSend = () => {
    let display = [];
    for (let i = 0; i < selectedUserType.length; i++) {
      const element = selectedUserType[i];
      let result = userType.filter((x) => x.typeName == element);
      console.log("===>", result[0]._id);
      display.push(result[0]._id);
      // setSeletectedUserTypeId([...SeletectedUserTypeId, result[0].typeName])
    }
    setSeletectedUserTypeId(display);
  };
  const getNewsTypeIdIdforSend = () => {
    let display = [];
    for (let i = 0; i < selectedNewsType.length; i++) {
      const element = selectedNewsType[i];
      let result = newsType.filter((x) => x.typeName == element);
      console.log("===>", result[0]._id);
      display.push(result[0]._id);
    }
    setSeletectedNewsTypeId(display);
  };
  const createNews = async () => {
    await getNewsTypeIdIdforSend()
    await getUserTypeIdIdforSend()
    Fetching();
    let data = new FormData();
    data.append("title", title);
    data.append("body", body);

    SeletectedUserTypeId.forEach((element) => {
      data.append("userType", element);
    });

    SeletectedNewsTypeId.forEach((element) => {
      data.append("newsType", element);
    });
    // data.append("userType", SeletectedUserTypeId);
    // data.append("newsType", SeletectedNewsTypeId);
    data.append("endAt", selectedDate);
    data.append("file", selectedFile[0]);

    var config = {
      method: "post",
      url: "http://127.0.0.1:8000/api/news/insert",

      data: data,
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data);
        FetchSuccess();
      })
      .catch(function (error) {
        FetchErr();
        console.log(error);
      });

    // instance
    //   .post("news/insert", { data })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };
  const updateNews = async ()=>{
    await getNewsTypeIdIdforSend()
    await getUserTypeIdIdforSend()
    Fetching();
    let data = new FormData();
    data.append("id",location.state._id)
    data.append("title", title);
    data.append("body", body);

    SeletectedUserTypeId.forEach((element) => {
      data.append("userType", element);
    });

    SeletectedNewsTypeId.forEach((element) => {
      data.append("newsType", element);
    });
    // data.append("userType", SeletectedUserTypeId);
    // data.append("newsType", SeletectedNewsTypeId);
    data.append("endAt", selectedDate);
    if(selectedFile.length >0){
      data.append("file", selectedFile[0]);
    }
    
    var config = {
      method: "put",
      url: "http://127.0.0.1:8000/api/news/update/",

      data: data,
    };
    await axios(config)
      .then(function (response) {
        console.log(response.data);
        FetchSuccess();
      })
      .catch(function (error) {
        FetchErr();
        console.log(error);
      });
  }

  const getUpdatedTypeAndUserFromUrlState = () => {
    let type = [];
    location?.state.newsType.forEach((element) => {
      type.push(element.typeName);
    });
    setSelectedNewsType(type);
    let userType = [];
    location?.state.userType.forEach((element) => {
      userType.push(element.typeName);
    });
    setSelectedUserType(userType);
  };

 

  return (
    <Stack>
      {/**success */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={success}
        autoHideDuration={2000}
        onClose={() => {
          setSucess(false);
        }}
      >
        <Alert
          onClose={() => {
            setSucess(false);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
      {/**err */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={err}
        autoHideDuration={2000}
        onClose={() => {
          setErr(false);
        }}
      >
        <Alert
          onClose={() => {
            setErr(false);
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          This is a error message!
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <DialogTitle sx={{ fontFamily: "Noto sans lao" }}>
        ເພີ່ມປະເພດຂ່າວສານ
      </DialogTitle>
      <DialogContent>
        <Divider />
      </DialogContent>

      <DialogContent sx={{ marginBottom: "50px" }}>
        <Stack spacing={2}>
          <Stack
            alignItems={matches ? "flex-start" : "center"}
            width={"100%"}
            direction={matches ? "column" : "row"}
            justifyContent={"space-between"}
          >
            <label>ຫົວຂໍ້</label>
            <TextField
              defaultValue={location?.state ? location?.state.title : null}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ ...textFieldStyle, width: myWidth }}
            />
          </Stack>
          <Stack
            alignItems={matches ? "flex-start" : "center"}
            width={"100%"}
            direction={matches ? "column" : "row"}
            justifyContent={"space-between"}
          >
            <label>ປະເພດຂ່າວສານ</label>
            {/* <TextField sx={{ ...textFieldStyle, width: myWidth }} /> */}
            <Select
              sx={{ width: myWidth }}
              multiple
              value={selectedNewsType}
              onChange={async (e) => {
                let arr = e.target.value;

                setSelectedNewsType(arr);

                console.log("====>", display);
              }}
              input={<OutlinedInput />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected?.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              //   MenuProps={MenuProps}
            >
              {newsType?.map((val, index) => {
                return (
                  <MenuItem key={index} value={val.typeName}>
                    {val.typeName}
                  </MenuItem>
                );
              })}
            </Select>
          </Stack>

          <Stack
            alignItems={matches ? "flex-start" : "center"}
            width={"100%"}
            direction={matches ? "column" : "row"}
            justifyContent={"space-between"}
          >
            <label>ປະເພດຜູ້ໃຊ້</label>
            {/* <TextField sx={{ ...textFieldStyle, width: myWidth }} /> */}
            <Select
              sx={{ width: myWidth }}
              multiple
              value={selectedUserType}
              onChange={async (e) => {
                // console.log(e.target.getAttribbute("name"))
                // console.log("====>",e.target.value)
                let arr = e.target.value;

                setSelectedUserType(e.target.value);

                //  console.log(selectedUserType)
                console.log(SeletectedUserType);
              }}
              input={<OutlinedInput />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected?.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              //   MenuProps={MenuProps}
            >
              {userType?.map((val, index) => {
                return (
                  <MenuItem key={index} value={val.typeName}>
                    {val.typeName}
                  </MenuItem>
                );
              })}
            </Select>
          </Stack>
          <Stack
            alignItems={matches ? "flex-start" : "center"}
            width={"100%"}
            direction={matches ? "column" : "row"}
            justifyContent={"space-between"}
          >
            <label>ເນື້ອໃນ</label>
            <TextField
              defaultValue={location?.state ? location.state.body : null}
              onChange={(e) => setBody(e.target.value)}
              multiline
              rows={6}
              sx={{
                ...textFieldStyle,
                width: myWidth,
                "& .MuiInputBase-root": {
                  padding: "2px",
                  minHeight: "35px",
                  fontFamily: "Noto sans lao",
                },
              }}
            />
          </Stack>
          <Stack
            alignItems={matches ? "flex-start" : "center"}
            width={"100%"}
            direction={matches ? "column" : "row"}
            justifyContent={"space-between"}
            //   spacing="15px"
          >
            <label>ກຳນົດຮອດວັນທີ່</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                //   label="Basic example"
                // value={value}
                
                inputFormat="dd/MM/yyyy"
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);

                  // console.log(newValue);
                  // setUserData({ ...userData, dateOfBirth: newValue });
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ ...textFieldStyle, width: myWidth }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </Stack>
          {location?.state ? (
            <Stack
              direction="row"
              justifyContent={"flex-start"}
              spacing={1}
              alignItems="center"
            >
              <Checkbox
                checked={editFile}
                onChange={() => {
                  setEditfile(!editFile);
                }}
              />
              <span>ແກ້ໄຂໄຟ</span>
            </Stack>
          ) : null}
          {!location?.state || editFile == true ? (
            <Stack
              width={"100%"}
              justifyContent={"space-between"}
              alignItems={matches ? "flex-start" : "center"}
              direction={matches ? "column" : "row"}
            >
              <label>ເລືອກໄຟຄັດຕິດ</label>
              <Stack
                width={myWidth}
                direction="row"
                justifyContent={"flex-start"}
              >
                {/* <Button onClick={()=> fileRef.current.click()} disableElevation variant="contained" sx={{...btnStyle}}>
                    {selectedFileName == "" ? "ເລືອກໄຟຄັດຕິດ" : selectedFileName} 
                </Button> */}
                <input
                  onChange={(e) => {
                    let data = e.target.value;
                    let filePath = data?.split("\\");
                    let fileName = filePath[filePath.length - 1];
                    console.log(e.target.files);

                    setSelectdeFileName(fileName);

                    setSelectedFile(e.target.files);
                  }}
                  ref={fileRef}
                  type="file"
                />
              </Stack>
            </Stack>
          ) : null}

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <OkBtn
              _title="ຕົກລົງ"
              _onClick={() => {
                if (location?.state) {
                  
                  updateNews()
                  return;
                }
                createNews();
              }}
            />
            <DenyBtn
              _onClick={() => {
                navigate(`${router.NEWS}`);
              }}
            />
          </Stack>
        </Stack>
      </DialogContent>
    </Stack>
  );
}
