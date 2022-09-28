import { Stack } from "@mui/system";
import * as React from "react";
import { Navigate } from "react-router-dom";
import { instance } from "../../api";
import { Card } from "../../components/components";
import { format } from "date-fns";
import { LineGraph } from "./graph";

// import { PrintComponent } from "./PrintComponent";
// import { PrintContext } from "../../../context/print.context";
export default function Dashboard() {
  
  const [data, setData] = React.useState();
  const fetchData = async () => {
    instance
      .get("dashboard")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <Stack spacing={2}>
    
      <Stack direction={"row"} justifyContent="space-between">
        <Card  title={"ປະເພດຜູ້ໃຊ້"} value={data?.userType?.length ?? "?"} />
        <Card  title={"ຜູ້ໃຊ້"} value={data?.user?.length ?? "?"} />
        <Card title={"ປະເພດຂ່າວສານ"} value={data?.newsCate?.length ?? "?"} />
        <Card title={"ຂ່າວສານ"} value={data?.news?.length ?? "?"} />
      </Stack>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          gap: "20px",
        }}
      >
        <div
          style={{
            flex: "1",
            backgroundColor: "#F8F9FA",
            borderRadius: "20px",
            padding: "10px",
          }}
        >
          <LineGraph
            labelsData={data?.countUserGroupByDate.map((val) => {
              return format(new Date(val._id), "dd/MM/yyyy");
            })}
            valueData={data?.countUserGroupByDate.map((val) => {
              return val.distinctCount;
            })}
            title="users"
            color={"rgb(255, 99, 132)"}
            backgroundColor="rgba(255, 99, 132, 0.5)"
          />
        </div>
        <div
          style={{
            flex: "1",
            backgroundColor: "#F8F9FA",
            borderRadius: "20px",
            padding: "10px",
          }}
        >
          <LineGraph
            labelsData={data?.countNewsGroupByDate.map((val) => {
              return format(new Date(val._id), "dd/MM/yyyy");
            })}
            valueData={data?.countNewsGroupByDate.map((val) => {
              return val.distinctCount;
            })}
            title="news"
            color={"#13AA52"}
            backgroundColor="#00ED64"
          />
        </div>
      </div>
    </Stack>
  );
}
