import { Button, Divider, IconButton, TextField } from "@mui/material";
import { Stack } from "@mui/system";

import { btnStyle, textFieldStyle } from "../../style";

import AddIcon from "@mui/icons-material/Add";
import CachedIcon from "@mui/icons-material/Cached";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SearchIcon from "@mui/icons-material/Search";
import {
  AddNewBtn,
  ConfirmDialog,
  ReloadArea,
  ReloadBtn,
} from "../../components/components";
import axios from "axios";
import { router, server_url } from "../../constants";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { format } from "date-fns";

import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchUsers } from "../../api";
import { ConfirmContext } from "../../contexts/confirDialog.provider";

export default function Users() {
  const { confirmPopUp, setConfirmPopUp } = useContext(ConfirmContext);
  const navigate = useNavigate();

  // const [updatedUser, setUpdatedUser] = useState()

  // const { data, status, refetch, isLoading, isError, isSuccess, isFetching } =
  //   useQuery("users", fetchUsers);
  // const {data: result, status: cate} = useQuery(["users", id], fetchUsers(id))

  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState();

  const [deletedId, setDeletedId] = useState();

  const [searchUserId, setSearchUerId] = useState();
  const getAllusers = async () => {
    // console.log("data====>", data);
    // setUserData(res.data?.data.users);
    setLoading(true);

    setLoading(true);
    await axios
      .get(`${server_url}all-user`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
        timeout: 10000,
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data?.data.users);
        setUserData(res.data?.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteUser = async () => {
    await axios
      .delete(`${server_url}user/delete/id/${deletedId}`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        getAllusers();
        setConfirmPopUp(false);
        // refetch()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const serchUser = async () => {
    await axios
      .get(`${server_url}user/user-id/${searchUserId}`)
      .then((res) => {
        console.log();
        setLoading(false);

        setUserData(res.data?.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllusers();
  }, []);
  return (
    <Stack spacing={2}>
      <ConfirmDialog
        _onOk={() => {
          deleteUser();
        }}
      />
      <Stack direction="row" spacing={1}>
        <AddNewBtn
          _onClick={() => {
            navigate(`${router.USERS}/add-user`);
          }}
          _title="ເພີ່ມຜູ້ໃຊ້"
        />
        <ReloadBtn
          _onClick={() => {
            getAllusers();
          }}
        />
      </Stack>
      <Divider />
      <Stack spacing={2}>
        <Stack alignItems="center" direction="row" alignSelf="end" spacing={1}>
          <label htmlFor="">ຄົ້ນຫາ</label>
          <TextField placeholder="ລະຫັດຜູ້ໃຊ້, ຊື່ຜູ້ໃຊ້" sx={{ ...textFieldStyle, width: "200px" }} onChange={(e)=>{
            setSearchUerId(e.target.value)
          }} onKeyDown={(e)=>{
            if(e.key === "Enter"){
              if(searchUserId == ""){
                getAllusers()
                return
              }
              serchUser()
            }
          }}
          
          />
        </Stack>
        {loading ? (
          <ReloadArea />
        ) : (
          <div
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
                    <tr key={index} style={{
                      // fontSize: "12px"
                    }}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          loading="lazy"
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
                         

                          <IconButton
                            onClick={() => {
                              setDeletedId(val._id);
                              console.log(val._id);
                              setConfirmPopUp(true);
                            }}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>

                          <IconButton
                            onClick={async () => {
                              // setUpdatedUser(val)
                              navigate(`${router.USERS}/add-user`, {
                                state: { ...val, type: val.type._id },
                              });
                            }}
                            color="primary"
                          >
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
        )}
      </Stack>
    </Stack>
  );
}
