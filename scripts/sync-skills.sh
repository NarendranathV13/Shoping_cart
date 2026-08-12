#!/usr/bin/env bash

# Synchronize Antigravity, Cursor, and Claude agent skills in Shopping_cart repository

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

ANTIGRAVITY_SKILLS="$ROOT_DIR/.antigravity/skills"
CURSOR_SKILLS="$ROOT_DIR/.cursor/skills"
CLAUDE_SKILLS="$ROOT_DIR/.claude/skills"
AGENT_DIR="$ROOT_DIR/.agent"

echo "=== Syncing AI Skills for Shopping_cart (Antigravity, Cursor, Claude) ==="

mkdir -p "$ANTIGRAVITY_SKILLS"
mkdir -p "$CURSOR_SKILLS"
mkdir -p "$CLAUDE_SKILLS"
mkdir -p "$AGENT_DIR"

# 1. Clean up any legacy duplicate subfolders
find "$CURSOR_SKILLS" -mindepth 1 -maxdepth 1 -type d -exec rm -rf {} +
find "$CLAUDE_SKILLS" -mindepth 1 -maxdepth 1 -type d -exec rm -rf {} +

# 2. Copy markdown files from .antigravity/skills to .cursor/skills and .claude/skills
for file in "$ANTIGRAVITY_SKILLS"/*.md; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        skill_name="${filename%.md}"
        
        # Copy to .cursor/skills/ and .claude/skills/
        cp -f "$file" "$CURSOR_SKILLS/$filename"
        cp -f "$file" "$CLAUDE_SKILLS/$filename"
        
        echo "  [OK] Synced skill: $skill_name -> (.cursor & .claude)"
    fi
done

# 3. Re-create workspace symlink .agent/skills -> ../.antigravity/skills
ln -sfn ../.antigravity/skills "$AGENT_DIR/skills"
echo "  [OK] Recreated symlink: .agent/skills -> ../.antigravity/skills"

echo "=== Sync Complete! ==="
