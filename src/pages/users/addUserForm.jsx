import { Button, Divider, MenuItem, Select, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { DenyBtn, OkBtn } from "../../components/components";
import { server_url } from "../../constants";
import { btnStyle, textFieldStyle } from "../../style";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export default function AddUserForm() {
  const [type, setType] = useState();

  const [loading, setloading ]= useState(false)
  const [success, setSuccess]= useState(false)

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
  


  const [userData, setUserData] = useState({
    userId: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    type: "",
  });
  const [image, setImage] = useState();

  const handleSubmit = async () => {
    setloading(true)
    setSuccess(false)
    var formData = new FormData();
    await formData.append("userId", userData.userId);
    await formData.append("password", userData.password);
    await formData.append("firstName", userData.firstName);
    await formData.append("lastName", userData.lastName);
    await formData.append("dateOfBirth", userData.dateOfBirth);
    await formData.append("type", userData.type);
    await formData.append("image", image[0]);
    // await axios
    //   .post(`${server_url}user/insert`, {
    //     formData,
    //     timeout: 10000,
    //     headers: {
    //       authorization: localStorage.getItem("token"),
    //     },
    //   })
    //   .then((res) => console.log(res.data))
    //   .catch((err) => console.log(err));

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
        setloading(false)
        setSuccess(true)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserType();
  }, []);
  return (
    <Stack spacing={0} marginBottom="100px">
      <h3>ເພີ່ມປະເພດຜູ້ໃຊ້</h3>
      {/**form */}
      <Divider />
      <Stack marginTop="30px" spacing={2}>
        {/**user id */}
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <label>ລະຫັດຜູ້ໃຊ້</label>
          <TextField
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
            onChange={(e) => {
              setUserData({ ...userData, lastName: e.target.value });
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
          <label>ລະຫັດຜ່ານ</label>
          <TextField
          onKeyPress={(e)=>{
            if(e.key === "Enter"){
                alert("dsaf")
            }
          }}
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
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
          <label>ວັນເດືອນປີເກີດ</label>
          <TextField
            onChange={(e) => {
              setUserData({ ...userData, dateOfBirth: e.target.value });
            }}
            placeholder="ດດ/ວວ/ປປປປ"
            sx={{ ...textFieldStyle, width: "90%" }}
          />
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
        <Stack
          direction="row"
          width="100%"
          //   justifyContent="space-between"
          alignItems="center"
          spacing={10}
        >
          <label>ຮູບ</label>
          {/* <Button
            startIcon={<CameraAltIcon />}
            sx={{ ...btnStyle }}
            variant="contained"
            component="label"
            // color="error"
            size="small"
            disableElevation
            onChange={(e)=>{
                console.log(e.target.files)

            }}
          >
            upload
            <input  type="file" hidden />
          </Button> */}
          <input
            accept="image/png, image/jpeg"
            style={{ width: "200px" }}
            // name="filefield"
            type="file"
            onChange={(event) => {
              event.preventDefault();
              const file = event.target.files;
              console.log(file);
              setImage(file);
              //   setFiles(file);
              //console.log(file)
              //const frmdata = new FormData();
              //   const fileImage = [];
              //   for (var x = 0; x < file.length; x++) {
              //     //  frmdata.append("file", file[x]);
              //     fileImage.push(file[x].name);
              //   }
              //   setData({ ...data, images: fileImage });
            }}
          />
         
          
        </Stack>
        {
            loading ? <span>ກຳລັງສ້າງຂໍ້ມູນ...</span> : success ? <span>ສ້າງຂໍ້ມູນສໍາເລັດ</span> : null
        }
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
              handleSubmit();
            }}
          />
          <DenyBtn _title="ຍົກເລີກ" _onClick={() => {}} />
        </Stack>
        {
            image?.length >0 ? <img style={{
                height: '100px'
            }} src={`G:/myDoc/pic/${image[0]?.name}`} alt = "sdafsd"/>: null
          }
      </Stack>
    </Stack>
  );
}
