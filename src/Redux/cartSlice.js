import { createSlice } from '@reduxjs/toolkit';
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: JSON.parse(localStorage.getItem('cart')) || [],
    cartCount: JSON.parse(localStorage.getItem('cart'))?.length || 0,
    orders: JSON.parse(localStorage.getItem('orders')) || [],
    checkoutItem: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isProductInCart = state.cartItems.some(existingItem => existingItem.prd_id === item.prd_id);

      if (!isProductInCart) {
        state.cartItems.push(item);
        state.cartCount += 1;
        localStorage.setItem('cart', JSON.stringify(state.cartItems));
      }
    },
    //remove product from cart
    removeFromCart: (state, action) => {
      const itemToRemove = action.payload;
      state.cartItems = state.cartItems.filter(item => item.prd_id !== itemToRemove.prd_id);
      state.cartCount -= 1; // reduce cart count
      localStorage.setItem('cart', JSON.stringify(state.cartItems)); // Update local storage
    },
    // Set checkout item for direct Buy Now navigation
    setCheckoutItem: (state, action) => {
      state.checkoutItem = action.payload;
    },
    // Place order reducer supporting both cart checkout and direct Buy Now
    addOrder: (state, action) => {
      const payload = action.payload;
      let newOrders = [];
      let isCartCheckout = false;

      if (payload && typeof payload === 'object') {
        if (Array.isArray(payload.items)) {
          newOrders = payload.items;
          isCartCheckout = payload.isCartCheckout !== false;
        } else if (payload.items) {
          newOrders = [payload.items];
          isCartCheckout = Boolean(payload.isCartCheckout);
        } else {
          newOrders = [payload];
          isCartCheckout = Boolean(payload.isCartCheckout);
        }
      }

      state.orders.push(...newOrders);
      if (isCartCheckout) {
        state.cartItems = [];
        state.cartCount = 0;
        localStorage.removeItem('cart');
      }
      state.checkoutItem = null;
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },
    //place order from products page
    addBuyNow: (state, action) => {
      const order = action.payload;
      state.orders.push(order);
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },
// to update the quantity of product in local
    updateQuantity: (state, action) => {
      const { prd_id, quantity } = action.payload;
      const itemToUpdate = state.cartItems.find(item => item.prd_id === prd_id);

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(state.cartItems)); // Update local storage
      }
    },
  },
});

export const { addToCart, incrementCart, addOrder, removeFromCart, updateQuantity, addBuyNow, setCheckoutItem } = cartSlice.actions;
export default cartSlice.reducer;
