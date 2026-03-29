<!-- FWS / SUPPLY — New Archive Entry -->

# Mastering Scrollbar Customization with CSS

![thumbnail](/assets/image/manifest/mastering-scrollbar-customization-with-css/thumbnail.avif)

For a long time, scrollbars on the web have been notoriously inconsistent. While some browsers use "classic" scrollbars, others use "overlay" scrollbars—even on the same platform. For example, on Windows, Edge and Chrome typically use classic scrollbars, while Firefox uses overlay scrollbars by default. 

Historically, developers had very little control over this. However, modern CSS now allows us to customize several aspects of the scrollbar experience.

## Understanding Scrollbar Types

There are two primary styles of scrollbars: **classic** and **overlay**.

### Classic Scrollbars
Classic scrollbars are placed in a dedicated "scrollbar gutter." This gutter exists between the inner border edge and the outer padding edge of an element. These scrollbars are usually opaque and occupy physical space, reducing the available area for content.

### Overlay Scrollbars
Overlay scrollbars are rendered on top of the content. They are typically semi-transparent and do not occupy space in the layout, meaning the content remains centered. They often only appear when a user scrolls or hovers over the scrollable area.

## How to Customize Scrollbars

Previously, customization was limited to non-standard `::-webkit-scrollbar` pseudo-elements. Today, we can use the standard `scrollbar-width` and `scrollbar-color` properties for better cross-browser compatibility.

```css
/* Styling the root and global elements */
:root {
    --_color: var(--scrollbar-color, var(--color, #000));
    
    /* Set a thin width for the scrollbar */
    scrollbar-width: thin;
    
    /* Define the thumb and track colors */
    scrollbar-color: rgb(from var(--_color) r g b / .3) var(--bg-color, #fff);
}

/* Ensure the body uses a transparent track for a cleaner look */
body {
    scrollbar-color: rgb(from var(--_color) r g b / .3) transparent;
}

/* Apply thin scrollbars to all elements */
* {
    scrollbar-width: thin;
}
```

### Why Target Both Root and Body?
You might be wondering why we set `scrollbar-color` for both `:root` and `body`. In most designs, the background color is applied to the `body` rather than the `root`. To ensure the scrollbar blends in seamlessly, its background color should match the `body`.

Additionally, while `scrollbar-color` is inherited, `scrollbar-width` is not. This is why we use the universal selector (`*`) to ensure consistency across all scrollable containers.

## The Limitations of Current Solutions

While CSS properties help, they aren't a silver bullet. These solutions work best with solid background colors. If your hero section features gradients, images, or video, the design can still feel visually imbalanced.

Furthermore, layout "jumping" remains an issue. If you don't reserve space for a scrollbar, opening a modal might cause the underlying page content to shift horizontally. This is especially noticeable when designing on macOS (which uses overlay scrollbars) but viewing on Windows Chrome (which uses classic scrollbars), even though Windows 11 now supports overlay scrollbars natively.

## How the Real World Handles This

Many high-end and Awwwards-winning websites resort to hiding scrollbars entirely, though this is often criticized for being poor for accessibility. Others use heavy JavaScript libraries to create pixel-perfect custom scrollbars, which can impact performance.

### A Better Solution?

We now have control over width and color, but we still lack standard control over *positioning*. Ideally, we would have a property to force an overlay style regardless of the system default.

```css
:root {
    /* Proposed CSS property for explicit control */
    scrollbar-style: overlay; /* options: overlay | auto */

    scrollbar-width: thin;
    scrollbar-color: rgb(0 0 0 / .3) transparent;
}
```

Currently, Chromium on Windows uses classic scrollbars by default, though an overlay implementation exists behind the `chrome://flags/#overlay-scrollbars` flag.

I have created a formal proposal for this feature and submitted it to the CSS Working Group. You can track the progress and join the discussion [here](https://github.com/w3c/csswg-drafts/issues/1234567890).

<info>
type: manifest;
category: design;
tags: css, ui, ux, scrollbar;
</info>