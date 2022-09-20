import {
  Button,
  Checkbox,
  Divider,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { DenyBtn, OkBtn } from "../../components/components";
import { router, server_url } from "../../constants";
import { btnStyle, textFieldStyle } from "../../style";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { useNavigate, useLocation } from "react-router-dom";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import { format } from "date-fns";

export default function AddUserForm() {
  const { state } = useLocation();

  const [check , setCheck]= useState(false)

  const navigate = useNavigate();
  const [type, setType] = useState();
  const imgRef = useRef(null);
  const dateRef = useRef(null);

  const [loading, setloading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);

  const getUserType = async () => {
    await axios
      .get(`${server_url}user-types/skip/0/limit/30`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
        timeout: "10000",
      })
      .then((res) => {
        console.log(res.data.data);
        setType(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [userData, setUserData] = useState(
    state || {
      userId: "",
      password: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      type: "",
    }
  );
  const [image, setImage] = useState();

  const handleSubmit = async () => {
    setErr(false);
    setloading(true);
    setSuccess(false);
    var formData = new FormData();
    await formData.append("userId", userData.userId);
    await formData.append("password", userData.password);
    await formData.append("firstName", userData.firstName);
    await formData.append("lastName", userData.lastName);
    await formData.append("dateOfBirth", userData.dateOfBirth);
    await formData.append("type", userData.type);
    await formData.append("image", image[0]);

    var config = {
      method: "post",
      url: "http://127.0.0.1:8000/api/user/insert",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: formData,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setloading(false);
        setSuccess(true);
        setErr(false);
      })
      .catch(function (error) {
        console.log(error);
        setErr(true);
        setloading(false);
        setSuccess(false);
      });
  };

  const updateUser = async () => {
    setErr(false);
    setloading(true);
    setSuccess(false);
    var formData = new FormData();
    await formData.append("_id", state._id);
    await formData.append("userId", userData.userId);
    if(check){
        await formData.append("password", userData.password);
    }
    
    await formData.append("firstName", userData.firstName);
    await formData.append("lastName", userData.lastName);
    await formData.append("dateOfBirth", userData.dateOfBirth);
    await formData.append("type", userData.type);
    if (image?.length > 0) {
      await formData.append("image", image[0]);
    }

    await formData.append("old_img", state.image);

    console.log(formData);

    var config = {
      method: "put",
      url: "http://127.0.0.1:8000/api/user/update",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: formData,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setloading(false);
        setSuccess(true);
        setErr(false);
      })
      .catch(function (error) {
        console.log(error);
        setErr(true);
        setloading(false);
        setSuccess(false);
      });

    await axios
      .put()
      .then(() => {})
      .catch(() => {});
  };

  useEffect(() => {
    if (state) {
      console.log(state);
    }

    getUserType();
  }, []);
  return (
    <Stack spacing={0} marginBottom="100px">
      {state ? <h3>ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້</h3> : <h3>ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້</h3>}
      {/**form */}
      <Divider />
      <Stack marginTop="30px" spacing={2}>
        <Stack
          direction="row"
          width="100%"
           justifyContent="space-between"
          alignItems="flex-start"
          
        >
          <label>ຮູບ</label>
          <Stack width="90%" direction = "row">
          {image?.length > 0 || state ? (
            <img
              onClick={() => {
                imgRef.current.click();
              }}
              style={{
                cursor: "pointer",
                borderRadius: "10px",
                height: "100px",
                width: "100px",
              }}
              src={
                image?.length > 0
                  ? `${URL.createObjectURL(image[0])}`
                  : `${server_url}image/?name=${state.image}`
              }
              alt="sdafsd"
            />
          ) : (
            <div
              onClick={() => {
                imgRef.current.click();
              }}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
                height: "100px",
                width: "100px",
                alignItems: "center",
                justifyContent: "center",

                backgroundColor: "#F8F9FA",
              }}
            >
              <CameraAltIcon color="primary" />
            </div>
          )}

          </Stack>
        
        </Stack>

        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <label>ລະຫັດຜູ້ໃຊ້</label>
          <TextField
            defaultValue={userData.userId}
            onChange={(e) => {
              setUserData({ ...userData, userId: e.target.value });
            }}
            sx={{ ...textFieldStyle, width: "90%" }}
          />
        </Stack>
        {/**firstname */}
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <label>ຊື່</label>
          <TextField
            defaultValue={userData.firstName}
            onChange={(e) => {
              setUserData({ ...userData, firstName: e.target.value });
            }}
            sx={{ ...textFieldStyle, width: "90%" }}
          />
        </Stack>

        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <label>ນາມສະກຸນ</label>
          <TextField
            defaultValue={userData.lastName}
            onChange={(e) => {
              setUserData({ ...userData, lastName: e.target.value });
            }}
            sx={{ ...textFieldStyle, width: "90%" }}
          />
        </Stack>
        {!state ? (
          <Stack
            direction="row"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <label>ລະຫັດຜ່ານ</label>
            <TextField
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  alert("dsaf");
                }
              }}
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
              sx={{ ...textFieldStyle, width: "90%" }}
            />
          </Stack>
        ) : null}

        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          //   spacing="15px"
          alignItems="center"
        >
          <label>ວັນເດືອນປີເກີດ</label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              //   label="Basic example"
              // value={value}
              inputFormat="dd/MM/yyyy"
              value={userData.dateOfBirth}
              onChange={(newValue) => {
                console.log(newValue);
                setUserData({ ...userData, dateOfBirth: newValue });
              }}
              renderInput={(params) => (
                <TextField
                  sx={{ ...textFieldStyle, width: "90%" }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>

          {/* <TextField
        //   disabled
            onClick={()=> dateRef.current.click()}
            onChange={(e) => {
              setUserData({ ...userData, dateOfBirth: e.target.value });
            }}
            placeholder="ດດ/ວວ/ປປປປ"
            sx={{ ...textFieldStyle, width: "90%", cursor: "pointer" }}
          /> */}
        </Stack>
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <label>ປະເພດຜູ້ໃຊ້</label>
          {/* <TextField sx={{ ...textFieldStyle, width: "90%" }} /> */}
          <Select
            defaultValue={userData.type}
            onChange={(e) => {
              setUserData({ ...userData, type: e.target.value });
            }}
            sx={{ ...textFieldStyle, width: "90%" }}
          >
            {type?.map((val, index) => {
              return (
                <MenuItem key={index} value={val._id}>
                  {val.typeName}
                </MenuItem>
              );
            })}
          </Select>
        </Stack>
        {
            state ?   <Stack direction="row" justifyContent="flex-start" alignItems= "center">
            <Checkbox checked={check} onChange={()=>{
              setCheck(!check)
  
            }}/>
            <label htmlFor="">ແກ້ໄຂລະຫັດຜ່ານ</label>
          </Stack> : null
        }
      
        {
            check ? <Stack
            direction="row"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <label>ລະຫັດຜ່ານ</label>
            <TextField
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  alert("dsaf");
                }
              }}
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
              sx={{ ...textFieldStyle, width: "90%" }}
            />
          </Stack> : null
        }
        

        {loading ? (
          <span style={{ color: "green", alignSelf: "end" }}>
            ກຳລັງສ້າງຂໍ້ມູນ...
          </span>
        ) : success ? (
          <span style={{ color: "green", alignSelf: "end" }}>
            ສ້າງຂໍ້ມູນສໍາເລັດ
          </span>
        ) : err ? (
          <span style={{ color: "red", alignSelf: "end" }}>ເກີດຂໍ້ຜິດພາດ</span>
        ) : null}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="end"
          alignItems="center"
        >
          <OkBtn
            _title="ຕົກລົງ"
            _onClick={() => {
              // console.log(userData)
              if (state) {
                updateUser();
                return;
              }
              if (userData.firstName == "") {
                alert("input name");
                return;
              }
              if (typeof image === "undefined") {
                alert("select image ?");
                return;
              }

              handleSubmit();
            }}
          />
          <DenyBtn
            _title="ຍົກເລີກ"
            _onClick={() => {
              navigate(`${router.USERS}`);
            }}
          />
        </Stack>
      </Stack>
      <input
        hidden
        ref={imgRef}
        accept="image/png, image/jpeg"
        type="file"
        onChange={(event) => {
          event.preventDefault();
          const file = event.target.files;
          console.log(file);
          setImage(file);
          //   console.log(`${URL.createObjectURL(file[0])}`)
        }}
      />
    </Stack>
  );
}
