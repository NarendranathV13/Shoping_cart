import React from "react";
import { useSelector } from 'react-redux';

const Myorders = () => {
    const orders = useSelector((state) => state.cart.orders);
    
    if (orders.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <img src="https://cdn.dribbble.com/users/2059463/screenshots/4828452/polizas_gif.gif" alt="Empty orders" className="w-80 h-80 object-cover rounded-3xl shadow-lg mb-6" />
                <h2 className="text-2xl font-bold text-gray-700">No orders yet</h2>
                <p className="text-gray-500 mt-2">Looks like you haven't placed any orders.</p>
            </div>
        );
    }
    
    return (
        <div className="w-full px-6 md:px-10 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">Order History</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Product Name
                            </th>
                            <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Price (INR)
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order, index) => (
                            <tr key={index} className="hover:bg-indigo-50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {order.product_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600 text-right">
                                    ₹{order.product_price_inr}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Myorders