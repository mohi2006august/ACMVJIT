---
layout: "../../layouts/CheatsheetLayout.astro"
title: "Regex Patterns Quick Start"
description: "Quickly craft regular expressions for validation and parsing."
---

## Character Classes

Character classes match a single character from a specified set.

| Pattern | Description |
|---------|-------------|
| `\d` | Matches any digit (equivalent to `[0-9]`) |
| `\w` | Matches any word character (letters, numbers, underscores) |
| `\s` | Matches any whitespace character (space, tab, newline) |
| `\D` | Matches any NON-digit |
| `\W` | Matches any NON-word character |
| `.` | Matches ANY character except newline |

## Quantifiers

Quantifiers specify how many times the preceding element should match.

| Pattern | Description |
|---------|-------------|
| `*` | 0 or more times |
| `+` | 1 or more times |
| `?` | 0 or 1 time (optional) |
| `{3}` | Exactly 3 times |
| `{3,}` | 3 or more times |
| `{3,5}` | 3 to 5 times |

## Anchors and Boundaries

```text
^     # Start of string (or line in multi-line mode)
$     # End of string (or line in multi-line mode)
\b    # Word boundary (matches position between \w and \W)
```

## Common Practical Regex Patterns

> [!IMPORTANT]
> Always test your regex patterns using tools like [regexr.com](https://regexr.com) before putting them into production!

### Email Validation
```regex
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

### Password Strength
(Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number)
```regex
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$
```

### URL Extraction
```regex
^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$
```

### Extracting Hex Colors
```regex
^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
```

### Groups and Capturing
Use parentheses `()` to group parts of a pattern together and extract them.

```text
# Match a date in YYYY-MM-DD format and capture the parts
(\d{4})-(\d{2})-(\d{2})
```
