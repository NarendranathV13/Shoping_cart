# Operational Rules for Shopping Cart Project

This document defines the strict operational rules, layer constraints, and code conventions governing all development work in the `Shopping_cart` repository.

---

## 1. Core Architecture & Stack Rules

- **Framework**: React 18 (Functional Components & Hooks ONLY. Options API & Class Components are **strictly forbidden**).
- **State Management**: Redux Toolkit (`src/Redux/`). State MUST be modified via `createSlice` reducers. Direct state mutation outside Redux is forbidden.
- **HTTP Layer**: Centralized Axios Client (`src/ApiService/index.js`). Direct `axios` imports or native `fetch()` in pages/components are **strictly forbidden**.
- **Routing**: React Router v6 (`src/Router/`).
- **Forms & Validation**: Formik + Yup schema validation.
- **Styling**: Bootstrap 5 + Styled-Components (`src/StyledComponent/`). Avoid inline `style={{...}}`.
- **User Notifications**: SweetAlert2 (`Swal.fire`) for dialogs; `<Customtoast />` for toast messages.

---

## 2. Directory Layout & Module Structure

```
src/
├── Api/                        # Domain specific API wrappers
├── ApiService/                 # Centralized Axios client (`api.js`, `index.js`)
├── Assets/                     # Media & static assets
├── Components/                 # Shared UI & reusable components
│   ├── Button.js               # Generic action button component
│   ├── Customtoast.js          # Reusable toast notification
│   ├── Spinner.js              # Standard loading spinner indicator
│   ├── Chart/                  # Analytics chart components (BarChart.js, NewChart.js)
│   ├── Navbar/                 # Navigation header components (Navbar1.js, style.css)
│   └── ProductComponents/      # Feature components (ProductModal.js, ProductNav.js)
├── Pages/                      # Top-level routed page views
│   ├── Cart/                   # Shopping Cart page
│   ├── Dashboard.js            # Admin & Analytics Dashboard
│   ├── Login/                  # Login view & styled components
│   ├── Myorders.js             # User Order History page
│   ├── Products/               # Products catalog view
│   └── Register/               # Registration view
├── Redux/                      # Redux slices & store (`cartSlice.js`, `Store.js`)
├── Router/                     # React Router v6 route definitions
└── StyledComponent/            # CSS-in-JS styled elements (`LoginStyle.js`)
```

---

## 3. Layer Enforcement Rules

1. **`src/Pages/` (Routed Views)**:
   - MUST be thin layout handlers.
   - MUST destructure Redux state/dispatch and invoke `ApiService`.
   - MUST NOT duplicate UI components or contain raw axios logic.

2. **`src/Components/` (Reusable Components)**:
   - MUST be pure functional components receiving props (`text`, `color`, `onClick`, `show`, `data`).
   - MUST NOT make direct raw API network calls.

3. **`src/ApiService/` (HTTP Service Layer)**:
   - Centralizes Axios configuration, base URLs, and pre/post interceptors.
   - All network traffic MUST pass through `src/ApiService/index.js`.

---

## 4. Mandatory Component Reuse Rule

Before writing any new UI element or markup, developers and AI assistants **MUST** inspect `src/Components/` and reuse existing components:

| Element Required | Existing Component | Mandatory File Path |
| :--- | :--- | :--- |
| Action Button | `<Button />` | `src/Components/Button.js` |
| Loading Indicator | `<Spinner />` | `src/Components/Spinner.js` |
| Toast Alert | `<Customtoast />` | `src/Components/Customtoast.js` |
| Header Navigation | `<Navbar1 />` | `src/Components/Navbar/Navbar1.js` |
| Product Details Modal | `<ProductModal />` | `src/Components/ProductComponents/ProductModal.js` |
| Category Header Nav | `<ProductNav />` | `src/Components/ProductComponents/ProductNav.js` |
| Sales/Analytics Charts | `<BarChart />` / `<NewChart />` | `src/Components/Chart/` |

---

## 5. Skills Index — Implementation Playbooks

Refer to the corresponding skill guide for practical step-by-step implementation playbooks and full code examples:

| Task | Skill Playbook Location |
| :--- | :--- |
| Reusing existing components & creating new reusable components with examples | `.antigravity/skills/component-reusability-guide.md` |
| Executing API GET/POST/PUT/DELETE requests via ApiService with examples | `.antigravity/skills/api-service-guide.md` |
| Managing Redux Toolkit state & Formik/Yup forms with examples | `.antigravity/skills/redux-formik-guide.md` |
| Auditing commits & codebase changes against skill compliance rules | `.antigravity/skills/skill-compliance-review.md` |

---

## 6. Team Prompt Playbook

For standardized team prompts (creating features, running skill reviews & audit summaries), refer to:
- `docs/AI_PROMPTS.md`

---

## 7. Strict Architectural Guardrails & Anti-Patterns

To eliminate recurring bugs, all developers and AI assistants MUST follow these strict guardrails:

### A. State Side-Effect Guardrail
- **Reducers MUST NOT cause collateral state damage**: Redux reducers (e.g., `addOrder`) MUST NOT unconditionally clear user cart state (`cartItems`, `cartCount`) unless the user explicitly completed a cart checkout (`isCartCheckout: true`). Single-item checkouts (e.g., "Buy Now") MUST preserve existing cart items.
- **Dispatches MUST be Atomic**: NEVER invoke `dispatch(...)` inside loops (`.forEach`, `for...of`). Always dispatch a single action carrying a batch payload array.

### B. Async Error Propagation Guardrail
- **NEVER swallow promise rejections in `onSubmit`**: In Formik form handlers, NEVER chain inline empty `.catch()` handlers onto `api.post()` or `api.get()` calls if a surrounding `try...catch` block is responsible for displaying error popups (`Swal.fire`). Allow HTTP errors to throw directly into the outer `catch (error)` block.

### C. Build & Code Hygiene Guardrail
- **Zero ESLint Warnings**: Codebase MUST compile cleanly with `npm run build` without unused variable warnings (`no-unused-vars`), missing react-hooks dependencies (`react-hooks/exhaustive-deps`), or loose equality warnings (`eqeqeq`).


