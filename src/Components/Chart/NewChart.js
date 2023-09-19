import { Chart } from 'react-charts';
import React from 'react';

const MyChart = ({ products, cart, orders }) => {
  console.log(products, cart,orders)
   const data = [
     {
       label: 'Products',
       data: [
         {
           yaxis: products,
           xaxis:"Products"
         },
         {
          yaxis: cart,
          xaxis:"Cart"
        },
        {
          yaxis: orders,
          xaxis:"My orders"
        },
       ],
     },
   ];
 
   const primaryAxis = React.useMemo(
     () => ({
       getValue: datum => datum.xaxis,
     }),
     []
   );
 
   const secondaryAxes = React.useMemo(
     () => [
       {
         getValue: datum => datum.yaxis,
         elementType: 'line',
       },
     ],
     []
   );
 
   return (
     <Chart
       options={{
         data,
         primaryAxis,
         secondaryAxes,
       }}
     />
   );
}

export default MyChart
