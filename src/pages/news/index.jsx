import { Divider, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import * as React from "react";
import { AddNewBtn, ReloadBtn } from "../../components/components";
import { textFieldStyle } from "../../style";
import { useNavigate } from "react-router-dom";
import { router } from "../../constants";

export default function News() {
  const [newsData, setNewsData] = React.useState();
  const navigate = useNavigate();
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <AddNewBtn
          _title={"ເພີ່ມຂ່າວສານ"}
          _onClick={() => {
            navigate(`${router.NEWS}/add-news`);
          }}
        />
        <ReloadBtn _onClick={() => {}} />
      </Stack>
      <Divider />
      <Stack
        direction={"row"}
        alignSelf={"end"}
        spacing={1}
        alignItems="center"
      >
        <label>ຄົ້ນຫາ:</label>
        <TextField
          placeholder="id"
          sx={{ ...textFieldStyle, width: "300px" }}
        />
      </Stack>
      <div className="table">
        <table>
          <thead
            style={{
              backgroundColor: "#BDBDBD",
            }}
          >
            <th>No.</th>
            <th>ຫົວຂໍ້</th>
            <th>ປະເພດ</th>
            <th>ເນື້ອໃນ</th>
            <th>ເຖິງ</th>
            <th>ວັນທີ່ສ້າງລາຍການ</th>
            <th>ກໍານົດຮອດວັນທີ່</th>
            <th>Action</th>
          </thead>
          <tbody>
            {newsData?.map((val, index) => {
              return (
                <tr key={index}>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </Stack>
  );
}
