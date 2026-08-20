import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, addBuyNow } from '../../Redux/cartSlice';
import { fetchProductById } from '../../Api/Endpoints';
import Spinner from '../../Components/Spinner';
import Button from '../../Components/Button';
import Customtoast from '../../Components/Customtoast';
import { Card, CardContent } from '../../Components/ui/card';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastColor, setToastColor] = useState('');

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetchProductById(id)
                .then((response) => {
                    setProduct(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    Swal.fire('Error', 'Failed to fetch product details', 'error');
                    setLoading(false);
                });
        }
    }, [id]);

    const handleShowToast = (show, color, message) => {
        setShowToast(show);
        setToastColor(color);
        setToastMessage(message);
    };

    const handleToastClose = () => {
        setShowToast(false);
    };

    const handleQuantityChange = (type) => {
        if (type === 'decrease' && quantity > 1) {
            setQuantity(quantity - 1);
        } else if (type === 'increase') {
            setQuantity(quantity + 1);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            const productWithQty = { ...product, quantity };
            dispatch(addToCart(productWithQty));
            handleShowToast(true, 'warning', `${product.product_name} added to cart`);
        }
    };

    const handleBuyNow = () => {
        if (product) {
            const productWithQty = { ...product, quantity };
            dispatch(addBuyNow(productWithQty));
            handleShowToast(true, 'success', 'Order placed successfully!');
            setTimeout(() => {
                navigate('/Myorders');
            }, 1000);
        }
    };

    if (loading) {
        return (
            <div className="w-full px-6 py-12 flex justify-center items-center">
                <Spinner />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="w-full px-6 py-12 text-center">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Product Not Found</h2>
                <Button
                    text="Back to Products"
                    color="primary"
                    onClick={() => navigate('/Products')}
                />
            </div>
        );
    }

    return (
        <div className="w-full px-6 md:px-12 py-8 max-w-6xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <button
                    onClick={() => navigate('/Products')}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors cursor-pointer"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Back to Products
                </button>
            </div>

            <Card className="shadow-lg border-gray-100 overflow-hidden">
                <CardContent className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {/* Image Section */}
                        <div className="bg-gray-50 rounded-2xl overflow-hidden p-4 flex items-center justify-center border border-gray-100">
                            <img
                                src={product.image_url}
                                alt={product.product_name}
                                className="max-h-[420px] w-full object-contain rounded-xl transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                        {/* Product Info Section */}
                        <div className="flex flex-col h-full justify-between">
                            <div>
                                <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
                                    In Stock
                                </div>
                                <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
                                    {product.product_name}
                                </h1>

                                <p className="text-sm font-medium text-gray-500 mb-4">
                                    {product.short_description}
                                </p>

                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="text-3xl font-black text-indigo-600">
                                        ₹{product.product_price_inr}
                                    </span>
                                    <span className="text-xs text-gray-400 font-normal">
                                        (Inclusive of all taxes)
                                    </span>
                                </div>

                                <div className="border-t border-b border-gray-100 py-4 mb-6">
                                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
                                        Description
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Quantity Selector */}
                                <div className="flex items-center mb-6">
                                    <span className="text-sm font-semibold text-gray-700 mr-4">
                                        Quantity:
                                    </span>
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange('decrease')}
                                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors cursor-pointer"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1 text-sm font-semibold text-gray-800">
                                            {quantity}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange('increase')}
                                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors cursor-pointer"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 mt-4">
                                <Button
                                    text="Buy Now"
                                    color="success"
                                    onClick={handleBuyNow}
                                    className="flex-1 py-3 px-6 text-base font-semibold !mx-0 !mt-0"
                                />
                                <Button
                                    text="Add to Cart"
                                    color="warning"
                                    onClick={handleAddToCart}
                                    className="flex-1 py-3 px-6 text-base font-semibold !mx-0 !mt-0"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

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

export default ProductDetails;
