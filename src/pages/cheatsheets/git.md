---
layout: "../../layouts/CheatsheetLayout.astro"
title: "Git Commands Cheatsheet"
description: "Master version control with this quick reference for branches, merges, and remotes."
---

## Initializing & Cloning

Start your projects right by initializing a new repository or cloning an existing one.

```bash
# Initialize a new local Git repository
git init

# Clone an existing repository from a remote URL
git clone <url>

# Clone a specific branch
git clone -b <branch-name> <url>
```

## Staging & Committing

```bash
# Check the status of your working tree
git status

# Add a specific file to the staging area
git add <file>

# Add all changed files to the staging area
git add .

# Commit changes with a descriptive message
git commit -m "Your commit message"

# Add all tracked files and commit in one step
git commit -am "Your commit message"
```

## Branching

Branches allow you to work on new features isolated from the main codebase.

| Command | Description |
|---------|-------------|
| `git branch` | List all local branches |
| `git branch <name>` | Create a new branch |
| `git checkout <name>` | Switch to a specific branch |
| `git checkout -b <name>` | Create and switch to a new branch |
| `git branch -d <name>` | Delete a local branch safely |
| `git branch -D <name>` | Force delete a local branch |

## Pushing & Pulling

Sync your local commits with the remote repository.

```bash
# Add a remote repository URL
git remote add origin <url>

# Push local branch to remote (first time)
git push -u origin <branch-name>

# Push subsequent changes
git push

# Fetch and merge changes from the remote branch
git pull

# Pull with rebase to keep a linear history
git pull --rebase
```

## Merging & Rebasing

> [!TIP]
> Always make sure your working directory is clean before merging or rebasing!

```bash
# Merge a branch into your current active branch
git merge <branch-name>

# Rebase your current branch onto another branch
git rebase <branch-name>

# Abort a merge or rebase in case of conflicts
git merge --abort
git rebase --abort
```

## Inspecting History

```bash
# View the commit history
git log

# View a compact commit history graph
git log --oneline --graph --all

# View changes between working directory and last commit
git diff

# View changes of a specific file
git diff <file>
```
