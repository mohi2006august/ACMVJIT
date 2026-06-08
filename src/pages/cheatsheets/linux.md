---
layout: "../../layouts/CheatsheetLayout.astro"
title: "Linux Terminal Guide"
description: "Essential bash commands for navigation, permissions, and process management."
---

## Directory Navigation

Move around your file system quickly without taking your hands off the keyboard.

| Command | Description |
|---------|-------------|
| `pwd` | Print working directory (where you are) |
| `ls` | List files and directories |
| `ls -la` | List all files, including hidden (`.`), with details |
| `cd <dir>` | Change directory to `<dir>` |
| `cd ..` | Move up one directory level |
| `cd ~` | Move to your home directory |

## File Management

```bash
# Create a new empty file
touch filename.txt

# Create a new directory
mkdir new_folder

# Remove a file
rm filename.txt

# Remove a directory and its contents recursively
rm -rf folder_name/

# Copy a file
cp source.txt destination.txt

# Copy a directory recursively
cp -r source_dir/ dest_dir/

# Move or rename a file
mv old_name.txt new_name.txt
```

## File Permissions

> [!IMPORTANT]
> The `chmod` command uses numbers to represent permissions: Read (4), Write (2), Execute (1).

```bash
# Give owner read/write/execute (7), group and others read/execute (5)
chmod 755 filename.sh

# Give owner read/write (6), everyone else read-only (4)
chmod 644 document.txt

# Make a script executable for the owner
chmod u+x script.sh
```

## Process Management

```bash
# View all currently running processes
top

# View a snapshot of running processes
ps aux

# Kill a process by its PID (Process ID)
kill 1234

# Force kill a process
kill -9 1234

# Kill a process by its name
pkill node
```

## Text Processing

```bash
# View the contents of a file
cat file.txt

# View file contents interactively (scrollable)
less file.txt

# Search for a pattern inside a file
grep "search_term" file.txt

# Search for a pattern recursively in a directory
grep -r "search_term" src/

# View the last 10 lines of a file
tail file.txt

# Follow a file in real-time (useful for logs)
tail -f app.log
```
