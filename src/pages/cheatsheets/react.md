---
layout: "../../layouts/CheatsheetLayout.astro"
title: "React.js Core Concepts"
description: "Hooks, state management, context API, and component lifecycles."
---

## Functional Components

React components are JavaScript functions that return JSX.

```jsx
import React from 'react';

const UserProfile = ({ name, role }) => {
  return (
    <div className="profile-card">
      <h1>{name}</h1>
      <p>Role: {role}</p>
    </div>
  );
};

export default UserProfile;
```

## useState Hook

`useState` allows functional components to manage local state.

> [!WARNING]
> Never modify state directly (e.g., `count = count + 1`). Always use the setter function provided by the hook.

```jsx
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

## useEffect Hook

`useEffect` handles side effects like fetching data, subscriptions, or manually changing the DOM.

| Dependency Array | Behavior |
|------------------|----------|
| `useEffect(() => {...})` | Runs on **every** render |
| `useEffect(() => {...}, [])` | Runs **only once** on mount |
| `useEffect(() => {...}, [x])`| Runs only when `x` changes |

```jsx
import { useState, useEffect } from 'react';

const UserData = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This runs when the component mounts, or when userId changes
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
      
    // Optional Cleanup function (runs on unmount)
    return () => {
      console.log("Cleanup");
    };
  }, [userId]);

  if (!user) return <p>Loading...</p>;
  return <div>{user.name}</div>;
};
```

## Context API

Avoid "prop drilling" by sharing state globally across the component tree.

```jsx
import { createContext, useContext } from 'react';

// 1. Create Context
const ThemeContext = createContext('light');

// 2. Provide Context
const App = () => (
  <ThemeContext.Provider value="dark">
    <ChildComponent />
  </ThemeContext.Provider>
);

// 3. Consume Context
const ChildComponent = () => {
  const theme = useContext(ThemeContext);
  return <div className={`theme-${theme}`}>Current theme: {theme}</div>;
};
```
