# FWS / SUPPLY — The Vanilla Standard

![FWS Logo](/assets/image/base/default_thumbnail.avif)

> **"Redefining web architecture through raw logic and the absence of excess."**

**FWS / SUPPLY** is an archive of raw web logic, stripped of bloat and engineered for maximum performance. It is a system designed to curate high-performance web components and documentation while maintaining strict adherence to "Vanilla" standards and 0-radius geometric precision.

## 📐 Philosophy: The Core Protocol

1.  **Vanilla Integrity**: We prioritize native web standards. No heavy frameworks, no unnecessary abstractions. Just pure, audited logic that runs natively in the browser.

2.  **Geometric Precision**: Our aesthetic is a byproduct of mathematical order. 0-radius geometry reflects a refusal to "round off" the edges of digital reality.

3.  **Archive Purpose**: Every 'Supply' unit is engineered for a specific, vital function within a larger system. We don't build bloat; we curate solutions.

---

## 🛠️ Main Engine & Tech Stack

The system is powered by a custom-built processing engine that transforms raw markdown records into high-performance static HTML.

-   **Logic**: [Vanilla JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
-   **Structure**: [LayX Framework](https://github.com/arif891/layx) (Custom structural layout protocol)
-   **Styling**: Modern CSS (Variables, Grid, Flexbox)
-   **Build Tools**: [Node.js](https://nodejs.org/), [esbuild](https://esbuild.github.io/), [sharp](https://sharp.pixelplumbing.com/)

---

## 🏗️ Project Architecture

```text
├── build/          # Core engine & markdown processing logic
├── pages/          # Generated static site directory
│   ├── inventory/  # Technical units and components (Raw Logic)
│   └── manifest/   # Documentation and system records (Articles)
├── src/            # Layx framework build script
├── layx/           # The structural layout framework powering the system
├── assets/         # Shared resources (CSS, JS, Fonts, Images)
├── template.md     # Entry point for adding new archive records
└── build.mjs       # Build script entry (legacy/wrapper)
```

---

## 🚀 Operations: Getting Started

### 1. Installation
Ensure you have [Node.js](https://nodejs.org/) (Latest LTS) installed. Clone the archive and initialize dependencies:

```bash
npm install
```

### 2. Adding New Content
To inject a new unit into the archive, use the `template.md` as your blueprint. Update the metadata block at the bottom:

```markdown
# Your Logic Unit Title

![thumbnail](/assets/path/to/image.webp)

Detailed explanation of the unit...

<info>
type: manifest;    // inventory = component, manifest = article
category: your-cat;
tags: tag1 tag2;
</info>
```

### 3. Executing the Build
Run the system build to process markdown into static HTML and update the manifest:

```bash
node build.mjs
```

The system will:
- Generate a unique ID for the item.
- Create a slug-based permanent URL.
- Process markdown into responsive HTML.
- Update the Home page with the last 6 inventory and 4 manifest items.
- Update the Inventory and Manifest index pages.

---

## 🛠️ Requirements

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- A local dev server (e.g., running on `localhost`)

---

## 📡 Deployment & Testing

The project is configured for seamless deployment on platforms like **Vercel** or any static hosting provider.

- **Local Preview**: Use a local dev server (e.g., [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)) running on `localhost`.

---

## 🤝 Contribution Protocol

The FWS / Supply archive is an open node. We require architects to fortify the vanilla standard.
1. Fork the repository.
2. Create a new entry using `template.md`.
3. Submit your logic to the core via a Pull Request.

---

© 2026 FWS / SUPPLY. All rights reserved.
*Built for the high-performance web.*
