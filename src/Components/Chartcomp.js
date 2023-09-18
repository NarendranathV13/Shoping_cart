import React from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';

const Chartcomp = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const numberOfProducts = 10;
  const numberOfCartItems = cartItems.length;

  // Define data for the chart
  const data = {
    labels: ['Products', 'Cart Items'],
    datasets: [
      {
        label: 'Number of Items',
        data: [numberOfProducts, numberOfCartItems],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Define chart options
  const options = {
    scales: {
      yAxis: {
        type: 'linear', // Ensure you use 'linear' for the type
        beginAtZero: true,
        min: 0,
      },
    },
  };
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h2>Number of Products and Cart Items</h2>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Chartcomp;
