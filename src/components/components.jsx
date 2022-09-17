import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import * as react from "react"

import AddIcon from "@mui/icons-material/Add";
import CachedIcon from "@mui/icons-material/Cached";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SearchIcon from "@mui/icons-material/Search";
import { btnStyle } from "../style";
import { ConfirmContext } from "../contexts/confirDialog.provider";

export const AddNewBtn = (props) => {
  const { _title, _onClick } = props
  return <Button
    sx={{ ...btnStyle }}
    startIcon={<AddIcon />}
    onClick={_onClick}
    variant="contained"
    color="primary"
    size="small"
    disableElevation>
      {_title}

  </Button>
}
export const DenyBtn = (props) => {
  const { _title, _onClick } = props
  return <Button
    sx={{ ...btnStyle }}
    // startIcon={<DeleteIcon />}
    onClick={_onClick}
    variant="contained"
    color="error"
    size="small"
    disableElevation>
      {_title}

  </Button>
}
export const OkBtn = (props) => {
  const { _title, _onClick } = props
  return <Button
    sx={{ ...btnStyle }}
    // startIcon={<DeleteIcon />}
    onClick={_onClick}
    variant="contained"
    color="success"
    size="small"
    disableElevation>
      {_title}

  </Button>
}


export const ReloadBtn = (props) => {
  const { _title = "reload", _onClick } = props
  return <Button
  sx={{ ...btnStyle }}
  startIcon={<CachedIcon />}
  onClick={_onClick}
  variant="outlined"
  color="secondary"
  size="small"
  disableElevation>
    {_title}

</Button>
}

export const ReloadArea = ()=>{
  return <div
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
}

export const ConfirmDialog = (props)=>{
  const {_onOk, popUpStatus} = props
  const { confirmPopUp, setConfirmPopUp } = react.useContext(ConfirmContext)
  return  <Dialog open={confirmPopUp} onClose={() => setConfirmPopUp(false)}>
  <DialogTitle sx={{fontFamily: "Noto sans lao"}}>ຢືນຢັນ</DialogTitle>
  <DialogContent>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde,
      nisi.
    </p>
  </DialogContent>
  <DialogActions>
    <Button
    sx={{
      ...btnStyle
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
      ...btnStyle
    }}
      onClick={() => {
        _onOk()
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

}

