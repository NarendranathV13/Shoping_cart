import React from "react";
import { useSelector } from 'react-redux';
const Myorders = () => {
    const orders = useSelector((state) => state.cart.orders);
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th className="text-center" scope="col">
                                    Product List
                                </th>
                                <th className="text-center" scope="col">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td className="text-center">{order.product_name}</td>
                                    <td className="text-center">{order.product_price_inr}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Myorders