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

| Avoid | Do Instead |
| :--- | :--- |
| `import axios from 'axios'` in components | `import api from 'src/ApiService'` |
| Native `fetch()` calls | `api.get('/endpoint')` |
| Manual Auth header construction in every request | Rely on `src/ApiService/api.js` interceptor |
| Swallowing promise errors with `.catch()` inside `try/catch` | Allow errors to propagate so `catch (err)` triggers `Swal.fire` |
| Scattering raw full URL strings across components | Define base paths or endpoint wrappers in `src/Api/` |

