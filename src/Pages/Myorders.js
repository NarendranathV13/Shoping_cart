import React from "react";
import { useSelector } from 'react-redux';
const Myorders = () => {
    const orders = useSelector((state) => state.cart.orders);
    if (orders.length === 0) {//empty order representation
        return (
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <img src="https://cdn.dribbble.com/users/2059463/screenshots/4828452/polizas_gif.gif" alt="Empty orders" />
            </div>
        );
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 mt-3">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="text-center h3" scope="col">
                                    Product List
                                </th>
                                <th className="text-center h3" scope="col">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index} >
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