<!-- FWS / SUPPLY — New Archive Entry -->

# Direction-Aware Side Page Transition

![thumbnail](/assets/image/inventory/direction-aware-side-page-transition/thumbnail.avif)

A high-performance, direction-aware side page transition system engineered for Multi-Page Applications (MPAs). This unit leverages the native `View Transition API` and `Navigation API` to deliver fluid, app-like navigation without the overhead of a client-side router.

## Overview

Traditional MPA transitions often feel disjointed. This supply unit solves that by detecting the navigation direction (forwards vs. backwards) and applying corresponding animations. It ensures that clicking "Back" in the browser feels fundamentally different from clicking a "Next" link, creating a cohesive spatial mental model for the user.

## Key Features

- **Directional Intelligence**: Automatically detects if the user is moving forward or backward in the history stack.
- **Native Efficiency**: Zero dependencies. Runs on native browser APIs for maximum performance and minimum bundle size.
- **Reduced Motion Support**: Respects user system preferences by wrapping transitions in `prefers-reduced-motion` queries.
- **MPA Compatible**: Specifically designed for cross-document transitions, bringing SPA-level polish to static sites.

## Technical Specifications

| Parameter     | Value                               |
| :------------ | :---------------------------------- |
| **Logic**     | JavaScript (ES6+)                   |
| **Styling**   | CSS Level 4 (Nested)                |
| **APIs Used** | View Transition API, Navigation API |
| **Payload**   | < 2KB (Minified)                    |
| **Geometry**  | 0-radius Precision                  |

## Implementation

### 1. Structural CSS
The styling utilizes CSS View Transition types to toggle between `forwards` and `backwards` states. Each state handles both the outgoing (`old`) and incoming (`new`) snapshots.

```css
@media (prefers-reduced-motion: no-preference) {
    @view-transition {
        navigation: auto; /* Enable cross-document transitions */
        types: forwards, backwards;
    }
}

:root {
    --page-transition-bg: aliceblue;
    --page-transition-duration: 1.2s;
    --page-transition-timing: cubic-bezier(0.7, 0, 0.3, 1);
    background-color: var(--page-transition-bg);

    /* Forwards Transition */
    &:active-view-transition-type(forwards) {
        &::view-transition-old(root) {
            animation: page_out_right var(--page-transition-duration) var(--page-transition-timing);
        }

        &::view-transition-new(root) {
            animation: page_in_left var(--page-transition-duration) var(--page-transition-timing);
        }
    }

    /* Backwards Transition */
    &:active-view-transition-type(backwards) {
        &::view-transition-old(root) {
            animation: page_out_left var(--page-transition-duration) var(--page-transition-timing);
        }

        &::view-transition-new(root) {
            animation: page_in_right var(--page-transition-duration) var(--page-transition-timing);
        }
    }
}

@keyframes page_out_right {
    0% {
        scale: 1;
        translate: 0% 0%;
    }

    30% {
        scale: .5;
    }

    100% {
        scale: .5;
        translate: 100% 0%;
    }
}

@keyframes page_out_left {
    0% {
        scale: 1;
        translate: 0% 0%;
    }

    30% {
        scale: .5;
    }

    100% {
        scale: .5;
        translate: -100% 0%;
    }
}

@keyframes page_in_left {
    0% {
        scale: .5;
        translate: -100% 0%;
    }

    70% {
        scale: .5;
    }

    100% {
        scale: 1;
        translate: 0% 0%;
    }
}

@keyframes page_in_right {
    0% {
        scale: .5;
        translate: 100% 0%;
    }

    70% {
        scale: .5;
    }

    100% {
        scale: 1;
        translate: 0% 0%;
    }
}
```

### 2. Direction Logic
This script detects the navigation type and assigns the appropriate transition type to the current document reveal.

```js
/**
 * FWS Supply: View Transition Direction Handler
 */
function initDirectionalTransitions() {
    if (!window.navigation || !document.startViewTransition) return;

    const STORAGE_KEY = 'nav_idx';

    // Track outgoing index
    window.addEventListener("pageswap", (e) => {
        if (!e.viewTransition) return;
        if (navigation.currentEntry) {
            sessionStorage.setItem(STORAGE_KEY, navigation.currentEntry.index);
        }
    });

    // Handle incoming reveal
    window.addEventListener("pagereveal", (e) => {
        if (!e.viewTransition || !navigation.activation) return;

        const { navigationType, entry } = navigation.activation;
        let type = 'forwards';

        if (navigationType === 'traverse') {
            const prevIdx = Number(sessionStorage.getItem(STORAGE_KEY));
            const currIdx = entry.index;
            if (!isNaN(prevIdx)) {
                type = currIdx < prevIdx ? 'backwards' : 'forwards';
            }
        }
        
        e.viewTransition.types.add(type);
        sessionStorage.removeItem(STORAGE_KEY);
    });
}

initDirectionalTransitions();
```

## Integration

1. **Include Styles**: Copy the CSS into your global theme or a specific transition module.
2. **Execute Script**: Run the initialization script on every page (ideally as a module in the `<head>` or at the end of `<body>`).
3. **Verify Compatibility**: Ensure your browser supports `View Transition API` (Chrome 111+, Edge 111+).

<info>
type: inventory;
category: transition;
tags: page-transition view-transition;
preview: /assets/image/inventory/direction-aware-side-page-transition/preview.avif;
demo: /pages/demo/direction-aware-side-page-transition;
</info>