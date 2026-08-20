---
name: skill-compliance-review
description: Playbook and checklist for auditing recent commits or uncommitted changes against established project skills, architectural rules, layer boundaries, component reusability, Shadcn UI standards, and ApiService standards.
tags: [review, compliance, skill-audit, git-commit, architecture, code-review, shadcn-ui]
---

# Skill: Codebase & Commit Skill Compliance Review

## Purpose
This skill provides a systematic playbook and audit checklist for reviewing recent git commits or working directory changes to verify whether they adhere strictly to the project's established skills, operational rules, layer constraints, component reusability guidelines, and Shadcn UI conventions.

---

## 1. Audit Pillars & Checklist

### Pillar 1: Component Reusability & UI Architecture
- [ ] **Component Inventory Audit**: Checked `src/Components/` and `src/Components/ui/` before adding any new UI markup.
- [ ] **Mandatory Component Usage**: Reused existing generic UI components:
  - `<Button />` (`src/Components/Button.js`) or Shadcn `<Button />` (`src/Components/ui/button.js`) for action buttons.
  - `<Spinner />` (`src/Components/Spinner.js`) for loading states.
  - `<Customtoast />` (`src/Components/Customtoast.js`) for toast notifications.
  - `<Navbar1 />` (`src/Components/Navbar/Navbar1.js`) for headers.
  - `<ProductModal />` (`src/Components/ProductComponents/ProductModal.js`) for product popups.
  - `<ProductNav />` (`src/Components/ProductComponents/ProductNav.js`) for sub-navigation.
  - `<BarChart />` / `<NewChart />` (`src/Components/Chart/`) for analytics charts.
  - Shadcn UI primitives (`Card`, `Table`, `DropdownMenu`, `Button`) in `src/Components/ui/`.
- [ ] **Pure Component Pattern**: Placed new shared UI components inside `src/Components/` or `src/Components/ui/` as pure functional components driven strictly by props (no raw inline API calls or hardcoded state).

### Pillar 2: ApiService Centralization & HTTP Layer
- [ ] **Forbidden Direct Imports**: No direct `import axios from 'axios'` in pages (`src/Pages/`) or components (`src/Components/` or `src/Api/`).
- [ ] **Forbidden Native Fetch**: No native `fetch()` calls used for network requests.
- [ ] **Mandatory Central Client**: All HTTP requests use `import api from 'src/ApiService'` (or relative path to `src/ApiService/index.js`).
- [ ] **Interceptors & Error Alerts**: Centralized request/response interceptors in `src/ApiService/api.js` are utilized, and component-level errors trigger user-friendly notifications (e.g. `SweetAlert2` / `Swal.fire`).
- [ ] **Unswallowed Error Propagation**: Form submission handlers do NOT swallow `api.post(...)` errors with an empty `.catch()` inside `onSubmit`.

### Pillar 3: State Management & Form Validation
- [ ] **Redux Toolkit Consistency**: Global application state is managed in `src/Redux/` and modified exclusively through `createSlice` reducers. No direct state mutation occurs outside Redux.
- [ ] **Selective State Mutation**: Redux reducers do NOT cause collateral state damage (e.g. single-item "Buy Now" does not clear unrelated cart items).
- [ ] **Atomic Dispatches**: State modifications are dispatched in single batch actions rather than looped `.forEach(dispatch)` calls.
- [ ] **Formik & Yup Validation**: User forms utilize `useFormik` or `<Formik />` paired with `Yup` validation schemas defined outside component render functions.
- [ ] **Field Helper Usage**: Form inputs use `{...formik.getFieldProps('fieldName')}` to eliminate boilerplate code.

### Pillar 4: Script Synchronization & Build Health
- [ ] **Skill Parity**: `./scripts/sync-skills.sh` has been executed to synchronize `.antigravity/skills/`, `.cursor/skills/`, and `.claude/skills/` and refresh the `.agent/skills` symlink.
- [ ] **Build Integrity**: Project builds successfully without syntax or module resolution errors (`npm run build`).
- [ ] **Zero ESLint Warnings**: Build produces zero compiler/ESLint warnings (`no-unused-vars`, `react-hooks/exhaustive-deps`, `eqeqeq`).
- [ ] **Commit & Branch Output**: Response provides a branch name formatted as `feat/feature-name` and a single-line conventional commit message (e.g., `Branch: feat/product-details-page | feat: implemented product details page`).


---

## 2. Step-by-Step Execution Workflow

1. **Inspect Git Delta**:
   ```bash
   git status
   git diff HEAD~1..HEAD  # for last commit
   # OR
   git diff --staged      # for staged changes
   ```

2. **Verify Component & API References**:
   - Search changed files for direct `axios` or `fetch` calls:
     ```bash
     git diff | grep -i "axios"
     ```
   - Verify all API calls route through `ApiService`.

3. **Validate Code Execution & Tests**:
   - Run skill sync script: `./scripts/sync-skills.sh`
   - Run test suite: `CI=true npm test`
   - Run production build: `npm run build`

4. **Generate Compliance Report**:
   Compile findings into the standardized report format specified below.

---

## 3. Standardized Review Report Format

When completing a review, format the output strictly as follows:

```markdown
# Skill Compliance Review Report

## 1. Executive Summary
- **Target Changes / Commit**: [Commit Hash or Working Branch]
- **Overall Compliance Score**: [e.g., 100% / 85%]
- **Final Verdict**: [PASSED / FAILED / CONDITIONALLY PASSED]

## 2. Detailed Audit Breakdown

| Pillar | Status | Findings / Notes |
| :--- | :--- | :--- |
| **Component Reusability** | [PASS / FAIL / WARN] | [Details] |
| **ApiService Centralization** | [PASS / FAIL / WARN] | [Details] |
| **State & Form Handling** | [PASS / FAIL / WARN] | [Details] |
| **Build & Test Health** | [PASS / FAIL / WARN] | [Details] |

## 3. Bugs & Blockers
- [List any breaking bugs, build errors, or severe rule violations]

## 4. Recommended Fixes
- [Actionable step-by-step instructions to resolve any identified issues]

## 5. Final Verdict
**[PASSED / FAILED / CONDITIONALLY PASSED]** - [Brief summary statement]
```
