
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
        label: 'Dashboard',
        backgroundColor: ['blue', 'green', 'red'],
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
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
