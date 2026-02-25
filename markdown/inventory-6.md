<!-- FWS / SUPPLY — New Archive Entry -->

# Cross Fade Page Transition

![thumbnail](/assets/image/inventory/cross-fade-page-transition/thumbnail.avif)

A minimalist, high-performance cross-fade transition for Multi-Page Applications (MPAs) using the View Transitions API.

## Overview

This implementation leverages the native browser View Transitions API to create smooth, app-like transitions between traditional HTML pages. By utilizing `@view-transition` with `navigation: auto`, it enables seamless visual continuity without requiring a Single Page Application (SPA) architecture or heavy JavaScript libraries. It essentially captures a snapshot of the current state and blends it with the incoming page state.

## Key Features

- **Native Performance**: Uses browser-native APIs for buttery-smooth animations.
- **MPA Compatibility**: Works across different HTML files via the `@view-transition` rule.
- **Zero JavaScript**: Achieves high-quality transitions using pure CSS.
- **Configurable**: Easily adjust duration and timing functions via CSS variables.
- **Accessibility Minded**: Wrapped in a `@media (prefers-reduced-motion)` query to respect user system preferences.

## Technical Specifications

| Parameter   | Value                |
| :---------- | :------------------- |
| **Logic**   | Native Browser API   |
| **Styling** | Vanilla CSS          |
| **APIs**    | View Transitions API |
| **Payload** | < 0.5KB              |

## Implementation

### 1. Structural CSS
```css
@media (prefers-reduced-motion: no-preference) {
    @view-transition {
        navigation: auto;
    }
}

:root {
    --page-transition-duration: .8s;
    --page-transition-timing: cubic-bezier(.165, .84, .44, 1);
}

::view-transition-group(root) {
    animation-timing-function: var(--page-transition-timing);
    animation-duration: var(--page-transition-duration);
}
```

## Integration

1. **Include CSS**: Link the transition stylesheet in the `<head>` of all participating pages.
2. **Standardize Layout**: Ensure consistent layout structures (like navigation bars) to maximize the "seamless" feel.
3. **Optional Optimization**: Use the [Speculation Rules API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API) (as shown in the demo) to prerender pages for instantaneous transitions.

<info>
type: inventory;
category: transition;
tags: page-transition css mpa motion;
demo: /pages/demo/cross-fade-page-transition;
preview: /assets/image/inventory/cross-fade-page-transition/preview.avif;
</info>