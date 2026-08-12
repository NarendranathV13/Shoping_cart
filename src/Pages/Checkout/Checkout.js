import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import api from '../../ApiService';
import Button from '../../Components/Button';
import Spinner from '../../Components/Spinner';
import Customtoast from '../../Components/Customtoast';
import Country from '../../Api/Country';
import States from '../../Api/States';
import Cities from '../../Api/Cities';
import { addOrder } from '../../Redux/cartSlice';
import './style.css';

const CheckoutSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    address: Yup.string().required('Shipping address is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.string().required('Zip code is required'),
    paymentMethod: Yup.string().required('Payment method is required'),
});

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastColor, setToastColor] = useState('');

    const cartItems = useSelector((state) => state.cart.cartItems);
    const checkoutItem = useSelector((state) => state.cart.checkoutItem);

    const isDirectBuyNow = Boolean(checkoutItem);
    const itemsToCheckout = isDirectBuyNow ? [checkoutItem] : cartItems;

    const calculateTotal = () => {
        return itemsToCheckout.reduce((total, item) => {
            const qty = parseInt(item.quantity) || 1;
            const price = parseFloat(item.product_price_inr) || 0;
            return total + price * qty;
        }, 0);
    };

    const handleShowToast = (show, color, message) => {
        setShowToast(show);
        setToastColor(color);
        setToastMessage(message);
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            country: '',
            state: '',
            city: '',
            zipCode: '',
            paymentMethod: 'card',
        },
        validationSchema: CheckoutSchema,
        onSubmit: async (values) => {
            if (itemsToCheckout.length === 0) {
                handleShowToast(true, 'danger', 'No items selected for checkout');
                return;
            }
            setLoading(true);
            const totalAmount = calculateTotal();
            const orderPayload = {
                items: itemsToCheckout,
                totalAmount,
                shippingAddress: values,
                isCartCheckout: !isDirectBuyNow,
                createdAt: new Date().toISOString(),
            };

            try {
                // Centralized ApiService request without swallow
                await api.post('https://64db5089593f57e435b0c522.mockapi.io/orders', orderPayload);
                
                // Atomic Redux dispatch
                dispatch(addOrder({
                    items: itemsToCheckout,
                    isCartCheckout: !isDirectBuyNow,
                    shippingDetails: values,
                    totalAmount,
                }));

                await Swal.fire({
                    icon: 'success',
                    title: 'Order Placed Successfully!',
                    text: 'Your order has been processed and saved.',
                    timer: 2500,
                    showConfirmButton: true,
                });

                navigate('/Myorders');
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Checkout Failed',
                    text: error?.response?.data?.message || error?.message || 'Failed to place order. Please try again.',
                });
            } finally {
                setLoading(false);
            }
        },
    });

    if (itemsToCheckout.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <div className="card p-5 shadow-sm">
                    <h3>No Items to Checkout</h3>
                    <p className="text-muted">Please add products to your cart or select "Buy Now" on a product card.</p>
                    <div className="mt-3">
                        <Button text="Browse Products" color="primary" onClick={() => navigate('/Products')} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-4 checkout-container">
            <div className="row g-4">
                {/* Checkout Form */}
                <div className="col-lg-7">
                    <div className="card checkout-card p-4">
                        <div className="checkout-header mb-4">
                            <h3 className="fw-bold mb-1">Checkout</h3>
                            <p className="text-muted mb-0">Fill in your shipping and payment information</p>
                        </div>

                        <form onSubmit={formik.handleSubmit}>
                            <h5 className="mb-3 text-secondary">Shipping Address</h5>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">First Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
                                        placeholder="John"
                                        {...formik.getFieldProps('firstName')}
                                    />
                                    {formik.touched.firstName && formik.errors.firstName && (
                                        <div className="invalid-feedback">{formik.errors.firstName}</div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Last Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
                                        placeholder="Doe"
                                        {...formik.getFieldProps('lastName')}
                                    />
                                    {formik.touched.lastName && formik.errors.lastName && (
                                        <div className="invalid-feedback">{formik.errors.lastName}</div>
                                    )}
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-semibold">Email Address</label>
                                    <input
                                        type="email"
                                        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                        placeholder="john.doe@example.com"
                                        {...formik.getFieldProps('email')}
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <div className="invalid-feedback">{formik.errors.email}</div>
                                    )}
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-semibold">Street Address</label>
                                    <input
                                        type="text"
                                        className={`form-control ${formik.touched.address && formik.errors.address ? 'is-invalid' : ''}`}
                                        placeholder="123 Main St, Suite 100"
                                        {...formik.getFieldProps('address')}
                                    />
                                    {formik.touched.address && formik.errors.address && (
                                        <div className="invalid-feedback">{formik.errors.address}</div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Country</label>
                                    <input
                                        type="text"
                                        list="datalistOptions"
                                        className={`form-control ${formik.touched.country && formik.errors.country ? 'is-invalid' : ''}`}
                                        placeholder="Select Country"
                                        {...formik.getFieldProps('country')}
                                    />
                                    <Country apiLink="https://64db5089593f57e435b0c522.mockapi.io/country" />
                                    {formik.touched.country && formik.errors.country && (
                                        <div className="invalid-feedback">{formik.errors.country}</div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">State</label>
                                    <input
                                        type="text"
                                        list="Statelist"
                                        className={`form-control ${formik.touched.state && formik.errors.state ? 'is-invalid' : ''}`}
                                        placeholder="Select State"
                                        {...formik.getFieldProps('state')}
                                    />
                                    <States apiLink="https://64db5089593f57e435b0c522.mockapi.io/state" />
                                    {formik.touched.state && formik.errors.state && (
                                        <div className="invalid-feedback">{formik.errors.state}</div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">City</label>
                                    <input
                                        type="text"
                                        list="Citylist"
                                        className={`form-control ${formik.touched.city && formik.errors.city ? 'is-invalid' : ''}`}
                                        placeholder="Select City"
                                        {...formik.getFieldProps('city')}
                                    />
                                    <Cities apiLink="https://64db5089593f57e435b0c522.mockapi.io/city" />
                                    {formik.touched.city && formik.errors.city && (
                                        <div className="invalid-feedback">{formik.errors.city}</div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Zip Code</label>
                                    <input
                                        type="text"
                                        className={`form-control ${formik.touched.zipCode && formik.errors.zipCode ? 'is-invalid' : ''}`}
                                        placeholder="10001"
                                        {...formik.getFieldProps('zipCode')}
                                    />
                                    {formik.touched.zipCode && formik.errors.zipCode && (
                                        <div className="invalid-feedback">{formik.errors.zipCode}</div>
                                    )}
                                </div>
                            </div>

                            <hr className="my-4" />

                            <h5 className="mb-3 text-secondary">Payment Options</h5>
                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <label className="payment-option-card d-flex align-items-center w-100">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="card"
                                            checked={formik.values.paymentMethod === 'card'}
                                            onChange={formik.handleChange}
                                            className="form-check-input me-2"
                                        />
                                        <div>
                                            <div className="fw-semibold">Credit / Debit Card</div>
                                            <small className="text-muted">Pay securely online</small>
                                        </div>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="payment-option-card d-flex align-items-center w-100">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={formik.values.paymentMethod === 'cod'}
                                            onChange={formik.handleChange}
                                            className="form-check-input me-2"
                                        />
                                        <div>
                                            <div className="fw-semibold">Cash on Delivery</div>
                                            <small className="text-muted">Pay upon package receipt</small>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <Button
                                    text="Back to Products"
                                    color="secondary"
                                    onClick={() => navigate('/Products')}
                                />
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <Button
                                        text="Complete Order"
                                        color="success"
                                        onClick={formik.handleSubmit}
                                    />
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="col-lg-5">
                    <div className="card order-summary-card p-4">
                        <h4 className="fw-bold mb-3">Order Summary</h4>
                        <div className="badge bg-primary text-wrap mb-3 p-2">
                            {isDirectBuyNow ? 'Direct Buy Now Item' : `${itemsToCheckout.length} Cart Items`}
                        </div>

                        <div className="list-group list-group-flush mb-3">
                            {itemsToCheckout.map((item, idx) => {
                                const qty = parseInt(item.quantity) || 1;
                                const itemTotal = (parseFloat(item.product_price_inr) || 0) * qty;
                                return (
                                    <div key={item.id || item.prd_id || idx} className="list-group-item bg-transparent d-flex justify-content-between align-items-center px-0 py-2">
                                        <div>
                                            <h6 className="my-0 text-truncate" style={{ maxWidth: '200px' }}>{item.product_name}</h6>
                                            <small className="text-muted">Qty: {qty} × ₹{item.product_price_inr}</small>
                                        </div>
                                        <span className="fw-semibold">₹{itemTotal}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="border-top pt-3">
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Subtotal</span>
                                <span>₹{calculateTotal()}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Shipping</span>
                                <span className="text-success fw-semibold">FREE</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between fs-5 fw-bold">
                                <span>Total Amount</span>
                                <span className="text-primary">₹{calculateTotal()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showToast && (
                <Customtoast
                    show={showToast}
                    message={toastMessage}
                    color={toastColor}
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
};

export default Checkout;
