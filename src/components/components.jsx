import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import * as react from "react";

import AddIcon from "@mui/icons-material/Add";
import CachedIcon from "@mui/icons-material/Cached";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SearchIcon from "@mui/icons-material/Search";
import { btnStyle } from "../style";
import { ConfirmContext } from "../contexts/confirDialog.provider";
import { Stack } from "@mui/system";
import PrintIcon from "@mui/icons-material/Print";

export const IconDelete = () => {
  return (
    <>
      <DeleteIcon />
    </>
  );
};
export const IconEdit = () => {
  return (
    <>
      <BorderColorIcon />
    </>
  );
};

export const AddNewBtn = (props) => {
  const { _title, _onClick } = props;
  return (
    <Button
      sx={{ ...btnStyle }}
      startIcon={<AddIcon />}
      onClick={_onClick}
      variant="contained"
      color="primary"
      size="small"
      disableElevation
    >
      {_title}
    </Button>
  );
};
export const DenyBtn = (props) => {
  const { _title = "ຍົກເລີກ", _onClick } = props;
  return (
    <Button
      sx={{ ...btnStyle }}
      // startIcon={<DeleteIcon />}
      onClick={_onClick}
      variant="contained"
      color="error"
      size="small"
      disableElevation
    >
      {_title}
    </Button>
  );
};
export const OkBtn = (props) => {
  const { _title = "ຕົກລົງ", _onClick } = props;
  return (
    <Button
      sx={{ ...btnStyle }}
      // startIcon={<DeleteIcon />}
      onClick={_onClick}
      variant="contained"
      color="success"
      size="small"
      disableElevation
    >
      {_title}
    </Button>
  );
};

export const ReloadBtn = (props) => {
  const { _title = "reload", _onClick } = props;
  return (
    <Button
      sx={{ ...btnStyle }}
      startIcon={<CachedIcon />}
      onClick={_onClick}
      variant="outlined"
      color="secondary"
      size="small"
      disableElevation
    >
      {_title}
    </Button>
  );
};
export const PrintBtn = (props) => {
  const { _title = "Export", _onClick } = props;
  return (
    <Button
      sx={{ ...btnStyle }}
      startIcon={<PrintIcon />}
      onClick={_onClick}
      variant="contained"
      color="info"
      size="small"
      disableElevation
    >
      {_title}
    </Button>
  );
};

export const ReloadArea = () => {
  return (
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
  );
};

export const ConfirmDialog = (props) => {
  const { _onOk, popUpStatus } = props;
  const { confirmPopUp, setConfirmPopUp } = react.useContext(ConfirmContext);
  return (
    <Dialog open={confirmPopUp} onClose={() => setConfirmPopUp(false)}>
      <DialogTitle sx={{ fontFamily: "Noto sans lao" }}>ຢືນຢັນ</DialogTitle>
      <DialogContent>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde, nisi.
        </p>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            ...btnStyle,
          }}
          onClick={() => setConfirmPopUp(false)}
          variant="contained"
          color="error"
          size="small"
          disableElevation
        >
          ຍົກເລີກ
        </Button>
        <Button
          sx={{
            ...btnStyle,
          }}
          onClick={() => {
            _onOk();
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
  );
};

export const Card = (props) => {
  const {
    title = "title",
    value = "0",
    color = "#F8F9FA",
    icon = <AddIcon size="small" />,
  } = props;
  return (
    <div
      className="card"
      style={{
        backgroundColor: color,
        display: "flex",
        flexDirection: "row",
        padding: "20px 20px"
      }}
    >
      <Stack flex={1}>
      {icon}
      </Stack>
      <Stack flex={2}>
        <span>{title}</span>

        <span>{value}</span>
      </Stack>
    </div>
  );
};
