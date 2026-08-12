# Shopping Cart Frontend — Antigravity Skills

Agent skills for Google Antigravity IDE when working in `Shopping_cart`.

**Source of truth:** `.antigravity/skills/` and `.cursor/skills/`.  
Run `./scripts/sync-skills.sh` after updating skills to refresh all folders.

## Discovery Paths

Antigravity loads skills from:

| Scope | Path | This Project |
|-------|------|--------------|
| Workspace (official) | `.agent/skills/` | Symlink → `.antigravity/skills/` |
| Custom | `.antigravity/skills/` | Direct workspace skills directory |

Open **`Shopping_cart`** as the workspace root so skills resolve correctly.

## Skill Index

| Skill | When to use |
|-------|-------------|
| `component-reusability-guide` | Any UI component development, component inventory scan, pure props pattern |
| `api-service-guide` | Centralized `src/ApiService/index.js` network calls, interceptors, error alerts |
| `redux-formik-guide` | Redux Toolkit state slices & Formik + Yup form handling |
| `skill-compliance-review` | Auditing recent commits/changes against project skills, rules, and build integrity |


## Rules File

Entry rule: `.antigravity/rules.md`

## Maintenance

```bash
# From workspace root:
./scripts/sync-skills.sh
```

Sync copies skills between `.antigravity/skills/` and `.cursor/skills/` and recreates the `.agent/skills` symlink.
