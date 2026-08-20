---
name: redux-formik-guide
description: Concise playbook for Redux Toolkit state management and Formik + Yup form validation
tags: [redux, formik, yup, state-management, forms, react]
---

# Skill: Redux Toolkit & Formik Form Handling Playbook

Step-by-step playbooks for managing Redux Toolkit state slices and validating Formik + Yup forms in the Shopping Cart project.

---

## 1. Redux Toolkit State Management (`src/Redux/cartSlice.js`)

```javascript
// src/Redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        totalQuantity: 0,
    },
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existing = state.cartItems.find((i) => i.id === item.id);
            state.totalQuantity++;
            if (!existing) {
                state.cartItems.push({ ...item, quantity: 1 });
            } else {
                existing.quantity++;
            }
        },
        removeFromCart(state, action) {
            const id = action.payload;
            const existing = state.cartItems.find((i) => i.id === id);
            if (existing) {
                state.totalQuantity -= existing.quantity;
                state.cartItems = state.cartItems.filter((i) => i.id !== id);
            }
        },
        clearCart(state) {
            state.cartItems = [];
            state.totalQuantity = 0;
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

---

## 2. Formik & Yup Form Handling (`src/Pages/Register/Register.js` & `RegisterSchema.js`)

### Schema File (`src/Pages/Register/RegisterSchema.js`)
```javascript
// src/Pages/Register/RegisterSchema.js
import * as Yup from 'yup';

export const registerValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});
```

### Component File (`src/Pages/Register/Register.js`)
```javascript
// src/Pages/Register/Register.js
import React, { useState } from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import api from '../../ApiService';
import Spinner from '../../Components/Spinner';
import { registerValidationSchema } from './RegisterSchema';

const RegisterPage = () => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: registerValidationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await api.post('/register', values);
                Swal.fire('Success', 'Registered successfully!', 'success');
                formik.resetForm();
            } catch (err) {
                Swal.fire('Error', err?.response?.data?.message || 'Registration failed', 'error');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <form onSubmit={formik.handleSubmit} className="card p-4 shadow-sm">
                <h3 className="mb-3 text-center">Register</h3>

                {/* Email Field */}
                <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                        type="email"
                        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                    )}
                </div>

                {/* Password Field */}
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="invalid-feedback">{formik.errors.password}</div>
                    )}
                </div>

                {/* Submit Button or Loading Indicator */}
                {loading ? <Spinner /> : <button type="submit" className="btn btn-primary w-100">Submit</button>}
            </form>
        </div>
    );
};

export default RegisterPage;
```

---

## 3. Key Rules & Guardrails

### What to Do
- Modify state using `createSlice` reducers cleanly without unrequested collateral mutations.
- Distinguish between single-item operations (e.g. "Buy Now") and cart batch operations (e.g. "Cart Checkout").
- Dispatch state changes atomically in single action calls instead of looping dispatches in `.forEach()`.
- Leverage `{...formik.getFieldProps('fieldName')}` to reduce form input boilerplate (`value`, `onChange`, `onBlur`).
- **Mandatory Schema Separation**: MUST define Yup validation schemas in a separate file (e.g. `RegisterSchema.js`, `CheckoutSchema.js`, or `schema.js`) in their respective folder and import them into component files.
- Route all form submission API requests through `ApiService` (`api.post(...)`).

### What to Avoid
- NEVER swallow `api.post(...)` errors with an empty `.catch()` inside `onSubmit` when expecting the `try...catch` block to present error alerts.

---

## 4. Strict Anti-Patterns vs. Best Practices

### Anti-Pattern 1: Looping Dispatches & Collateral Cart Wiping
```javascript
// ❌ BAD: Wipes cart N times in a loop and causes side-effects on Buy Now
itemsToOrder.forEach((item) => {
    dispatch(addOrder(item)); // addOrder clears cart state unconditionally!
});
```

```javascript
// ✅ GOOD: Atomic single dispatch with conditional cart clearing flag
dispatch(addOrder({
    items: itemsToOrder,
    isCartCheckout: !checkoutItem,
}));
```

### Anti-Pattern 2: Swallowing API Promises in Formik `onSubmit`
```javascript
// ❌ BAD: Chaining .catch() swallows errors, preventing try/catch from handling network errors
try {
    await api.post('/orders', orderData).catch((err) => {
        console.log('Ignored error:', err);
    });
    // This executes EVEN IF the HTTP request failed!
    Swal.fire('Success', 'Order placed!', 'success');
} catch (error) {
    // This block is NEVER reached!
}
```

```javascript
// ✅ GOOD: Let errors propagate cleanly to the catch block
try {
    await api.post('/orders', orderData);
    Swal.fire('Success', 'Order placed!', 'success');
} catch (error) {
    Swal.fire('Error', error?.response?.data?.message || 'Failed to place order', 'error');
}
```

