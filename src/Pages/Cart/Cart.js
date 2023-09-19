import React, { useState, useEffect } from "react";
import Customtoast from "../../Components/Customtoast";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../Redux/cartSlice";
import Button from "../../Components/Button";
import Swal from 'sweetalert2'; // Import SweetAlert
import "../Cart/style.css"
import { addOrder,updateQuantity } from "../../Redux/cartSlice";
const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [showToast, setShowToast] = useState(false); // state for toast
    const [toastMessage, setToastMessage] = useState('');
    const [toastColor, setToastColor] = useState('');
    const dispatch = useDispatch();
    const handleRemoveItem = (index) => {
        const updatedCart = [...cartItems];
        const itemToRemove = updatedCart[index];
        updatedCart.splice(index, 1); // Remove item from the array
        dispatch(removeFromCart(itemToRemove)); // Dispatch action to update Redux store
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
        handleShowToast(true, 'danger','Product is removed');
    };
    if (cartItems.length === 0) {
        return (
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <img src="https://cdn.dribbble.com/users/5107895/screenshots/14532312/media/a7e6c2e9333d0989e3a54c95dd8321d7.gif" alt="Empty cart GIF" />
            </div>
        );
    }
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.product_price_inr * (parseInt(item.quantity) || 1), 0);
    };
    const handlePlaceOrder = () => {
        cartItems.forEach(item => {
            dispatch(addOrder(item)); // Dispatch addOrder action for each item
        });
        localStorage.removeItem('cart');
        Swal.fire({
            icon: 'success',
            title: 'Order placed successfully!',
            timer: 3000,
            showConfirmButton: true
        });
    };

    const handleQuantityChange = (index, amount) => {
        const updatedCart = [...cartItems];
        const updatedItem = {
            ...updatedCart[index],
            quantity: Math.max((updatedCart[index].quantity || 1) + amount, 1)
        };
        updatedCart[index] = updatedItem;
        dispatch(updateQuantity({ prd_id: updatedItem.prd_id, quantity: updatedItem.quantity }));// updating the quantity
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
    };
        const handleShowToast = (show, color, message) => {
        setShowToast(show);
        setToastColor(color);
        setToastMessage(message);
    };
    const handleToastClose = () => {
        setShowToast(false);
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
                                                className="btn btn-outline-secondary sub"
                                                type="button"
                                                onClick={() => handleQuantityChange(index, -1)}
                                               
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                className="form-control quantVal"
                                                value={item.quantity || 1}
                                                
                                            />

                                            <button
                                                className="btn btn-outline-secondary add"
                                                type="button"
                                                onClick={() => handleQuantityChange(index, 1)}
            
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
            <div className="bg-white p-3 cart-footer">
                <div className="row">
                    <div className="col-lg-4 d-flex justify-content-end">
                        <h4>Total: {calculateTotal()} INR</h4>
                    </div>
                    <div className="col-lg-8 d-flex justify-content-end">
                        <Button text="Cancel" color="danger" onClick={() => console.log("Cancel clicked")} />
                        <Button text="Place Order" color="success" onClick={handlePlaceOrder} />
                    </div>
                </div>
            </div>
            {showToast && (
                <Customtoast
                    show={showToast}
                    message={toastMessage}
                    color={toastColor}
                    onClose={handleToastClose}
                />
            )}
        </div>
    );
};

export default Cart;
