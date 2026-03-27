<!-- FWS / SUPPLY — New Archive Entry -->

# Draw SVG Path on Scroll

![thumbnail](/assets/image/inventory/draw-svg-path-on-scroll/thumbnail.avif)

An ultra-lightweight, high-performance technique for drawing SVG paths based on the user's scroll position using CSS Scroll-Driven Animations.

## Overview

Traditional scroll-based SVG drawing often relies on heavy JavaScript event listeners that can impact frame rates. This implementation utilizes the modern CSS `view-timeline` API to link SVG path animations directly to the scroll progress of an element. By setting `pathLength="1"` on the SVG path and animating `stroke-dashoffset` from 1 to 0, we achieve a perfectly synchronized drawing effect that is handled by the browser's compositor thread, ensuring buttery-smooth 60fps performance.

## Key Features

- **Pure CSS**: No JavaScript overhead or scroll-jacked listeners.
- **GPU Accelerated**: Animations run on the compositor thread for maximum fluidity.
- **Path Independent**: Works with complex shapes, hand-drawn illustrations, and continuous paths.
- **Adaptive**: Automatically scales with viewport changes and scroll velocity.

## Technical Specifications

| Parameter | Value |
| :--- | :--- |
| **Logic** | CSS Scroll-Driven Animations |
| **Styling** | Vanilla CSS |
| **APIs** | View Timeline API |
| **Payload** | < 400 bytes |

## Implementation

### 1. Structure

```html
<svg class="svg-container" viewBox="0 0 100 100">
    <!-- Essential: pathLength="1" allows using 0-1 values in CSS -->
    <path class="animated-path" pathLength="1" d="..." />
</svg>
```

### 2. Structural CSS
```css
.svg-container {
    view-timeline: --svg-scroll;
    overflow: visible;

    .animated-path {
        stroke: #fff;
        stroke-width: 2px;
        stroke-dashoffset: 1; /* Fully hidden initially */
        stroke-dasharray: 1;  /* Match total path length (1) */
        stroke-linecap: round;
        
        /* Animation linked to scroll timeline */
        animation: draw-path linear both;
        animation-timeline: --svg-scroll;
        animation-range: cover contain;
    }
}

@keyframes draw-path {
    to {
        stroke-dashoffset: 0; /* Fully drawn */
    }
}
```

## SVG Path Creation & Workflow

To create paths optimized for these scroll effects, follow these best practices across design tools:

### Figma / Illustrator Best Practices
1. **Pen Tool Precision**: Draw your path using the Pen tool. 
   - **CRITICAL**: Avoid "Outline Stroke" or "Expand". If you convert the line into a closed shape (a fill), you lose the ability to animate its drawing progress. Keep it as a stroke.
2. **Simplified Path Data**: In Illustrator, use `Object > Path > Simplify` to reduce anchor points. Fewer points = smaller `d="..."` values and smoother rendering.
3. **The `pathLength` Trick**: Always include `pathLength="1"` in your SVG code. This normalizes the path to a value of 1, removing the need for `getTotalLength()` in JavaScript.

### Advanced Optimization
- **SVGOMG**: Always run your exported SVG through [SVGOMG](https://jakearchibald.github.io/svgomg/). It strips proprietary metadata (from Figma/Inkscape) and optimizes the path data for production.
- **Inkscape**: If using Inkscape, use the `Path > Simplify` (Ctrl+L) feature to clean up hand-drawn paths.

## Integration

1. **Step One**: Insert the SVG into your HTML structure, ensuring the path has the `pathLength="1"` attribute.
2. **Step Two**: Apply the `view-timeline` to the parent container to define the scroll-driven scope.
3. **Step Three**: Use the `draw-path` keyframe animation to synchronize the `stroke-dashoffset` with the scroll timeline.

<info>
type: inventory;
category: animation;
tags: css scroll svg;
preview: /assets/image/inventory/draw-svg-path-on-scroll/preview.avif;
demo: /pages/demo/draw-svg-path-on-scroll;
</info>