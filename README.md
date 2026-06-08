# ACM VJIT Student Chapter Website

Welcome to the unofficial repository for the **ACM VJIT Student Chapter** website. This project is a modern, high-performance web application designed to showcase the community, events, resources, and leadership of the chapter with premium UI aesthetics and fluid animations.

Designed and developed by **MOHAMMED MOHIUDDIN**.

## ✨ Key Features

- **Premium UI/UX**: Custom design system featuring glassmorphism, dynamic fluid gradients, animated 3D network backgrounds, and responsive CSS grid/flex layouts.
- **Learning Hub (Resources)**: 
  - **Dev Tools & Cheatsheets**: Print-ready, interactive quick-reference guides for Git, Linux, Docker, SQL, JavaScript, React, Python, CSS, and Regex.
  - **Comprehensive Roadmaps**: Detailed, multi-stage learning paths for DSA Mastery, Full Stack Development, AI/ML, DevOps & Cloud, and Competitive Programming.
- **Data-Driven Architecture**: The Team (Executive Board, Core Committee, Web Masters), Events, and Gallery are powered by local JSON files for effortless content management.
- **Maximum Performance**: Powered by Astro's Static Site Generation (SSG) and ViewTransitions API for seamless, SPA-like navigation without the heavy JavaScript overhead.

## 🚀 Tech Stack

This project is built using a lightweight but incredibly fast stack:
- **Framework**: [Astro](https://astro.build/)
- **Styling**: Pure Vanilla CSS. No heavy CSS frameworks (like Tailwind or Bootstrap) are used, keeping the bundle size tiny and the CSS highly customizable.
- **Interactivity**: Vanilla JavaScript.

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
│   ├── data/              # JSON files for dynamic content (e.g., leads.json, gallery.json)
│   ├── layouts/           # Page wrappers. Layout.astro holds the global CSS and <head> tags.
│   └── pages/             # Route files. Each .astro file here becomes a URL (e.g., index.astro -> /)
│       ├── cheatsheets/   # Markdown pages for tech cheatsheets
│       └── roadmaps/      # Astro pages containing the learning paths
└── package.json           # Project metadata and scripts
```

## 📝 How to Edit Content

We have designed the architecture so that updating standard content is as frictionless as possible.

### Updating Team Members
The team pages are powered by JSON data files, meaning you **do not need to write HTML/CSS to update team members**.
- Open `src/data/leads.json` to update the top-level Institution Leads.
- Open `src/data/chapterLeads.json` to update the Executive Board, Core Committee, and Web Masters.
- Available fields generally include `"name"`, `"role"`, `"photo"`, and social links. If a photo path is left empty `""`, the UI will automatically generate a colored fallback avatar using their first initial.

### Updating the Gallery
1. Open `src/data/gallery.json`.
2. Add new objects to the array with an `"image"` URL and a `"caption"`.

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
