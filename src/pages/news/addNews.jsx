import {
  Box,
  Chip,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import * as React from "react";
import { textFieldStyle } from "../../style";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { server_url } from "../../constants";
import { instance } from "../../api";

export default function AddNews() {
  React.useEffect(() => {
    fetchUserType();
  }, []);
  const myWidth = "88%";
  const arr = ["asd", "fgdfg", "wer"];
  const [userType, setUserType] = React.useState([]);

  const [selectedUserType, setSelectedUserType] = React.useState([]);
  const [SeletectedUserTypeId, setSeletectedUserTypeId] = React.useState([])
 
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
  const fetchNewsType = async () => {};
  return (
    <Stack>
      <DialogTitle sx={{ fontFamily: "Noto sans lao" }}>
        ເພີ່ມປະເພດຂ່າວສານ
      </DialogTitle>
      <DialogContent>
        <Divider />
      </DialogContent>

      <DialogContent>
        <Stack spacing={2}>
          <Stack
            alignItems={"center"}
            width={"100%"}
            direction="row"
            justifyContent={"space-between"}
          >
            <label>ຫົວຂໍ້</label>
            <TextField sx={{ ...textFieldStyle, width: myWidth }} />
          </Stack>
         
          <Stack
            alignItems={"center"}
            width={"100%"}
            direction="row"
            justifyContent={"space-between"}
          >
            <label>ປະເພດຂ່າວສານ</label>
            <Select
              sx={{ width: myWidth }}
              multiple
              value={arr}
              onChange={() => {}}
              input={
                <OutlinedInput
                  sx={{ "&. MuiOutlinedInput-root": { padding: "0px" } }}
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              //   MenuProps={MenuProps}
            >
              <MenuItem value="sd">asd</MenuItem>
              <MenuItem value="w">asd</MenuItem>
              <MenuItem value="v">asd</MenuItem>
            </Select>
          </Stack>
          <Stack
            alignItems={"center"}
            width={"100%"}
            direction="row"
            justifyContent={"space-between"}
          >
            <label>ເຖິງ</label>
            {/* <TextField sx={{ ...textFieldStyle, width: myWidth }} /> */}
            <Select
              sx={{ width: myWidth }}
              multiple
              value={selectedUserType}
              onChange={ async (e) => {
                // console.log(e.target.getAttribbute("name"))
                // console.log("====>",e.target.value)
                let arr = e.target.value
                let display = []
                for (let i = 0; i < arr.length; i++) {
                    const element = arr[i];
                    let result =  userType.filter( x => x.typeName == element)
                    console.log("===>",result[0]._id)
                    display.push(result[0]._id)
                    // setSeletectedUserTypeId([...SeletectedUserTypeId, result[0].typeName])
                }

                 setSelectedUserType(e.target.value);
                 setSeletectedUserTypeId(display)
                //  console.log(selectedUserType)
                console.log(SeletectedUserTypeId)
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
            alignItems={"flex-start"}
            width={"100%"}
            direction="row"
            justifyContent={"space-between"}
          >
            <label>ເນື້ອໃນ</label>
            <TextField
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
                value={""}
                onChange={(newValue) => {
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
        </Stack>
      </DialogContent>
    </Stack>
  );
}
