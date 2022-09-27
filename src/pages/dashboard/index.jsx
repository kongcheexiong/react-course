import { Stack } from "@mui/system";
import * as  React from "react";
import { Navigate } from "react-router-dom";
import { instance } from "../../api";
import { Card } from "../../components/components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { Line } from 'react-chartjs-2';
import { format } from "date-fns";

export default function Dashboard() {
  const [data , setData] = React.useState()
  const fetchData = async()=>{
    instance.get("dashboard").then(res =>{
      console.log(res.data)
      setData(res.data)
    }).catch(err =>{
      console.log(err)
    })
  }

  React.useEffect(()=>{
    fetchData()
  },[])
  const labels = data?.countUserGroupByDate.map((val)=>{
    return format(new Date(val._id), "dd/MM/yyyy")
  });

  


  const datas = {
    labels,
    datasets: [
      {
        label: 'News',
        data: data?.countNewsGroupByDate.map((val)=>{
          return val.distinctCount
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Users',
        data: data?.countUserGroupByDate.map((val)=>{
          return val.distinctCount
        }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  
  return (
    <Stack spacing={2}>
      <Stack direction={"row"} justifyContent="space-between">
        <Card title={"ປະເພດຜູ້ໃຊ້"} value={data?.userType?.length?? "?"} />
        <Card title={"ຜູ້ໃຊ້"} value={data?.user?.length?? "?"} />
        <Card title={"ປະເພດຂ່າວສານ"} value={data?.newsCate?.length?? "?"} />
        <Card title={"ຂ່າວສານ"} value={data?.news?.length?? "?"} />
      </Stack>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          columnGap: "20px",
          // height: "350px",
        
        }}
      >
        <div style={{ width: "60%", backgroundColor: "#F8F9FA", borderRadius: "20px" }}>
          <Line data={datas} options={options}/>
        </div>
        <div style={{  width: "40%",backgroundColor: "#F8F9FA", borderRadius: "20px" }}></div>
      </div>
    </Stack>
  );
}
