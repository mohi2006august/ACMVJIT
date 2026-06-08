---
layout: "../../layouts/CheatsheetLayout.astro"
title: "Python 3 Basics"
description: "List comprehensions, dictionaries, and standard library essentials."
---

## Data Structures

Python has built-in, powerful data structures.

```python
# Lists (Ordered, mutable)
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")
print(fruits[0]) # apple

# Tuples (Ordered, immutable)
coordinates = (10, 20)

# Dictionaries (Key-Value pairs)
user = {
    "name": "Alice",
    "age": 25,
    "role": "Admin"
}
print(user["name"]) # Alice
user["status"] = "Active" # Add new key

# Sets (Unordered, unique items)
unique_numbers = {1, 2, 2, 3, 3} # Evaluates to {1, 2, 3}
```

## List Comprehensions

> [!TIP]
> List comprehensions provide a concise way to create lists. They are faster and more readable than traditional `for` loops.

```python
# Traditional Loop
squares = []
for x in range(10):
    squares.append(x**2)

# List Comprehension
squares = [x**2 for x in range(10)]

# Comprehension with a condition
even_squares = [x**2 for x in range(10) if x % 2 == 0]
```

## Functions and Arguments

```python
def greet(name, greeting="Hello"):
    """This is a docstring describing the function."""
    return f"{greeting}, {name}!"

# Keyword arguments
greet(greeting="Hi", name="Bob")

# *args for variable number of positional arguments
def sum_all(*args):
    return sum(args)
    
sum_all(1, 2, 3, 4) # Returns 10

# **kwargs for variable number of keyword arguments
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")
```

## Virtual Environments

Always use virtual environments to isolate project dependencies.

```bash
# Create a virtual environment named 'venv'
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# Activate it (Mac/Linux)
source venv/bin/activate

# Install dependencies from requirements.txt
pip install -r requirements.txt

# Save current dependencies to requirements.txt
pip freeze > requirements.txt
```
