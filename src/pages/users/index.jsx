import { Button, Divider, IconButton, TextField } from "@mui/material";
import { Stack } from "@mui/system";

import { btnStyle, textFieldStyle } from "../../style";

import AddIcon from "@mui/icons-material/Add";
import CachedIcon from "@mui/icons-material/Cached";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SearchIcon from "@mui/icons-material/Search";
import { AddNewBtn, ConfirmDialog, ReloadArea, ReloadBtn } from "../../components/components";
import axios from "axios";
import { router, server_url } from "../../constants";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { format } from "date-fns";

import { useNavigate } from "react-router-dom";
import {useQuery} from "react-query"
import { fetchUsers } from "../../api";
import { ConfirmContext } from "../../contexts/confirDialog.provider";

export default function Users() {

  const { confirmPopUp, setConfirmPopUp } = useContext(ConfirmContext)


  const navigate = useNavigate()
  const {data, status} = useQuery("users", fetchUsers)

  const [loading , setLoading] = useState(false)

  const [userData, setUserData] = useState();
  const getAllusers = async () => {
    setLoading(true)
    axios
      .get(`${server_url}all-user`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
        timeout: 10000,
      })
      .then((res) => {
        setLoading(false)
        console.log(res.data?.data.users);
        setUserData(res.data?.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteUser = async ()=>{

  }

  useEffect(() => {
    console.log("data=====>",data)
    getAllusers();
  }, []);
  return (
    <Stack spacing={2}>
      <ConfirmDialog _onOk= {()=>{deleteUser()}}/>
      <Stack direction="row" spacing={1}>

        <AddNewBtn _onClick={() => {
          navigate(`${router.USERS}/add-user`)

        }} _title="ເພີ່ມຜູ້ໃຊ້" />
        <ReloadBtn _onClick={() => {getAllusers()}} />
      </Stack>
      <Divider />
      <Stack spacing={2}>
        <Stack alignItems="center" direction="row" alignSelf="end" spacing={1}>
          <label htmlFor="">ຄົ້ນຫາ</label>
          <TextField sx={{ ...textFieldStyle, width: "200px" }} />
        </Stack>
        {
          loading ? <ReloadArea/> :  <div
          style={{
            border: "1px solid #F8F9FA",
            borderRadius: "5px",
            padding: "5px",
            marginBottom: "50px",
          }}
        >
          <Stack paddingBottom={1}>Total: {userData?.length} records</Stack>
          <table>
            <thead
              style={{
                backgroundColor: "#BDBDBD",
              }}
            >
              <tr>
                <th>ລໍາດັບ</th>
                <th>ຮູບ</th>
                <th>ລະຫັດຜູ້ໃຊ້</th>
                <th>ປະເພດຜູ້ໃຊ້</th>
                <th>ຊື່</th>
                <th>ນາມສະກຸນ</th>
                <th>ວັນເດືອນປີເກີດ</th>
                <th>ວັນທີ່ສ້າງລາຍການ</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData?.map((val, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        style={{
                          maxHeight: "50px",
                        }}
                        src={`${server_url}image/?name=${val.image}`}
                        alt={`${val.image}`}
                      />
                    </td>
                    <td>{val.userId}</td>
                    <td>{val.type?.typeName}</td>
                    <td>{val.firstName}</td>
                    <td>{val.lastName}</td>
                    <td>{format(new Date(val.dateOfBirth), "dd/MM/yyyy")}</td>
                    <td>{format(new Date(val.createAt), "dd/MM/yyyy")}</td>
                    <td
                      style={{
                        minWidth: "10px",
                        maxWidth: "30px",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >
                        <IconButton onClick={() => {
                          setConfirmPopUp(true)

                        }} color="error">
                          <DeleteIcon />
                        </IconButton>
                      
                        <IconButton onClick={async () => {}} color="primary">
                          <BorderColorIcon />
                        </IconButton>
                      </Stack>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
        }
       
      </Stack>
    </Stack>
  );
}
