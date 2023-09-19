
import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)
const BarChart = ({ products, cart, orders }) => {
  const data = {
    labels: ['Products', 'Cart', 'My Orders'],
    datasets: [
      {
        label: 'Count',
        backgroundColor: [ 'rgba(54, 162, 235, 0.6)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(201, 203, 207, 0.8)'],
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: [products, cart, orders],
      },
    ],
  };
  const options = {
 
  };
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};
export default BarChart;
