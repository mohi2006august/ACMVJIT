---
layout: "../../layouts/CheatsheetLayout.astro"
title: "JavaScript ES6+ Essentials"
description: "Modern JS features, array methods, promises, and destructuring."
---

## Variables and Scope

Avoid using `var`. Use `let` for variables that change, and `const` for variables that don't.

```javascript
const API_URL = "https://api.example.com"; // Cannot be reassigned
let counter = 0; // Can be reassigned

// Block scoping
if (true) {
  const localVal = "I only exist inside these brackets";
}
```

## Arrow Functions

Arrow functions provide a shorter syntax and inherently bind `this` to the surrounding context.

```javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => {
  return a + b;
};

// Implicit return (no brackets needed for single expressions)
const multiply = (a, b) => a * b;
```

## Destructuring & Spread Operator

> [!TIP]
> Destructuring makes it incredibly easy to extract properties from objects and arrays into distinct variables.

```javascript
// Object Destructuring
const user = { name: 'Alice', age: 25, role: 'Admin' };
const { name, role } = user; // Extracts name and role

// Array Destructuring
const coordinates = [10, 20, 30];
const [x, y] = coordinates; // x = 10, y = 20

// Spread Operator (Arrays)
const arr1 = [1, 2];
const combined = [...arr1, 3, 4]; // [1, 2, 3, 4]

// Spread Operator (Objects)
const updatedUser = { ...user, age: 26 }; 
```

## Array Methods

Modern JavaScript relies heavily on functional array methods rather than `for` loops.

| Method | Description | Returns |
|--------|-------------|---------|
| `.map()` | Transforms every item in the array | A new array |
| `.filter()` | Keeps items that pass a condition | A new array |
| `.find()` | Finds the first item that passes a condition | A single item (or undefined) |
| `.reduce()` | Accumulates array values into a single value | A single value |

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]
const sum = numbers.reduce((total, n) => total + n, 0); // 15
```

## Promises and Async/Await

Handling asynchronous code cleanly without callback hell.

```javascript
// Using async/await (Modern approach)
async function fetchUser() {
  try {
    const response = await fetch('https://api.github.com/users/github');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
```
