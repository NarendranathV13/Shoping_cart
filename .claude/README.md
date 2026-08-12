# Shopping Cart Frontend Skills (Claude Environment)

Agent rules and skills for Claude Code / Claude Desktop IDE agents working in `Shopping_cart`.

**Source of truth:** `.antigravity/skills/`, `.cursor/skills/`, and `.claude/skills/`.  
Run `./scripts/sync-skills.sh` to synchronize all skill files across all environments.

## Discovery & Rules

- Root entry rule: `CLAUDE.md`
- Environment entry rule: `.claude/CLAUDE.md`
- Skills path: `.claude/skills/`

## Skill Index

| Skill | Description |
|---|---|
| `component-reusability-guide` | Reusing shared UI components (`Button`, `Spinner`, `Customtoast`, `Navbar1`, `ProductModal`) & creating pure UI components |
| `api-service-guide` | Centralized Axios requests (`src/ApiService/index.js`), interceptors, error alerts |
| `redux-formik-guide` | Redux Toolkit state slices (`cartSlice.js`) & Formik + Yup form handling |
| `skill-compliance-review` | Auditing recent commits/changes against project skills, rules, and build integrity |

## Maintenance

Run from workspace root:
```bash
./scripts/sync-skills.sh
```
