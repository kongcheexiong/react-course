import {
  Button,
  Divider,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Stack } from "@mui/system";
import * as react from "react";
import { textFieldStyle } from "../../style";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";

import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { server_url } from "../../constants";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { format } from "date-fns";
import { setLogger } from "react-query";

export default function UserType() {
  const navigate = useNavigate();

  const inputRef = react.useRef(null);
  const inputRef1 = react.useRef(null)
  const updateRef = react.useRef(null)


  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setErr] = useState(false);

  const [isPopup, setPopup] = useState(false);

  const [userTypeData, setUserTypeData] = useState();

  const [newUserType, setNewUserType] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletedId, setDeletedId] = useState("");

  const [updatedData, setupdatedData] = useState();
  const [popUpUpdate, setPopupUpdate] = useState(false);

  const getAllusers = async () => {
    setIsLoading(true);
    setErr(false);
    await axios
      .get(`${server_url}user-types`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
        timeout: "10000",
      })
      .then((res) => {
        console.log(res.data.data);
        setUserTypeData(res.data.data);
        setOriginalData(res.data.data);
        setErr(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
        setIsLoading(false);
        if (err?.response?.data?.message === "unauthorized") {
          alert("unauthorized");
          localStorage.clear();
          navigate("/", {
            replace: true,
          });
        }
      });
  };

  const insertUserType = async () => {
    var config = {
      method: "post",
      url: `${server_url}userType/insert?typeName=${newUserType}`,
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          alert("user already exist!");
        }
        console.log(error);
      });
  };
  const deleteUserType = async (id) => {
    var config = {
      method: "delete",
      url: `${server_url}user-types/delete?id=${id}`,
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    axios(config)
      .then(function (response) {
        alert("userType deleted successfully");
        console.log(response.data);
      })
      .catch(function (error) {
        // if(error.response.status === 400){
        //    alert("user already exist!")

        // }
        console.log(error);
      });
  };
  const updateUserType = async () => {
    var config = {
      method: "put",
      url: `${server_url}/user-types/update`,
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        id: updatedData.id,
        typeName: updatedData.typeName,
      },
    };
    axios(config)
      .then(function (response) {
         setPopupUpdate(false);
        getAllusers();
        alert(`userType updated successfully for user ${updatedData.id}`);
        console.log(response.data);
      })
      .catch(function (error) {
        // if(error.response.status === 400){
        //    alert("user already exist!")

        // }
        console.log(error);
      });
  };

  const [originalData, setOriginalData] = useState()

  react.useEffect(() => {
    getAllusers();
  }, []);

  return (
    <Stack direction="column" spacing={2}>
      {/**menu button */}
      <Stack direction="row" spacing={2}>
        {/**add new category */}
        <Button
        startIcon={<AddIcon/>}
          onClick={() => setPopup(true)}
          variant="contained"
          size="small"
          disableElevation
        >
          ເພີ່ມປະເພດຜູ້ໃຊ້
        </Button>
        {/**reload */}
        <Button
        startIcon={<CachedIcon/>}
          onClick={getAllusers}
          variant="outlined"
          color="secondary"
          size="small"
          disableElevation
        >
          reload
        </Button>
      </Stack>
      <Divider />
      {/**datagrid */}
      <Stack direction="column" spacing={2}>
        {/**search */}
        <Stack alignItems="center" direction="row-reverse" spacing={1}>
          <TextField
          onChange={ async (e)=>{
            if(e.target.value == ""){
               getAllusers()
               return
            }
            let data = await originalData?.filter(x => x.typeName.includes(e.target.value));
            setUserTypeData(data)

          }}
         
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="ປະເພດຜູ້ໃຊ້"
            sx={{
              ...textFieldStyle,
              width: "200px",
              "& .MuiInputBase-root": {
                height: "35px",
              },
              "& .MuiOutlinedInput-input": {
                fontSize: "14px",
                padding: "6px",
              },
            }}
          />
          <span>ຄົ້ນຫາ:</span>
        </Stack>
        {/**table */}
        {isLoading ? (
          <div
            style={{
              height: "400px",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: 'red',

              alignSelf: "center",
            }}
          >
            <CircularProgress />
          </div>
        ) : isErr ? (
          <>There is an error </>
        ) : (
          <div
            style={{
              border: "1px solid #F8F9FA",
              borderRadius: "5px",
              padding: "5px",
            }}
          >
            <table>
              {/**table header */}
              <tr>
                <th>ລໍາດັບ</th>
                <th>ລະຫັດປະເພດ</th>
                <th>ຊື່ປະເພດ</th>
                <th>ວັນທີ່ສ້າງລາຍການ</th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  Action
                </th>
              </tr>
              {userTypeData?.map((val, index) => {
                return (
                  <tr
                    key={index}
                    style={{
                     //  height: "25px",
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{val._id}</td>
                    <td>{val.typeName}</td>
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
                            setConfirmDelete(true);
                          }}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          onClick={ async() => {
                           
                            setupdatedData({
                              id: val._id,
                              typeName: val.typeName,
                            });
                           
                            await setPopupUpdate(true);
                            inputRef.current.focus();
                            
                          
                           
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
            </table>
          </div>
        )}
        {/**insert */}
        <Dialog open={isPopup} onClose={() => setPopup(!isPopup)}>
          <DialogTitle>ເພີ່ມປະເພດຜູ້ໃຊ້</DialogTitle>
          <DialogContent>
            <TextField
              onChange={(e) => {
                setNewUserType(e.target.value);
              }}
              placeholder="ປະເພດຜູ້ໃຊ້"
              sx={{
                ...textFieldStyle,
                width: "400px",
                "& .MuiInputBase-root": {
                  height: "35px",
                },
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px",
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setPopup(false)}
              variant="contained"
              color="error"
              size="small"
              disableElevation
            >
              ຍົກເລີກ
            </Button>
            <Button
              onClick={() => {
                if (newUserType == "") {
                  alert("please input the form properly");
                  return;
                }
                insertUserType();
                setPopup(false);
                getAllusers();
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
        {/**delelet */}
        <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
          <DialogTitle>ຢືນຢັນ</DialogTitle>
          <DialogContent>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde,
              nisi.
            </p>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setConfirmDelete(false)}
              variant="contained"
              color="error"
              size="small"
              disableElevation
            >
              ຍົກເລີກ
            </Button>
            <Button
              onClick={() => {
                deleteUserType(deletedId);
                setConfirmDelete(false);

                getAllusers();
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

        {/**update */}
        <Dialog open={popUpUpdate} onClose={() => setPopupUpdate(false)}>
          <DialogTitle>ແກ້ໄຂຂໍ້ມູນ</DialogTitle>
          <DialogContent>
            <TextField
            
            inputRef={inputRef}
            onKeyDown={(e)=>{
               if(e.key === "Enter"){
                  
                updateUserType();
                console.log(popUpUpdate)

                
               
               }

            }}
              onChange={(e) => {
               
                setupdatedData({ ...updatedData, typeName: e.target.value });
              }}
              defaultValue={`${updatedData?.typeName}`}
              placeholder="ປະເພດຜູ້ໃຊ້"
              sx={{
                ...textFieldStyle,
                width: "400px",
                "& .MuiInputBase-root": {
                  height: "35px",
                },
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px",
                },
              }}
            />
            
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setPopupUpdate(false)}
              variant="contained"
              color="error"
              size="small"
              disableElevation
            >
              ຍົກເລີກ
            </Button>
            <Button
            
              onClick={() => {
              
                updateUserType();

               //  setPopupUpdate(false);
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
      </Stack>
    </Stack>
  );
}
