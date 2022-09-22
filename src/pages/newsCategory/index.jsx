import { TextFields } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { format, set } from "date-fns";
import * as React from "react";
import { instance } from "../../api";
import {
  AddNewBtn,
  ConfirmDialog,
  DenyBtn,
  IconDelete,
  IconEdit,
  OkBtn,
  ReloadArea,
  ReloadBtn,
} from "../../components/components";
import { server_url } from "../../constants";
import { ConfirmContext } from "../../contexts/confirDialog.provider";
import { textFieldStyle } from "../../style";

export default function NewsCategory() {
  const inputRef = React.useRef(null);
  const [newsCateData, setNewCateData] = React.useState();

  const [popUp, setPopup] = React.useState(false);
  const [newType, setNewType] = React.useState("");

  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [err, setErr] = React.useState(false);

  const { confirmPopUp, setConfirmPopUp } = React.useContext(ConfirmContext);

  const [deletedId, setDeletedId] = React.useState("");
  const [updatedData, setUpdatedData] = React.useState(null);

  const [search, setSearch] = React.useState("");
  const createType = async () => {
    if (newType == "") {
      alert("input news Category");
      return;
    }
    await instance
      .post(`news-cate/insert`, {
        typeName: newType,
      })
      .then((res) => {
        console.log(res.data);
        setValue(value + 1);
        setPopup(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getData = async () => {
    setLoading(true);
    setSuccess(false);
    setErr(false);
    await instance
      .get(`news-cate/all`)
      .then((res) => {
        setLoading(false);
        setSuccess(true);
        setErr(false);
        setNewCateData(res.data?.data);
      })
      .catch((err) => {
        setErr(true);
        setLoading(false);
        setSuccess(false);
        console.log(err);
      });
  };
  const deleteData = async () => {
    await instance
      .delete(`news-cate/delete/id/${deletedId}`)
      .then((res) => {
        console.log(res.data);
        setValue(value + 1);
        setConfirmPopUp(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateNewsData = async () => {
    await instance
      .put("news-cate/update", {
        id: updatedData?._id,
        name: updatedData?.typeName,
      })
      .then((res) => {
        console.log(res);
        setPopup(false);
        setValue(value + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchData = async () => {
    setLoading(true);
    setSuccess(false);
    setErr(false);
    await instance
      .get(`news-cate/type-name/${search}`)
      .then((res) => {
        setLoading(false);
        setSuccess(true);
        setErr(false);
        setNewCateData(res.data?.data);
      })
      .catch((err) => {
        setErr(true);
        setLoading(false);
        setSuccess(false);
        console.log(err);
      });
  };

  React.useEffect(() => {
    getData();
  }, [value]);

  return (
    <Stack spacing={2}>
      <ConfirmDialog
        _onOk={() => {
          deleteData();
        }}
      />
      <Dialog
        open={popUp}
        onClose={() => {
          setUpdatedData(null);
          setPopup(false);
        }}
      >
        <DialogTitle sx={{ fontFamily: "Noto sans lao" }}>
          {updatedData == null ? "ເພີ່ມປະເພດຂ່າວສານ" : "ແກ້ໄຂປະເພດຂ່າວສານ"}
        </DialogTitle>
        <DialogContent>
          <TextField
            inputRef={inputRef}
            defaultValue={updatedData == null ? "" : updatedData.typeName}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (updatedData != null) {
                  updateNewsData();
                  setUpdatedData(null)
                  return;
                }
                createType();
              }
            }}
            onChange={(e) => {
              if (updatedData) {
                setUpdatedData({ ...updatedData, typeName: e.target.value });
              } else {
                setNewType(e.target.value);
              }
            }}
            sx={{ ...textFieldStyle, width: "400px" }}
            placeholder="ຊື່ປະເພດຂ່າວສານ"
          />
        </DialogContent>
        <DialogActions>
          <OkBtn
            _onClick={() => {
              if (updatedData != null) {
                updateNewsData();
                setUpdatedData(null)
                return;
              }
              createType();
            }}
          />
          <DenyBtn
            _onClick={() => {
              setUpdatedData(null);
              setPopup(false);
            }}
          />
        </DialogActions>
      </Dialog>

      {/**header */}
      <Stack direction="row" spacing={2}>
        <AddNewBtn
          _title={"ເພີ່ມປະເພດຂ່າວສານ"}
          _onClick={async () => {
            await setPopup(true);
            await inputRef.current.focus();
          }}
        />
        <ReloadBtn _onClick={() => setValue(value + 1)} />
      </Stack>
      <Divider />
      {/**search */}
      <Stack spacing={1} direction="row" alignSelf={"end"} alignItems="center">
        <label>ຄົ້ນຫາ:</label>
        <TextField
          sx={{ ...textFieldStyle }}
          onChange={async (e) => {
            await setSearch(e.target.value);
            if (e.target.value == "") {
              getData();
              return;
            }
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              console.log(e.key);
              if (search == "") {
                getData();
                return;
              }
              searchData();
            }
          }}
        />
      </Stack>
      {/**table */}
      {loading ? (
        <ReloadArea />
      ) : err ? (
        <h1>error</h1>
      ) : success ? (
        <div
          style={{
            border: "1px solid #F8F9FA",
            borderRadius: "5px",
            padding: "5px",
            marginBottom: "50px",
            display: 'flex',
            flexDirection: "column",
            rowGap: "5px"
          }}
        >
          <span>Total: { newsCateData ? `${newsCateData?.length} rows` : `...`}  </span>
          <table>
            <thead
              style={{
                backgroundColor: "#BDBDBD",
              }}
            >
              <th>ລໍາດັບ</th>
              <th>ລະຫັດ</th>
              <th>ຊື່</th>
              <th>ວັນທີ່ສ້າງລາຍການ</th>
              <th>Action</th>
            </thead>
            <tbody>
              {newsCateData?.map((val, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{val._id}</td>
                    <td>{val.typeName}</td>
                    <td>{format(new Date(val.createAt), "dd/MM/yyyy")}</td>
                    <td>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setUpdatedData(val);
                          setPopup(true);
                        }}
                      >
                        <IconEdit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => {
                          setDeletedId(val._id);

                          setConfirmPopUp(true);
                        }}
                      >
                        <IconDelete />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
      ) : null}
    </Stack>
  );
}
