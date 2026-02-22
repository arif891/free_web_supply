<!-- FWS / SUPPLY — New Archive Entry -->

# Wipe Page Transition

![thumbnail](/assets/image/inventory/wipe-page-transition/thumbnail.avif)

A high-performance, Wipe page transition system engineered for Multi-Page Applications (MPAs). This unit leverages the native `Cross-Document View Transition API` to deliver fluid, app-like navigation without the overhead of client-side routing or complex JavaScript libraries.

## Overview

This implementation creates a seamless "Wipe" effect where the incoming page slides vertically to cover the current content. By utilizing the native browser transition engine, it ensures optimal performance and a professional, polished feel for standard multi-page websites.

## Key Features

- **Native Performance**: Leverages the browser's optimized rendering engine for ultra-smooth 60fps transitions.
- **Zero Overhead**: Achieves complex animation effects using pure CSS and standard Web APIs—no heavy JS required.
- **Accessibility Built-in**: Automatically respects `prefers-reduced-motion` settings to ensure a comfortable experience for all users.
- **Deeply Customizable**: Exposed CSS variables allow for easy adjustments to duration, easing, and colors.

## Technical Specifications

| Parameter   | Value                                 |
| :---------- | :------------------------------------ |
| **Logic**   | Cross-Document View Transition API    |
| **Styling** | Vanilla CSS3 (Modern)                 |
| **APIs**    | View Transitions, Keyframe Animations |
| **Payload** | < 1KB (Gzipped)                       |

## Implementation

### 1. Structural CSS
```css
@media (prefers-reduced-motion: no-preference) {
    @view-transition {
        navigation: auto;
    }
}

:root {
    --page-transition-duration: 0.8s;
    --page-transition-timing: cubic-bezier(0.7, 0, 0.3, 1);
    --wipe-bg: #f0f8ff; /* aliceblue */

    &::after {
        content: '';
        position: fixed;
        inset: 0;
        background-color: var(--wipe-bg);
        translate: 0 100%;
        view-transition-name: cover;
    }
}

::view-transition-old(root) {
    animation: pageOut var(--page-transition-duration) var(--page-transition-timing) forwards;
}

::view-transition-new(root) {
    translate: 0 100%;
    animation: pageIn var(--page-transition-duration) var(--page-transition-timing) forwards;
}

::view-transition-old(cover) {
    animation: coverSlide var(--page-transition-duration) var(--page-transition-timing) forwards;
}

::view-transition-new(cover) {
    display: none;
}

@keyframes coverSlide {
    100% {
        translate: 0 -200%;
    }
}

@keyframes pageOut {
    100% {
        translate: 0 -100%;
    }
}

@keyframes pageIn {
    100% {
        translate: 0 0;
    }
}
```


## Integration

1. **Include CSS**: Add the provided CSS to your site's global stylesheet.
2. **Verify**: Ensure your browser supports View Transitions (Chromium-based browsers currently offer full support) and navigate between pages to see the effect.

<info>
type: inventory;
category: transition;
tags: view-transition css mpa motion;
demo: /pages/demo/wipe-page-transition;
preview: /assets/image/inventory/wipe-page-transition/preview.avif;
</info>