import React, { useState, useEffect } from "react";
import Customtoast from "../Components/Customtoast";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showToast, setShowToast] = useState(false); // state for toast

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            setCartItems(storedCart);
        }
    }, [cartItems]);

    const handleQuantityChange = (index, newQuantity) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity = newQuantity;
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
    const handleToastClose = () => {
        setShowToast(false);
    }

    const handleRemoveItem = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setShowToast(true); // Show toast on item removal
    };

    if (cartItems.length === 0) {
        return <div className="container">Your cart is empty</div>;
    }

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.product_price_inr * item.quantity, 0);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th className="text-center" scope="col">Product List</th>
                                <th className="text-center" scope="col">Price</th>
                                <th className="text-center" scope="col">Quantity</th>
                                <th className="text-center" scope="col">Total</th>
                                <th className="text-center" scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="text-center" >{item.product_name}</td>
                                    <td className="text-center" >{item.product_price_inr}</td>
                                    <td className="text-center" >
                                        <div className="input-group">
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={() => handleQuantityChange(index, item.quantity - 1)}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={item.quantity || 1}
                                                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                                            />

                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={() => handleQuantityChange(index, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="text-center" >{item.quantity ? item.product_price_inr * item.quantity : item.product_price_inr}</td>
                                    <td className="text-center" >
                                        <i
                                            className="fa-solid fa-trash"
                                            style={{ color: "#ff000d", cursor: "pointer" }}
                                            onClick={() => handleRemoveItem(index)}
                                        ></i>{" "}
                                        Remove
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <h4>Total: {calculateTotal()} INR</h4>
                </div>
            </div>
            {showToast && (
                <Customtoast
                    show={showToast}
                    message="Product is removed"
                    color="danger"
                    onClose={handleToastClose}
                />
            )}
        </div>
    );
};

export default Cart;
