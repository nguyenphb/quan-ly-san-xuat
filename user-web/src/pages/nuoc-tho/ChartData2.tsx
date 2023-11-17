import React from 'react';
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
import { Line } from 'react-chartjs-2';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  elements: {
    point: {
      radius: 0
    },
    line: {
      borderWidth: 1
    }
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Độ đục nguồn lắng',
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  }
};


const ChartData2 = () => {
  const now = moment().unix();
  // const labels = [moment().add(), 'February', 'March', 'April', 'May', 'June', 'July'];
  let labels: any = [];

  for (let i = 20; i > 0; i--) {
    labels.push(moment().add(-15 * i, 'minute').format("HH:mm"))
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Nước thô',
        data: labels.map(() => Math.random() * 10),
        yAxisID: 'y',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 255, 132, 0.5)',
      },
      {
        label: 'Lắng 1',
        data: labels.map(() => Math.random() * 10),
        yAxisID: 'y1',
        borderColor: 'rgb(255, 99, 255)',
        backgroundColor: 'rgba(255, 99, 255, 0.5)',
      },
      {
        label: 'Lắng 2',
        data: labels.map(() => Math.random() * 10),
        yAxisID: 'y1',
        borderColor: 'rgb(0, 99, 132)',
        backgroundColor: 'rgba(0, 99, 132, 0.5)',
      }
    ],
  };
  return (
    <>
      <Line options={options} data={data} />
    </>
  )
}

export default ChartData2;
