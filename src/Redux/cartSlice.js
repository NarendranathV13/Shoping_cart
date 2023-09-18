import { createSlice } from '@reduxjs/toolkit';
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: JSON.parse(localStorage.getItem('cart')) || [],
    cartCount: JSON.parse(localStorage.getItem('cart'))?.length || 0,
    orders: JSON.parse(localStorage.getItem('orders')) || [],
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
    removeFromCart: (state, action) => {
      const itemToRemove = action.payload;
      state.cartItems = state.cartItems.filter(item => item.prd_id !== itemToRemove.prd_id);
      localStorage.setItem('cart', JSON.stringify(state.cartItems)); // Update local storage
    },
    
    addOrder: (state, action) => {
      const order = action.payload;
      state.orders.push(order);
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },
  },
});

export const { addToCart, incrementCart, addOrder,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
