---
layout: "../../layouts/CheatsheetLayout.astro"
title: "SQL Query Patterns"
description: "Common queries, joins, and aggregations for relational database mastery."
---

## Basic CRUD Operations

The four fundamental operations in any database are Create, Read, Update, and Delete.

```sql
-- READ: Select all columns from a table
SELECT * FROM users;

-- READ: Select specific columns with a condition
SELECT id, username FROM users WHERE age > 18;

-- CREATE: Insert a new row
INSERT INTO users (username, email) VALUES ('alice', 'alice@example.com');

-- UPDATE: Modify existing rows
UPDATE users SET status = 'active' WHERE id = 1;

-- DELETE: Remove rows
DELETE FROM users WHERE status = 'inactive';
```

## Filtering and Sorting

| Keyword | Description | Example |
|---------|-------------|---------|
| `WHERE` | Filters rows based on a condition | `WHERE price > 100` |
| `ORDER BY` | Sorts the result set | `ORDER BY created_at DESC` |
| `LIMIT` | Restricts the number of returned rows | `LIMIT 10` |
| `LIKE` | Pattern matching | `WHERE name LIKE 'A%'` |
| `IN` | Matches against a list of values | `WHERE role IN ('admin', 'mod')` |

## Joins

Joins are used to combine rows from two or more tables, based on a related column between them.

> [!IMPORTANT]
> `INNER JOIN` is the most common join. It only returns rows when there is a match in **both** tables.

```sql
-- INNER JOIN: Returns records that have matching values in both tables
SELECT orders.id, users.username 
FROM orders
INNER JOIN users ON orders.user_id = users.id;

-- LEFT JOIN: Returns all records from the left table, and matched records from the right
SELECT users.username, orders.total
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
```

## Aggregation & Grouping

```sql
-- Count the total number of users
SELECT COUNT(*) FROM users;

-- Find the average price of all products
SELECT AVG(price) FROM products;

-- Find the highest salary in each department
SELECT department, MAX(salary) 
FROM employees 
GROUP BY department;

-- Filter groups using HAVING (WHERE does not work with aggregates)
SELECT department, COUNT(*) 
FROM employees 
GROUP BY department 
HAVING COUNT(*) > 5;
```
