# Shopping Cart Frontend Skills (Cursor Canonical)

**Use `.cursor/skills/` only.** These are the source of truth for Cursor agents working in `Shopping_cart`.

Entry rules:
- `.cursor/rules/react-frontend.mdc`
- `.cursor/rules/api-service-pattern.mdc`

## Skill Index

| Skill | When to use |
|-------|-------------|
| `component-reusability-guide` | Reusing existing common components (`Button`, `Spinner`, `Customtoast`, `Navbar1`, `ProductModal`) & creating pure UI components |
| `api-service-guide` | HTTP endpoints, centralized Axios execution via `src/ApiService/index.js`, error alerts |
| `redux-formik-guide` | Redux Toolkit state (`cartSlice.js`) & Formik + Yup form handling |
| `skill-compliance-review` | Auditing recent commits/changes against project skills, rules, and build integrity |


## Maintenance

Run from the project root:
```bash
./scripts/sync-skills.sh
```

Sync copies `.antigravity/skills/` ↔ `.cursor/skills/` and ensures the `.agent/skills` symlink is linked to `.antigravity/skills`.
