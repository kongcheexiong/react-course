import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import * as React from "react";
import {
  AddNewBtn,
  IconDelete,
  IconEdit,
  ReloadBtn,
} from "../../components/components";
import { textFieldStyle } from "../../style";
import { useNavigate } from "react-router-dom";
import { router } from "../../constants";
import { instance } from "../../api";
import { format } from "date-fns";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export default function News() {
  React.useEffect( () => {
    getNews();
  }, []);
  const myWidth = "88%";
  const [newsData, setNewsData] = React.useState();
  const [originalData, setOriginalData] = React.useState();
  const navigate = useNavigate();
  const getNews = async () => {
    try {
      let res = await instance.get(`news/all`);
      await console.log(res?.data.data);
      await setNewsData(res?.data.data);
      await setOriginalData(res?.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const [updatedData, setUpdatedData] = React.useState()
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

            <th>Action</th>
          </thead>
          <tbody>
            {newsData?.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{val.title}</td>
                  <td>
                    <Stack
                      width={"200px"}
                      flexWrap={"wrap"}
                      direction={"row"}
                      spacing={1}
                      rowGap={1}
                    >
                      {val.newsType?.map((type) => {
                        return (
                          <Chip
                            label={type.typeName}
                            color="primary"
                            variant="outlined"
                          />
                        );
                      })}
                    </Stack>
                  </td>
                  <td>
                    {val.body?.length > 10
                      ? (val.body = val.body.substring(0, 10) + "...")
                      : val.body}
                  </td>
                  <td>
                    <Stack
                      width={"200px"}
                      flexWrap={"wrap"}
                      rowGap={1}
                      direction={"row"}
                      spacing={1}
                    >
                      {val.userType?.map((type) => {
                        return <Chip label={type.typeName} />;
                      })}
                    </Stack>
                  </td>
                  <td>
                    {" "}
                    <Stack>
                      <span>
                        {" "}
                        {format(new Date(val.createAt), "dd/MM/yyyy")}
                      </span>
                      <span>{format(new Date(val.endAt), "dd/MM/yyyy")} </span>
                    </Stack>
                  </td>

                  <td>
                    {/* <IconButton color="secondary" onClick={()=>{

                    }}>
                      <RemoveRedEyeIcon/>
                    </IconButton> */}
                    <IconButton color="error">
                      <IconDelete />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        // let data = originalData?.filter((x) =>
                        //   x._id.includes(val._id)
                        // );
                        let data
                        originalData.forEach(element => {
                          // console.log("====>>",originalData );
                          if(element._id = val._id){
                            data = element
                          }
                        });
                        console.log("====>>",newsData );
                        // navigate(`${router.NEWS}/add-news`,{
                        //   state: val
                        // })
                        // setUpdatedData(val)
                      }}
                      color="primary"
                    >
                      <IconEdit />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
      {/* <Dialog fullWidth={true} maxWidth={"md"} open={false} onClose={()=>{}}>
        <DialogTitle></DialogTitle>
        <DialogContent >
         <Stack spacing={2}>
         <Stack  direction={"row"} justifyContent={"space-between"}>
            <label>ຫົວຂໍ້</label>
            <TextField sx={{...textFieldStyle,width:myWidth}} disabled defaultValue={"asdg"}/>

          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <label>ເນື້ອໃນ</label>
            <TextField sx={{...textFieldStyle,width:myWidth}} disabled defaultValue={"asdg"}/>

          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <label>ຜຸູ້ໃຊ້</label>
            <TextField sx={{...textFieldStyle,width:myWidth}} disabled defaultValue={"asdg"}/>

          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <label>ປະເພດຂ່າວສານ</label>
            <TextField sx={{...textFieldStyle,width:myWidth}} disabled defaultValue={"asdg"}/>

          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <label>ກຳນົດຮອດວັນທີ່</label>
            <TextField sx={{...textFieldStyle,width:myWidth}} disabled defaultValue={"asdg"}/>

          </Stack>
         </Stack>

        </DialogContent>
        <DialogActions>
          
        </DialogActions>

      </Dialog> */}
    </Stack>
  );
}
