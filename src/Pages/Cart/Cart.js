import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Customtoast from "../../Components/Customtoast";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, addOrder } from "../../Redux/cartSlice";
import Button from "../../Components/Button";
import "../Cart/style.css"

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastColor, setToastColor] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemoveItem = (index) => {
        const updatedCart = [...cartItems];
        const itemToRemove = updatedCart[index];
        updatedCart.splice(index, 1);
        dispatch(removeFromCart(itemToRemove));
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        handleShowToast(true, 'danger','Product is removed');
    };
    
    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <img src="https://cdn.dribbble.com/users/5107895/screenshots/14532312/media/a7e6c2e9333d0989e3a54c95dd8321d7.gif" alt="Empty cart GIF" className="w-80 h-80 object-cover rounded-3xl shadow-lg mb-6" />
                <h2 className="text-2xl font-bold text-gray-700">Your Cart is Empty</h2>
                <p className="text-gray-500 mt-2">Looks like you haven't added anything to your cart yet.</p>
                <Button text="Start Shopping" color="primary" onClick={() => navigate('/Products')} className="mt-6" />
            </div>
        );
    }
    
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.product_price_inr * (parseInt(item.quantity) || 1), 0);
    };
    
    const handlePlaceOrder = () => {
        if (cartItems.length > 0) {
            dispatch(addOrder({ items: cartItems, isCartCheckout: true }));
            handleShowToast(true, 'success', 'Order placed successfully!');
            setTimeout(() => {
                navigate('/Myorders');
            }, 1000);
        }
    };

    const handleQuantityChange = (index, amount) => {
        const updatedCart = [...cartItems];
        const updatedItem = {
            ...updatedCart[index],
            quantity: Math.max((updatedCart[index].quantity || 1) + amount, 1)
        };
        updatedCart[index] = updatedItem;
        dispatch(updateQuantity({ prd_id: updatedItem.prd_id, quantity: updatedItem.quantity }));
        localStorage.setItem('cart', JSON.stringify(updatedCart));
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
        <div className="w-full px-6 md:px-10 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">Shopping Cart</h1>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product List</th>
                                <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                                <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                                <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {cartItems.map((item, index) => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors duration-150">
                                    <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-gray-900">
                                        {item.product_name}
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-600 text-center">
                                        ₹{item.product_price_inr}
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-center">
                                        <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
                                            <button
                                                className="w-8 h-8 rounded-md bg-white shadow-sm flex justify-center items-center text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                                onClick={() => handleQuantityChange(index, -1)}
                                            >
                                                <i className="fa-solid fa-minus text-xs"></i>
                                            </button>
                                            <span className="w-12 text-center font-semibold text-gray-800">
                                                {item.quantity || 1}
                                            </span>
                                            <button
                                                className="w-8 h-8 rounded-md bg-white shadow-sm flex justify-center items-center text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                                onClick={() => handleQuantityChange(index, 1)}
                                            >
                                                <i className="fa-solid fa-plus text-xs"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-indigo-600 text-right">
                                        ₹{item.quantity ? item.product_price_inr * item.quantity : item.product_price_inr}
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-center">
                                        <button
                                            onClick={() => handleRemoveItem(index)}
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors inline-flex items-center justify-center group"
                                            title="Remove item"
                                        >
                                            <i className="fa-solid fa-trash-can group-hover:scale-110 transition-transform"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-inner flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Order Total</p>
                    <h4 className="text-3xl font-extrabold text-gray-900">₹{calculateTotal()}</h4>
                </div>
                <div className="flex space-x-3">
                    <Button text="Continue Shopping" color="light" onClick={() => navigate('/Products')} />
                    <Button text="Place Order" color="success" onClick={handlePlaceOrder} className="!px-6 py-3 shadow-md hover:shadow-lg" />
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
