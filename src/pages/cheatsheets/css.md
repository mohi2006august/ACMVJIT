---
layout: "../../layouts/CheatsheetLayout.astro"
title: "CSS Grid & Flexbox"
description: "Visual layouts, alignment, and responsive design properties."
---

## CSS Flexbox

Flexbox is designed for 1-dimensional layouts (either a row OR a column).

> [!TIP]
> Use Flexbox when you want to align items in a single direction and distribute space evenly.

```css
.flex-container {
  display: flex;
  
  /* Direction: row (default), column, row-reverse, column-reverse */
  flex-direction: row; 
  
  /* Wrapping: nowrap (default), wrap, wrap-reverse */
  flex-wrap: wrap;
  
  /* Aligning along the MAIN axis (horizontal if flex-direction is row) */
  /* flex-start, flex-end, center, space-between, space-around, space-evenly */
  justify-content: center;
  
  /* Aligning along the CROSS axis (vertical if flex-direction is row) */
  /* stretch, flex-start, flex-end, center, baseline */
  align-items: center;
  
  /* Gap between items */
  gap: 16px;
}
```

## Flex Items

```css
.flex-item {
  /* Grow to fill available space (0 = don't grow, 1 = grow) */
  flex-grow: 1;
  
  /* Shrink if container is too small */
  flex-shrink: 0;
  
  /* Default size before growing/shrinking */
  flex-basis: 200px;
  
  /* Shorthand for grow, shrink, basis */
  flex: 1 0 200px;
  
  /* Override align-items for a specific item */
  align-self: flex-end;
}
```

## CSS Grid

Grid is designed for 2-dimensional layouts (both rows AND columns simultaneously).

```css
.grid-container {
  display: grid;
  
  /* Define 3 columns: 200px, responsive middle, 200px */
  grid-template-columns: 200px 1fr 200px;
  
  /* Define row heights */
  grid-template-rows: auto 1fr auto;
  
  /* Creates as many 250px columns as will fit, wrapping nicely! */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  
  /* Space between grid cells */
  gap: 20px;
}
```

## Grid Items

```css
.grid-item {
  /* Span across 2 columns */
  grid-column: span 2;
  
  /* Start at column line 1, end at line 4 */
  grid-column: 1 / 4;
  
  /* Span across 2 rows */
  grid-row: span 2;
}
```
