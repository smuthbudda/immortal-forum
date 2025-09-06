# Update Container

Updates the devcontainer with latest changes from the upstream Claude Code repository.

This command:
1. Fetches latest changes from the upstream repository (anthropics/claude-code)
2. Merges upstream changes while preserving local customizations
3. Handles any merge conflicts that may arise
4. Commits the merge with a descriptive message

## Usage

```
/update-container
```

## Implementation

```bash
# Fetch latest changes from upstream
git fetch upstream

# Check if there are any uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "You have uncommitted changes. Please commit or stash them first."
    git status
    exit 1
fi

# Merge upstream changes
echo "Merging upstream changes from anthropics/claude-code..."
if git merge upstream/main --no-edit; then
    echo "✅ Successfully merged upstream changes"
    echo "📋 Summary of changes:"
    git log --oneline HEAD~1..HEAD
else
    echo "⚠️  Merge conflicts detected. Please resolve them manually:"
    git status
    echo ""
    echo "After resolving conflicts, run:"
    echo "  git add ."
    echo "  git commit"
fi
```