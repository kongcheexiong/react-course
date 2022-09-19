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
import { format } from "date-fns";
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
  const [newsCateData, setNewCateData] = React.useState();

  const [popUp, setPopup] = React.useState(false);
  const [newType, setNewType] = React.useState("");

  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [err, setErr] = React.useState(false);

  const { confirmPopUp, setConfirmPopUp } = React.useContext(ConfirmContext)

  const [deletedId, setDeletedId] = React.useState("")
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
    instance
      .get("news-cate/all")
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
      .delete(`news-cate/deletes`,{
         id: deletedId
      })
      .then((res) => {
        console.log(res.data);
        setValue(value+1)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getData();
  }, [value]);

  return (
    <Stack spacing={2}>
      <ConfirmDialog _onOk={()=>{deleteData()}}/>
      <Dialog open={popUp} onClose={() => setPopup(false)}>
        <DialogTitle sx={{ fontFamily: "Noto sans lao" }}>
          ເພີ່ມປະເພດຂ່າວສານ
        </DialogTitle>
        <DialogContent>
          <TextField
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createType();
              }
            }}
            onChange={(e) => setNewType(e.target.value)}
            sx={{ ...textFieldStyle, width: "400px" }}
            placeholder="ຊື່ປະເພດຂ່າວສານ"
          />
        </DialogContent>
        <DialogActions>
          <OkBtn
            _onClick={() => {
              createType();
            }}
          />
          <DenyBtn _onClick={() => setPopup(false)} />
        </DialogActions>
      </Dialog>

      {/**header */}
      <Stack direction="row" spacing={2}>
        <AddNewBtn
          _title={"ເພີ່ມປະເພດຂ່າວສານ"}
          _onClick={() => setPopup(true)}
        />
        <ReloadBtn _onClick={() => setValue(value + 1)} />
      </Stack>
      <Divider />
      {/**search */}
      <Stack spacing={1} direction="row" alignSelf={"end"} alignItems="center">
        <label>ຄົ້ນຫາ:</label>
        <TextField sx={{ ...textFieldStyle }} />
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
          }}
        >
          <table>
            <thead>
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
                      <IconButton color="primary">
                        <IconEdit />
                      </IconButton>
                      <IconButton color="error" onClick={()=> {
                        setDeletedId(val._id)
                        
                        setConfirmPopUp(true)}}>
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
