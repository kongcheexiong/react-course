import { Button } from "@mui/material"

import React from 'react'
import AddIcon from "@mui/icons-material/Add";
import CachedIcon from "@mui/icons-material/Cached";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SearchIcon from "@mui/icons-material/Search";
import { btnStyle } from "../style";

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
