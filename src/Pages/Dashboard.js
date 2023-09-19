import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { LoginContainer } from "../StyledComponent/LoginStyle";
import BarChart from "../Components/BarChart";
const Dashboard = () => { // Receive cartItems from Redux state
    const [orderCount, setOrderCount] = useState(0);
    const cartCount = useSelector((state) => state.cart.cartCount);
    useEffect(() => {
        // Retrieve orders from local storage
        const storedOrders = JSON.parse(localStorage.getItem('orders'));
        if (storedOrders) {
            setOrderCount(storedOrders.length);
        }
    }, []);
    return (
        <div className=" container">
            <div className=" row">
                <div className=" col-lg-4">
                    <LoginContainer className=" mt-3 mx-3" width="250px" height="150px">
                        <h3 className=" text-center">Products</h3>
                        <h2 className=" text-center cartNum text-info h1">10</h2>
                    </LoginContainer>
                </div>
                <div className=" col-lg-4">
                    <LoginContainer className=" mt-3 mx-3" width="250px" height="150px">
                        <h3 className=" text-center">Myorders</h3>
                        <h2 className="text-center cartNum text-info h1">{orderCount}</h2>
                    </LoginContainer>
                </div>
                <div className=" col-lg-4">
                    <LoginContainer className=" mt-3 mx-3" width="250px" height="150px">
                        <h3 className=" text-center">Cart</h3>
                        <h2 className=" text-center cartNum text-info h1">{cartCount}</h2>
                    </LoginContainer>
                </div>
            </div>
            <div className=" row">
                <div className=" col-lg-12">
                    <h2 className=" text-center mt-5 ">Chart</h2>
                    <div className=" row">
                        <div className=" col-lg-12 h-75 ">
                            <BarChart products={10}
                                cart={cartCount}
                                orders={orderCount}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard
