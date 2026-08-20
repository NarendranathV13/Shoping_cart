# Master Developer Guide: Antigravity, Cursor & Claude Alignment

This guide documents the mirrored structure, discovery rules, and maintenance workflows across **`.antigravity/`**, **`.cursor/`**, and **`.claude/`** environments.

---

## 1. Directory Structure Comparison

All three environments follow an aligned structure separating high-level **Rules** from practical **Skills**:

```
Shopping_cart/
├── .antigravity/
│   ├── README.md                              # Antigravity discovery documentation
│   ├── rules.md                               # Universal operational rules
│   └── skills/                                # Antigravity skill playbooks
│
├── .cursor/
│   ├── README.md                              # Cursor discovery documentation
│   ├── rules/                                 # Cursor MDC entry rules
│   └── skills/                                # Cursor skill playbooks
│
├── .claude/
│   ├── README.md                              # Claude environment documentation
│   ├── CLAUDE.md                              # Claude entry rule configuration
│   └── skills/                                # Claude skill playbooks
│
├── CLAUDE.md                                  # Root Claude entry point
├── .agent/
│   └── skills -> ../.antigravity/skills       # Official Antigravity workspace symlink
│
├── scripts/
│   └── sync-skills.sh                         # Synchronization script for all 3 environments
│
└── docs/
    ├── AI_SKILLS_AND_RULES_GUIDE.md           # Master documentation guide
    └── AI_PROMPTS.md                          # Team prompt playbook for creation & review
```

---

## 2. Discovery Paths

| Framework / IDE | Primary Skills Path | Backup / Symlink Path | Configuration File |
| :--- | :--- | :--- | :--- |
| **Google Antigravity** | `.antigravity/skills/` | `.agent/skills/` (Symlink) | `.antigravity/rules.md` |
| **Cursor** | `.cursor/skills/` | `.cursor/rules/*.mdc` | `.cursor/rules/react-frontend.mdc` |
| **Claude Code / Desktop** | `.claude/skills/` | Root `CLAUDE.md` | `.claude/CLAUDE.md` |

---

## 3. Skills Index & Code Examples Overview

| Skill Guide File | Primary Purpose | Code Examples Provided |
| :--- | :--- | :--- |
| **`component-reusability-guide.md`** | UI layout, common & Shadcn UI component inventory, reusability rules | Page view composing `<Navbar1 />`, `<Spinner />`, `<Customtoast />`, Shadcn `<Card />` & `<Button />`; building pure components. |
| **`api-service-guide.md`** | Centralized Axios requests (`src/ApiService/`) | `api.get()` with loading indicator, `api.post()` with SweetAlert2 notifications (`Swal.fire`). |
| **`redux-formik-guide.md`** | State management & form validation | `cartSlice.js` with `createSlice`; `useFormik` registration form with Yup schema validation. |
| **`skill-compliance-review.md`** | Skill compliance audit & commit review | Audit checklist for component reusability, Shadcn UI standards, ApiService centralization, Redux/Formik state, and build/test health. |

---

## 4. Maintenance & Synchronization

To synchronize skill files across `.antigravity/skills/`, `.cursor/skills/`, `.claude/skills/`, and refresh the `.agent/skills` symlink, run:

```bash
./scripts/sync-skills.sh
```
