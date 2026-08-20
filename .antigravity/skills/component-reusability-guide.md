---
name: component-reusability-guide
description: Simplified skill playbook for folder structure, reusing existing common components, Shadcn UI components, and creating new reusable components
tags: [react, components, reusability, bootstrap, shadcn-ui, UI, code-examples]
---

# Skill: React Component Architecture & Reusability Playbook

This skill provides step-by-step implementation playbooks and code examples for reusing existing components, leveraging Shadcn UI primitives, and creating new reusable components in the Shopping Cart project.

---

## 1. Inventory of Existing Common & Shadcn UI Components

### Common Components
| Component | File Path | Supported Props | Purpose |
| :--- | :--- | :--- | :--- |
| **`Button`** | `src/Components/Button.js` | `text`, `color`, `onClick` | Reusable generic action button styled with Bootstrap theme colors. |
| **`Spinner`** | `src/Components/Spinner.js` | None | Centered loading spinner indicator. |
| **`Customtoast`** | `src/Components/Customtoast.js` | `show`, `message`, `color`, `onClose` | Auto-dismissing floating toast notification. |
| **`Navbar1`** | `src/Components/Navbar/Navbar1.js` | None (Connects to Redux) | Navigation bar header with logo, search bar, and cart count. |
| **`ProductModal`** | `src/Components/ProductComponents/ProductModal.js` | `selectedProduct`, `showModal` | Detail view popup modal for products. |
| **`ProductNav`** | `src/Components/ProductComponents/ProductNav.js` | None | Product category sub-navigation header. |
| **`InputField`** | `src/Components/InputField.js` | `label`, `id`, `formik`, `placeholder` | Reusable text input field connected to Formik. |
| **`DropdownField`** | `src/Components/DropdownField.js` | `label`, `id`, `formik`, `options`, `placeholder` | Reusable dropdown component wrapping Shadcn UI DropdownMenu and Formik state. |

### Shadcn UI Components (`src/Components/ui/`)
| Component | File Path | Sub-components | Purpose |
| :--- | :--- | :--- | :--- |
| **`Card`** | `src/Components/ui/card.js` | `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | Modular card container for displaying product tiles, stats, and content blocks. |
| **`Table`** | `src/Components/ui/table.js` | `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption` | Flexible responsive data table component for order histories and product lists. |
| **`DropdownMenu`**| `src/Components/ui/dropdown-menu.js` | `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator` | Accessible Radix-backed dropdown menu for action menus, filters, and profile options. |
| **`Button` (Shadcn)** | `src/Components/ui/button.js` | `buttonVariants` | Styled variant button supporting `default`, `destructive`, `outline`, `secondary`, `ghost`, `link` variants and sizes. |

---

## 2. Code Example 1: Reusing Components & Shadcn UI in a Page View

This example demonstrates how to compose a page view by reusing standard components (`Navbar1`, `Spinner`, `Customtoast`) and Shadcn UI components (`Card`, `CardHeader`, `CardTitle`, `CardContent`, `Button`):

```javascript
// src/Pages/Products/Products.js
import React, { useState, useEffect } from 'react';
import api from '../../ApiService';
import Navbar1 from '../../Components/Navbar/Navbar1';
import Spinner from '../../Components/Spinner';
import Customtoast from '../../Components/Customtoast';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../Components/ui/card';
import { Button } from '../../Components/ui/button';

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
            <div className="container mt-4">
                <h2 className="mb-4">Product Catalog</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {products.map((item) => (
                            <Card key={item.id} className="shadow-sm">
                                <CardHeader>
                                    <CardTitle>{item.product_name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">₹{item.product_price_inr}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button 
                                        variant="default"
                                        onClick={() => handleSelect(item.product_name)} 
                                    >
                                        View Details
                                    </Button>
                                </CardFooter>
                            </Card>
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

When a new UI element is needed that does not exist in `src/Components/` or `src/Components/ui/`, build a clean, pure functional component in `src/Components/`:

```javascript
// src/Components/CardBadge.js
import React from 'react';

const CardBadge = ({ label, color = 'primary' }) => {
    if (!label) return null;

    return (
        <span className={`badge bg-${color} p-2`}>
            {label}
        </span>
    );
};

export default CardBadge;
```

---

## 4. Reusability Guidelines

### What to Do
- Scan `src/Components/` and `src/Components/ui/` before writing UI elements.
- Reuse existing shared components and Shadcn UI primitives instead of duplicating code.
- Place new general shared components in `src/Components/` and Shadcn UI primitives in `src/Components/ui/`.
- Keep components pure, receiving dynamic props without hardcoded static data.

### What to Avoid
- Avoid duplicating UI code that already exists in `src/Components/` or `src/Components/ui/`.
- Avoid placing shared UI components outside of `src/Components/`.
- Avoid hardcoding static data or raw API calls within reusable components.
