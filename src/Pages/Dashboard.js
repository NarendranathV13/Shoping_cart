import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import BarChart from "../Components/Chart/BarChart"; 

const Dashboard = () => {
    const [orderCount, setOrderCount] = useState(0);
    const cartCount = useSelector((state) => state.cart.cartCount);
    
    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('orders'));
        if (storedOrders) {
            setOrderCount(storedOrders.length);
        }
    }, []);
    
    return (
        <div className="w-full px-6 md:px-10 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Products Card */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white transform transition duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium opacity-90">Total Products</h3>
                        <div className="bg-white/20 p-2 rounded-lg">
                            <i className="fa-solid fa-store text-xl"></i>
                        </div>
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tight">10</h2>
                </div>

                {/* Orders Card */}
                <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-lg p-6 text-white transform transition duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium opacity-90">My Orders</h3>
                        <div className="bg-white/20 p-2 rounded-lg">
                            <i className="fa-solid fa-gift text-xl"></i>
                        </div>
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tight">{orderCount}</h2>
                </div>

                {/* Cart Card */}
                <div className="bg-gradient-to-br from-rose-400 to-orange-500 rounded-2xl shadow-lg p-6 text-white transform transition duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium opacity-90">Items in Cart</h3>
                        <div className="bg-white/20 p-2 rounded-lg">
                            <i className="fa-solid fa-cart-shopping text-xl"></i>
                        </div>
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tight">{cartCount}</h2>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Analytics</h2>
                    <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">Current Stats</span>
                </div>
                <div className="h-96 w-full flex justify-center items-center">
                    <BarChart 
                        products={10}
                        cart={cartCount}
                        orders={orderCount}
                    />
                </div>
            </div>
        </div>
    )
}
export default Dashboard;
