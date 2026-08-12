import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import cartReducer from '../../Redux/cartSlice';
import Checkout from './Checkout';
import api from '../../ApiService';
import Swal from 'sweetalert2';

jest.mock('../../ApiService', () => {
    const mockApi = {
        get: jest.fn(() => Promise.resolve({ data: [] })),
        post: jest.fn(() => Promise.resolve({ data: { success: true } })),
    };
    return {
        __esModule: true,
        default: mockApi,
        api: mockApi,
    };
});

jest.mock('sweetalert2', () => ({
    fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
}));

const createMockStore = (preloadedState = {}) => {
    return configureStore({
        reducer: {
            cart: cartReducer,
        },
        preloadedState,
    });
};

const renderCheckout = (preloadedState = {}) => {
    const store = createMockStore(preloadedState);
    return render(
        <Provider store={store}>
            <MemoryRouter>
                <Checkout />
            </MemoryRouter>
        </Provider>
    );
};

describe('Checkout Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        api.get.mockResolvedValue({ data: [] });
        api.post.mockResolvedValue({ data: { success: true } });
    });

    test('renders empty state when no items are available for checkout', () => {
        renderCheckout({
            cart: {
                cartItems: [],
                checkoutItem: null,
                orders: [],
            },
        });

        expect(screen.getByText('No Items to Checkout')).toBeInTheDocument();
        expect(screen.getByText('Browse Products')).toBeInTheDocument();
    });

    test('renders checkout form when items are present in cart', () => {
        renderCheckout({
            cart: {
                cartItems: [
                    { id: '1', prd_id: '1', product_name: 'Test Product', product_price_inr: 500, quantity: 2 },
                ],
                checkoutItem: null,
                orders: [],
            },
        });

        expect(screen.getByRole('heading', { name: /checkout/i })).toBeInTheDocument();
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getAllByText('₹1000')[0]).toBeInTheDocument();
    });

    test('renders direct Buy Now item in order summary when checkoutItem is set', () => {
        renderCheckout({
            cart: {
                cartItems: [],
                checkoutItem: { id: '2', prd_id: '2', product_name: 'Buy Now Product', product_price_inr: 1200, quantity: 1 },
                orders: [],
            },
        });

        expect(screen.getByText('Buy Now Product')).toBeInTheDocument();
        expect(screen.getByText('Direct Buy Now Item')).toBeInTheDocument();
    });

    test('validates required fields upon form submission', async () => {
        renderCheckout({
            cart: {
                cartItems: [
                    { id: '1', prd_id: '1', product_name: 'Test Product', product_price_inr: 500, quantity: 1 },
                ],
                checkoutItem: null,
                orders: [],
            },
        });

        fireEvent.click(screen.getByRole('button', { name: /complete order/i }));

        await waitFor(() => {
            expect(screen.getByText('First name is required')).toBeInTheDocument();
            expect(screen.getByText('Last name is required')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Shipping address is required')).toBeInTheDocument();
        });
    });

    test('submits order successfully when all required fields are filled', async () => {
        renderCheckout({
            cart: {
                cartItems: [
                    { id: '1', prd_id: '1', product_name: 'Test Product', product_price_inr: 500, quantity: 1 },
                ],
                checkoutItem: null,
                orders: [],
            },
        });

        fireEvent.change(screen.getByPlaceholderText('John'), { target: { value: 'Jane' } });
        fireEvent.change(screen.getByPlaceholderText('Doe'), { target: { value: 'Smith' } });
        fireEvent.change(screen.getByPlaceholderText('john.doe@example.com'), { target: { value: 'jane@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('123 Main St, Suite 100'), { target: { value: '456 Elm St' } });
        fireEvent.change(screen.getByPlaceholderText('Select Country'), { target: { value: 'India' } });
        fireEvent.change(screen.getByPlaceholderText('Select State'), { target: { value: 'Karnataka' } });
        fireEvent.change(screen.getByPlaceholderText('Select City'), { target: { value: 'Bengaluru' } });
        fireEvent.change(screen.getByPlaceholderText('10001'), { target: { value: '560001' } });

        fireEvent.click(screen.getByRole('button', { name: /complete order/i }));

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith(
                'https://64db5089593f57e435b0c522.mockapi.io/orders',
                expect.objectContaining({
                    items: [expect.objectContaining({ product_name: 'Test Product' })],
                    totalAmount: 500,
                })
            );
            expect(Swal.fire).toHaveBeenCalledWith(
                expect.objectContaining({
                    icon: 'success',
                    title: 'Order Placed Successfully!',
                })
            );
        });
    });
});
