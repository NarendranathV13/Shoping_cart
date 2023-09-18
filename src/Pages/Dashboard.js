import React from "react";
import { connect } from 'react-redux'; // Import connect
import { LoginContainer } from "../StyledComponent/LoginStyle";
import Chartcomp from "../Components/Chartcomp"; // Update the import path

const Dashboard = ({ cartItems }) => { // Receive cartItems from Redux state
    const cartCount = cartItems.length; // Calculate the cart count
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
                        <h2 className=" text-center cartNum text-info h1">0</h2>
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
                        <div className=" col-lg-12 ">
                        {/* <Chartcomp numProducts={numProducts} numCartItems={cartCount} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cartItems: state.cart.cartItems // Assuming you have a cart reducer with cartItems
    }
}

export default connect(mapStateToProps)(Dashboard);
