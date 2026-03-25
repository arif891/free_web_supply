<!-- FWS / SUPPLY — New Archive Entry -->

# Horizontal Scroll Section

![thumbnail](/assets/image/inventory/horizontal-scroll-section/thumbnail.avif)

A high-performance CSS-only unit designed to translate content horizontally during vertical scroll, providing an immersive experience without JavaScript overhead.

## Overview

The Horizontal Scroll Section leverages modern CSS `view-timeline` to create a smooth, performant horizontal translation of content as the user scrolls vertically. This implementation replaces traditional, resource-intensive JavaScript scroll listeners with native browser logic, ensuring zero-bloat performance and buttery-smooth frame rates.

## Key Features

- **Native CSS Animation**: Powered by `view-timeline` and `animation-timeline` for hardware-accelerated transitions.
- **Sticky Viewport Locking**: Keeps content anchored to the viewport throughout the duration of the horizontal movement.
- **Progressive Enhancement**: Provides a robust vertical fallback for browsers that do not yet support CSS scroll-driven animations.
- **Ultra-Lightweight**: Minimal code footprint with zero external dependencies.

## Technical Specifications

| Parameter | Value |
| :--- | :--- |
| **Logic** | CSS View Timeline |
| **Styling** | Vanilla CSS (Modern Syntax) |
| **APIs** | `view-timeline`, `animation-timeline` |
| **Payload** | < 1KB |

## Implementation

### 1. Structural CSS
```css
/* Container defines the scroll height/duration */
.horizontal-scroll-section {
    height: 250vh;
    view-timeline: --hs-sec;

    /* Sticky container stays in view during horizontal scroll */
    .sticky {
        position: sticky;
        top: 0;
        height: 100vh;
        max-width: 100%;
        overflow-x: hidden;

        /* Wrapper moves horizontally based on scroll progress */
        .wrapper {
            display: flex;
            width: fit-content;
            animation: move linear both;
            animation-timeline: --hs-sec;
            animation-range: contain;
        }
    }
}

/* Keyframes for horizontal translation */
@keyframes move {
    to {
        translate: calc(-100% + 100vw) 0;
    }
}

/* Fallback for legacy browsers or those lacking scroll-animation support */
@supports not (animation-timeline: view()) {
    .horizontal-scroll-section {
        height: auto;

        .sticky {
            position: static;
            height: auto;

            .wrapper {
                width: auto;
                flex-direction: column;
                animation: none;
            }
        }
    }
}
```

<info>
type: inventory;
category: animation;
tags: css scroll animation;
demo: /pages/demo/horizontal-scroll-section;
preview: /assets/image/inventory/horizontal-scroll-section/preview.avif;
</info>