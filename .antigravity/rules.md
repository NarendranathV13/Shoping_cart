# Operational Rules for Shopping Cart Project

This document defines the strict operational rules, layer constraints, and code conventions governing all development work in the `Shopping_cart` repository.

---

## 1. Core Architecture & Stack Rules

### What to Do
- **Framework**: React 18 (Functional Components & Hooks ONLY).
- **State Management**: Redux Toolkit (`src/Redux/`). State MUST be modified via `createSlice` reducers.
- **HTTP Layer**: Centralized Axios Client (`src/ApiService/index.js`).
- **Routing**: React Router v6 (`src/Router/`).
- **Forms & Validation**: Formik + Yup schema validation.
- **Styling**: Bootstrap 5 + Styled-Components (`src/StyledComponent/`).
- **Styling**: Bootstrap 5 + TailwindCSS + Styled-Components + Shadcn UI (`src/Components/ui/`).
- **User Notifications**: SweetAlert2 (`Swal.fire`) for dialogs; `<Customtoast />` for toast messages.

### What to Avoid
- **Framework**: Options API & Class Components are **strictly forbidden**.
- **State Management**: Direct state mutation outside Redux is forbidden.
- **HTTP Layer**: Direct `axios` imports or native `fetch()` in pages/components are **strictly forbidden**.
- **Styling**: Avoid inline `style={{...}}`.

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
│   ├── ProductComponents/      # Feature components (ProductModal.js, ProductNav.js)
│   └── ui/                     # Shadcn UI primitives (card.js, table.js, dropdown-menu.js, button.js)
├── lib/                        # Utility helpers (`utils.js` for cn class merging)
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

### What to Do

1. **`src/Pages/` (Routed Views)**:
   - MUST be thin layout handlers.
   - MUST destructure Redux state/dispatch and invoke `ApiService`.

2. **`src/Components/` (Reusable Components)**:
   - MUST be pure functional components receiving props (`text`, `color`, `onClick`, `show`, `data`).

3. **`src/ApiService/` (HTTP Service Layer)**:
   - Centralizes Axios configuration, base URLs, and pre/post interceptors.
   - All network traffic MUST pass through `src/ApiService/index.js`.

### What to Avoid

1. **`src/Pages/` (Routed Views)**:
   - MUST NOT duplicate UI components or contain raw axios logic.

2. **`src/Components/` (Reusable Components)**:
   - MUST NOT make direct raw API network calls.

---

## 4. Mandatory Component Reuse Rule

Before writing any new UI element or markup, developers and AI assistants **MUST** inspect `src/Components/` and `src/Components/ui/` and reuse existing components:

| Element Required | Existing Component | Mandatory File Path |
| :--- | :--- | :--- |
| Action Button | `<Button />` | `src/Components/Button.js` / `src/Components/ui/button.js` |
| Loading Indicator | `<Spinner />` | `src/Components/Spinner.js` |
| Toast Alert | `<Customtoast />` | `src/Components/Customtoast.js` |
| Header Navigation | `<Navbar1 />` | `src/Components/Navbar/Navbar1.js` |
| Product Details Modal | `<ProductModal />` | `src/Components/ProductComponents/ProductModal.js` |
| Category Header Nav | `<ProductNav />` | `src/Components/ProductComponents/ProductNav.js` |
| Sales/Analytics Charts | `<BarChart />` / `<NewChart />` | `src/Components/Chart/` |
| Card Container | `<Card />` | `src/Components/ui/card.js` |
| Data Table | `<Table />` | `src/Components/ui/table.js` |
| Action Dropdown Menu | `<DropdownMenu />` | `src/Components/ui/dropdown-menu.js` |
| Form Dropdown Select | `<DropdownField />` | `src/Components/DropdownField.js` |

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

## 6. Team Commands & Prompts

For standardized team prompts (creating features, running skill reviews & audit summaries), refer to:
- `docs/AI_PROMPTS.md`

- **Sync Skills**: `./scripts/sync-skills.sh` (Run only when skills are changed and tracked)

---

## 7. Strict Architectural Guardrails & Anti-Patterns

### What to Do
- **Dispatches MUST be Atomic**: Always dispatch a single action carrying a batch payload array.
- **Async Error Propagation**: Allow HTTP errors to throw directly into the outer `catch (error)` block in Formik handlers where a surrounding `try...catch` block handles errors.
- **Build & Code Hygiene**: Codebase MUST compile cleanly with `npm run build`.

### What to Avoid
- **State Side-Effect Guardrail**: Redux reducers (e.g., `addOrder`) MUST NOT unconditionally clear user cart state (`cartItems`, `cartCount`) unless the user explicitly completed a cart checkout (`isCartCheckout: true`). Single-item checkouts (e.g., "Buy Now") MUST preserve existing cart items.
- **Looping Dispatches**: NEVER invoke `dispatch(...)` inside loops (`.forEach`, `for...of`).
- **Swallowing Promise Rejections**: In Formik form handlers, NEVER chain inline empty `.catch()` handlers onto `api.post()` or `api.get()` calls if a surrounding `try...catch` block is responsible for displaying error popups (`Swal.fire`).
- **ESLint Warnings**: Avoid unused variable warnings (`no-unused-vars`), missing react-hooks dependencies (`react-hooks/exhaustive-deps`), or loose equality warnings (`eqeqeq`).

---

## 8. Naming Conventions & Folder Structure

### What to Do:
- **Variables**: Use `camelCase` for standard variables and functions (e.g., `cartItems`, `fetchData`). Use `UPPER_SNAKE_CASE` for constants.
- **Components**: Use `PascalCase` for component names and their filenames (e.g., `ProductModal.js`, `Customtoast.js`).
- **Folders**: Use `PascalCase` for new component/page folders (e.g., `ProductComponents/`, `Cart/`).
- Keep names descriptive and relevant to their domain context.

### What to Avoid:
- **Variables**: Avoid cryptic or overly short variable names (e.g., `x`, `dat`, `arr`). Do not use `snake_case` or `PascalCase` for variables.
- **Components**: Do not use `camelCase` or `kebab-case` for component names (e.g., `productModal.js`, `product-modal.js`).
- **Folders**: Avoid creating deeply nested folder structures. Do not use `lowercase` or `kebab-case` for React component directories.

---

## 9. Response & Commit Formatting Rule

After completing any task/prompt response, the AI assistant **MUST** provide:
1. **Branch Name**: Formatted using conventional prefixes (e.g., `feat/feature-name`, `fix/fix-name`, `chore/task-name`, `refactor/component-name`).
2. **Commit Message**: A single-line simple conventional commit message using prefixes (`feat:`, `fix:`, `chore:`, `refactor:`, `wip:`).

**Format Pattern**:
`Branch: <type>/<feature-name> | <type>: <description>`

**Example**:
`Branch: feat/product-details-page | feat: implemented product details page`



