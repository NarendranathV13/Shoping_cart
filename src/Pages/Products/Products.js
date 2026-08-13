import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart, addBuyNow } from "../../Redux/cartSlice";
import api from "../../ApiService";
import { useDispatch } from 'react-redux';
import ProductNav from "../../Components/ProductComponents/ProductNav";
import "../Products/style.css"
import Spinner from "../../Components/Spinner";
import Button from "../../Components/Button";
import Customtoast from "../../Components/Customtoast.js";
import ProductModal from "../../Components/ProductComponents/ProductModal";

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [toastColor, setToastColor] = useState('');

    useEffect(() => {
        api.get('https://64db5089593f57e435b0c522.mockapi.io/products')
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);
    //for sorting
    const sortProducts = (criteria) => {
        const sorted = [...filteredProducts];
        if (criteria === 'price_asc') {
            sorted.sort((a, b) => a.product_price_inr - b.product_price_inr);
        } else if (criteria === 'price_desc') {
            sorted.sort((a, b) => b.product_price_inr - a.product_price_inr);
        }
        setFilteredProducts(sorted);
    };
    //display the filtered product
    const handleSearch = (searchTerm) => {
        if (searchTerm.trim() === "") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) =>
                product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };
    const handleShowToast = (show, color, message) => {
        setShowToast(show);
        setToastColor(color);
        setToastMessage(message);
    };
    const handleToastClose = () => {
        setShowToast(false);
    };
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        handleShowToast(true, 'warning','Product is added to cart');
    };
    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };
    const handleBuyNow = (product) => {
        dispatch(addBuyNow(product));
        handleShowToast(true, 'success', 'Order placed successfully!');
        setTimeout(() => navigate('/Myorders'), 500);
    };

    return (
        <div className="w-full px-6 md:px-10 py-8">
            <div className="mb-8">
                <ProductNav onSearch={handleSearch} onSort={sortProducts} />
            </div>
            
            {loading ? (
                <Spinner />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div 
                            key={product.id} 
                            className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transform transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col h-full"
                        >
                            {/* <div className="h-48 overflow-hidden cursor-pointer" onClick={() => handleOpenModal(product)}>
                                <img src={product.image_url} alt={product.product_name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                            </div> */}
                            
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate" title={product.product_name}>
                                    {product.product_name}
                                </h3>
                                
                                <p className="text-2xl font-extrabold text-indigo-600 mb-3">
                                    ₹{product.product_price_inr}
                                </p>
                                
                                <p className="text-sm text-gray-500 mb-6 line-clamp-2 flex-1">
                                    {product.short_description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    <Button
                                        text="Buy Now"
                                        color="success"
                                        onClick={() => handleBuyNow(product)}
                                        className="flex-1 py-1.5 px-3 text-sm !mx-0 !mt-0"
                                    />
                                    <Button
                                        text="Add"
                                        color="warning"
                                        onClick={() => handleAddToCart(product)}
                                        className="flex-1 py-1.5 px-3 text-sm !mx-0 !mt-0"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            <ProductModal selectedProduct={selectedProduct} showModal={showModal} onClose={() => setShowModal(false)} />
            
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

export default Products;