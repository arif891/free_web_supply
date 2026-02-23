<!-- FWS / SUPPLY — New Archive Entry -->

# Overlapping Page Transition

![thumbnail](/assets/image/inventory/overlapping-page-transition/thumbnail.avif)

A cinematic page transition for Multi-Page Applications (MPA) that creates a layered "sheet" effect, where the new page slides up and scales into view over the previous one.

## Overview

This implementation leverages the native **Cross-Document View Transition API** to enable app-like motion between actual HTML pages. Unlike traditional SPAs that require complex routing logic, this unit uses CSS pseudo-elements (`::view-transition-new` and `::view-transition-old`) to orchestrate a sophisticated "overlapping" animation. By scaling down the departing page slightly and sliding the incoming page from the bottom, it provides a sense of physical depth and hierarchy.

## Key Features

- **Native MPA Support**: Seamless transitions across standard page navigations (`@view-transition: auto`).
- **Layered Depth**: Orchestrated scaling and translation creates a "stacked" visual metaphor.
- **Performance Optimized**: Zero JavaScript required for the transition itself, running entirely on the browser's compositor thread.
- **Speculation Rules Ready**: Designed to work perfectly with the Speculation Rules API for instant, lag-free transitions.

## Technical Specifications

| Parameter   | Value                                   |
| :---------- | :-------------------------------------- |
| **Logic**   | CSS View Transitions API                |
| **Styling** | Vanilla CSS                             |
| **APIs**    | `@view-transition`, `::view-transition` |
| **Payload** | ~0.5 KB                                 |

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

    /* Overlay effect on the old page */
    &::before {
        content: '';
        position: fixed;
        inset: 0;
        background-color: rgb(from currentColor r g b / .3);
        opacity: 0;
        pointer-events: none;
        view-transition-name: tbg;
    }
}

::view-transition-old(root) {
    animation: none;
}

::view-transition-new(root) {
    scale: .75;
    translate: 0 100%;
    animation: pageIn var(--page-transition-duration) var(--page-transition-timing) forwards;
}

::view-transition-old(tbg) {
    animation: bgShow var(--page-transition-duration) var(--page-transition-timing) forwards;
}

::view-transition-new(tbg) {
    display: none;
}

@keyframes pageIn {
    100% {
        translate: 0 0;
        scale: 1;
    }
}

@keyframes bgShow {
    100% {
        opacity: 1;
    }
}
```

## Integration

1. **Include Styles**: Copy the CSS block into your global stylesheet or include it as a separate link tag on all pages.
2. **Enable Transition**: Ensure the `@view-transition { navigation: auto; }` rule is present to allow cross-document transitions.
3. **Optional (Performance)**: Use the Speculation Rules API to prerender links for an even more instantaneous interaction.

<info>
type: inventory;
category: transition;
tags: view-transition css mpa motion;
preview: /assets/image/inventory/overlapping-page-transition/preview.avif;
demo: /pages/demo/overlapping-page-transition/;
</info>