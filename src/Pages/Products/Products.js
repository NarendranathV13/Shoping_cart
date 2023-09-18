import React, { useState, useEffect } from "react";
import { addToCart, addBuyNow } from "../../Redux/cartSlice";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import ProductNav from "../../Components/ProductComponents/ProductNav";
import "../Products/style.css"
import Spinner from "../../Components/Spinner";
import Button from "../../Components/Button";
import Customtoast from "../../Components/Customtoast.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductModal from "../../Components/ProductComponents/ProductModal";


const Products = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
const [toastColor, setToastColor] = useState('');

    useEffect(() => {
        axios.get('https://64db5089593f57e435b0c522.mockapi.io/products')
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
        handleShowToast(true, 'success', 'Order placed successfully'); // Updated line
    };

    return (
        <div className="container">
            <div className="row mt-2">
                <div className="col-lg-12">
                <ProductNav onSearch={handleSearch} onSort={sortProducts} />
                </div>
            </div>
            <div className="row">
                {/* Spinner */}
                {loading && <Spinner />}
                {filteredProducts.map((product) => (
                    <div className="col-lg-4 " key={product.id}>
                        <div
                            className="card  mt-2 mb-2 mx-5 shadow-lg rounded-5 custom-card"
                            style={{ width: "20rem" }}
                        >
                            <img
                                src={product.image_url}
                                className="card-img-top rounded-5"
                                alt="..."
                                onClick={() => handleOpenModal(product)}
                                data-bs-toggle="modal" data-bs-target="#productModal"
                            />

                            <div className="card-body">
                                <div className="row productsCol">
                                    <div className="col">
                                        <h6 className="card-title">Name :</h6>
                                    </div>
                                    <div className="col">
                                        <p className="product_name">{product.product_name}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <h6 className="card-text">Price :</h6>
                                    </div>
                                    <div className="col">
                                        <p className="product_price">{product.product_price_inr}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <h6 className="card-text">Description :</h6>
                                    </div>
                                    <div className="col">
                                        <p className="short_description">{product.short_description}</p>
                                    </div>
                                </div>
                                <Button
                                    text="Add to cart"
                                    color="warning"
                                    onClick={() => handleAddToCart(product)}
                                />
                                <Button
                                    text="Buy now"
                                    color="success"
                                    onClick={() => handleBuyNow(product)}
                                />

                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* modal for product display */}
                    <ProductModal   selectedProduct={selectedProduct}
                showModal={showModal} />
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