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


export const LineGraph = (props)=>{
    const {labelsData , valueData, title, color, backgroundColor, titleDisplay=false} = props
      const datas = {
        labels: labelsData,
        datasets: [
          {
            label: title,
            data: valueData,
            borderColor: color,
            backgroundColor: backgroundColor ,
          },
        ],
      };
      const options = {
        responsive: true,
        plugins: {
          title: {
            display: titleDisplay,
            text: 'Chart.js Line Chart',
          },
        },
      };
    
    return <Line data={datas} options={options}/>
}