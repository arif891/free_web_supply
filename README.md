# FWS / SUPPLY — The Vanilla Standard

<!-- ![FWS Logo](/assets/brand/logo.svg) -->

**FWS / SUPPLY** is an archive of raw web logic, stripped of bloat and engineered for maximum performance. It is a system designed to curate high-performance web components and documentation while maintaining strict adherence to "Vanilla" standards and 0-radius geometric precision.

## 📐 Philosophy

1.  **Vanilla Integrity**: prioritization of native web standards. No heavy frameworks, no unnecessary abstractions. Just pure logic.
2.  **Geometric Precision**: A byproduct of order. 0-radius geometry reflects a refusal to round off the edges of digital reality.
3.  **Archive Purpose**: Every 'Supply' unit is engineered for a specific, vital function within a larger system.

## 🏗️ Project Structure

-   `build/`: The core engine that processes markdown into static HTML.
-   `pages/`: The generated static site directory.
    -   `inventory/`: Technical units and components.
    -   `manifest/`: Documentation and system records.
-   `assets/`: Shared resources (CSS, JS, Fonts, Images).
-   `layx/`: The structural layout framework powering the system.
-   `template.md`: The entry point for adding new records to the archive.

## 🚀 Getting Started

### 1. Adding New Content
To add a new item to the inventory or manifest, update the `template.md` file in the root directory.

```markdown
# Your Item Heading

![thumbnail](/assets/path/to/image.webp)

<info>
type: manifest;    // or inventory
category: your-cat;
tags: tag1 tag2;
</info>

Your content in markdown format...
```

### 2. Building the Site
Run the build process to generate the HTML pages and update the index files.

```bash
node build/build.mjs
```

The system will:
- Generate a unique ID for the item.
- Create a slug-based permanent URL.
- Process markdown into responsive HTML.
- Update the Home page with the last 6 inventory and 4 manifest items.
- Update the Inventory and Manifest index pages.

## 🛠️ Requirements

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- A local dev server (e.g., running on `localhost:81`)

---
© 2026 FWS / SUPPLY. All rights reserved.
