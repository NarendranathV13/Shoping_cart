---
name: api-service-guide
description: Detailed skill playbook for creating, configuring, and using API requests via centralized ApiService
tags: [api, axios, service-layer, http, react]
---

# Skill: Centralized ApiService Execution & Integration

## Purpose
This skill provides instructions on how to call, extend, and manage API endpoints using the standardized centralized `api` client exported from `src/ApiService/index.js`.

---

## 1. Execution Rules

1. **Import Source**:
   Always import `api` from `src/ApiService/index.js` or relative path `ApiService`:
   ```javascript
   import api from '../../ApiService';
   ```

2. **HTTP Methods Available**:
   - `api.get(url, config)`
   - `api.post(url, data, config)`
   - `api.put(url, data, config)`
   - `api.patch(url, data, config)`
   - `api.delete(url, config)`
   - `api.axiosInstance` (for custom low-level configuration)

3. **Pattern Example**:
   ```javascript
   import api from '../ApiService';

   export const fetchProducts = () => api.get('/products');
   export const createOrder = (orderData) => api.post('/orders', orderData);
   ```

4. **UI Component Integration Example with Shadcn UI**:
   ```javascript
   // Example: Fetching and displaying data in a Shadcn UI Table component
   import React, { useEffect, useState } from 'react';
   import api from '../../ApiService';
   import Spinner from '../../Components/Spinner';
   import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../Components/ui/table';
   import { Button } from '../../Components/ui/button';
   import Swal from 'sweetalert2';

   const OrderHistory = () => {
       const [orders, setOrders] = useState([]);
       const [loading, setLoading] = useState(true);

       useEffect(() => {
           api.get('/orders')
               .then((res) => setOrders(res.data || []))
               .catch((err) => Swal.fire('Error', err?.response?.data?.message || 'Failed to fetch orders', 'error'))
               .finally(() => setLoading(false));
       }, []);

       if (loading) return <Spinner />;

       return (
           <div className="p-4 border rounded-xl shadow-sm bg-white">
               <h3 className="text-lg font-semibold mb-4">Order History</h3>
               <Table>
                   <TableHeader>
                       <TableRow>
                           <TableHead>Order ID</TableHead>
                           <TableHead>Date</TableHead>
                           <TableHead>Total Amount</TableHead>
                           <TableHead className="text-right">Actions</TableHead>
                       </TableRow>
                   </TableHeader>
                   <TableBody>
                       {orders.map((order) => (
                           <TableRow key={order.id}>
                               <TableCell className="font-medium">#{order.id}</TableCell>
                               <TableCell>{order.date}</TableCell>
                               <TableCell>₹{order.total}</TableCell>
                               <TableCell className="text-right">
                                   <Button variant="outline" size="sm" onClick={() => console.log(order.id)}>
                                       Details
                                   </Button>
                               </TableCell>
                           </TableRow>
                       ))}
                   </TableBody>
               </Table>
           </div>
       );
   };

   export default OrderHistory;
   ```

---

## 2. Layer & Responsibilities

| Layer | File Path | Responsibility |
| :--- | :--- | :--- |
| **HTTP Client Export** | `src/ApiService/index.js` | Exports standard `api` wrapper client. |
| **Axios Core Setup** | `src/ApiService/api.js` | Base URL config, timeout, auth token interceptors, response error handling. |
| **Domain Services** | `src/Api/*` | Feature-specific API endpoints wrappers. |
| **UI Consumers** | `src/Pages/*`, `src/Components/*` | Calls API via `ApiService`; displays user feedback alerts. |

---

## 3. Error Handling & Interceptors

- Request headers and authentication tokens are attached automatically by `src/ApiService/api.js`.
- Interceptors handle central logging of response errors.
- Component level code should catch errors and display notifications using `SweetAlert2` (`Swal.fire`).

---

## 4. Common Pitfalls & Guardrails

### What to Do
- `import api from 'src/ApiService'` instead of raw axios in components.
- Use `api.get('/endpoint')` instead of native `fetch()`.
- Rely on `src/ApiService/api.js` interceptor for Auth headers.
- Allow errors to propagate so `catch (err)` triggers `Swal.fire`.
- Define base paths or endpoint wrappers in `src/Api/`.

### What to Avoid
- Avoid `import axios from 'axios'` in components.
- Avoid native `fetch()` calls.
- Avoid manual Auth header construction in every request.
- Avoid swallowing promise errors with `.catch()` inside `try/catch`.
- Avoid scattering raw full URL strings across components.

