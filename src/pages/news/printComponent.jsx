import { Chip } from "@mui/material";
import { Stack } from "@mui/system";
import { format } from "date-fns";
import React from "react";

export class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);
    // const {newsData} = this.props
    // this.state={
    //     newsData: newsData
    // }
  }

  render() {
    console.log("this.state.===>", this.props);
    return (
      <div>
        {" "}
        
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <h3>ລາຍງານ</h3>
        </div>
        <div
          className="table"
          style={{
            marginRight: "30px",
          }}
        >
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
            </thead>
            <div className="page-break" />
            <tbody>
              {this.props.data?.map((val, index) => {
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
                          return type.typeName + ", ";
                        })}
                      </Stack>
                    </td>
                    <td>
                      {val.body?.length > 10
                        ? val.body.substring(0, 10) + "..."
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
                          return type.typeName + ", ";
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
                        <span>
                          {format(new Date(val.endAt), "dd/MM/yyyy")}{" "}
                        </span>
                      </Stack>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
      </div>
    );
  }
}
