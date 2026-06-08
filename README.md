# ACM VJIT Student Chapter Website

Welcome to the unofficial repository for the **ACM VJIT Student Chapter** website. This project is a modern, high-performance web application designed to showcase the community, events, and leadership of the chapter with premium UI aesthetics and fluid animations.

## 🚀 Tech Stack

This project is built using a lightweight but incredibly fast stack:
- **Framework**: [Astro](https://astro.build/) (Static Site Generation for maximum speed).
- **Styling**: Pure Vanilla CSS. We use a custom, modern design system featuring glassmorphism, fluid gradients, and CSS grid/flexbox layouts. No heavy CSS frameworks (like Tailwind or Bootstrap) are used, keeping the bundle size tiny and the CSS highly customizable.
- **Interactivity**: Vanilla JavaScript for scroll-reveals, terminal typing animations, and custom interactions.
- **Page Transitions**: Powered by Astro's ViewTransitions API for seamless, SPA-like navigation between pages.

## 🛠️ Getting Started

Follow these steps to get the project running on your local machine for development.

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

### Installation

1. Clone the repository (or open the project folder).
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:4321`. The server will auto-refresh whenever you save a file.

## 📂 Project Structure

Here is a quick breakdown of where everything lives so you can easily navigate the codebase:

```text
/
├── public/                # Static assets like favicons, raw images, and global fonts.
├── src/
│   ├── components/        # Reusable UI elements (e.g., Navbar.astro, Footer.astro)
│   ├── data/              # JSON files for dynamic content (e.g., leads.json)
│   ├── layouts/           # Page wrappers. Layout.astro holds the global CSS and <head> tags.
│   └── pages/             # Route files. Each .astro file here becomes a URL (e.g., index.astro -> /)
└── package.json           # Project metadata and scripts
```

## 📝 How to Edit Content

We have designed the architecture so that updating standard content is as frictionless as possible.

### Updating Institution Leads (Team)
The institution leads (shown on the home page) are powered by a JSON data file, meaning you **do not need to write HTML/CSS to update team members**.
1. Open `src/data/leads.json`.
2. Add, remove, or modify the objects in the array. 
3. Available fields:
   - `"name"`: The person's full name.
   - `"role"`: Their position (e.g., "Chairperson").
   - `"photo"`: An absolute URL or a relative path from the `public/` directory (e.g., `"/images/alex.jpg"`). If left empty `""`, the UI will automatically generate a colored fallback avatar using their first initial.

### Modifying the Global Theme (Colors & Fonts)
All global design tokens are stored as CSS variables (`--primary-color`, `--bg-color`, etc.) inside `src/layouts/Layout.astro`. To re-theme the entire website, simply adjust these root variables in the `<style is:global>` tag.

## 🧞 Available Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      | 
| `npm run build`           | Builds your production site to the `./dist/` directory |
| `npm run preview`         | Previews your production build locally           |

---
*Built with ❤️ for ACM VJIT.*
