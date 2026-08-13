---
name: component-reusability-guide
description: Simplified skill playbook for folder structure, reusing existing common components, and creating new reusable components
tags: [react, components, reusability, tailwind, UI, code-examples]
---

# Skill: React Component Architecture & Reusability Playbook

This skill provides step-by-step implementation playbooks and code examples for reusing existing components and creating new reusable components in the Shopping Cart project.

---

## 1. Inventory of Existing Common Components

| Component | File Path | Supported Props | Purpose |
| :--- | :--- | :--- | :--- |
| **`Button`** | `src/Components/Button.js` | `text`, `color`, `onClick`, `className` | Reusable generic action button styled with Tailwind CSS colors. |
| **`Spinner`** | `src/Components/Spinner.js` | None | Centered loading spinner indicator. |
| **`Customtoast`** | `src/Components/Customtoast.js` | `show`, `message`, `color`, `onClose` | Auto-dismissing floating toast notification. |
| **`Navbar1`** | `src/Components/Navbar/Navbar1.js` | None (Connects to Redux) | Navigation bar header with logo, search bar, and cart count. |
| **`ProductModal`** | `src/Components/ProductComponents/ProductModal.js` | `selectedProduct`, `showModal` | Detail view popup modal for products. |
| **`ProductNav`** | `src/Components/ProductComponents/ProductNav.js` | None | Product category sub-navigation header. |
| **`BarChart`** | `src/Components/Chart/BarChart.js` | Data props | Data analytics bar chart. |
| **`NewChart`** | `src/Components/Chart/NewChart.js` | Data props | Additional analytics chart visualization. |

---

## 2. Code Example 1: Reusing Existing Components in a Page View

This example demonstrates how to compose a page view by reusing existing components (`Navbar1`, `Spinner`, `Button`, `Customtoast`):

```javascript
// src/Pages/Products/Products.js
import React, { useState, useEffect } from 'react';
import api from '../../ApiService';
import Navbar1 from '../../Components/Navbar/Navbar1';
import Spinner from '../../Components/Spinner';
import Button from '../../Components/Button';
import Customtoast from '../../Components/Customtoast';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, message: '' });

    useEffect(() => {
        api.get('/products')
            .then((res) => setProducts(res.data || []))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handleSelect = (name) => {
        setToast({ show: true, message: `Selected: ${name}` });
    };

    return (
        <div>
            <Navbar1 />
            <div className="container mx-auto mt-8 px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Catalog</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                <h5 className="font-semibold text-lg">{item.product_name}</h5>
                                <p className="text-gray-600 my-2">₹{item.product_price_inr}</p>
                                <Button 
                                    text="View Details" 
                                    color="primary" 
                                    onClick={() => handleSelect(item.product_name)} 
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Customtoast 
                show={toast.show} 
                message={toast.message} 
                onClose={() => setToast({ ...toast, show: false })} 
            />
        </div>
    );
};

export default ProductsPage;
```

---

## 3. Code Example 2: Creating a New Reusable Component

When a new UI element is needed that does not exist in `src/Components/`, build a clean, pure functional component in `src/Components/`:

```javascript
// src/Components/CardBadge.js
import React from 'react';

const CardBadge = ({ label, color = 'primary' }) => {
    if (!label) return null;

    const bgColors = {
        primary: 'bg-indigo-100 text-indigo-800',
        secondary: 'bg-gray-100 text-gray-800',
        success: 'bg-green-100 text-green-800',
        danger: 'bg-red-100 text-red-800',
        warning: 'bg-yellow-100 text-yellow-800'
    };
    
    const badgeColor = bgColors[color] || bgColors.primary;

    return (
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}>
            {label}
        </span>
    );
};

export default CardBadge;
```

---

## 4. Reusability Guidelines

### What to Do
- Scan `src/Components/` before writing UI elements.
- Reuse existing shared components instead of duplicating code.
- Place new components in `src/Components/`.
- Keep components pure, receiving dynamic props without hardcoded static data.
- Ensure components are styled using Tailwind CSS classes.

### What to Avoid
- Avoid duplicating UI code that already exists in `src/Components/`.
- Avoid placing shared UI components outside of `src/Components/`.
- Avoid hardcoding static data or raw API calls within reusable components.
- Avoid using legacy Bootstrap CSS classes (e.g., `btn`, `container`, `card`). Use Tailwind utility classes instead.
