/**
 * Initializes Cross-Document View Transitions with direction detection.
 * Handles: 'forwards', 'backwards', and 'reload' animations.
 */
function initCrossDocViewTransitions() {
    // 1. Guard clause: Ensure the API is supported
    if (!window.navigation || !window.ViewTransition) return;

    const DIRECTION = {
        FORWARDS: 'forwards',
        BACKWARDS: 'backwards',
        RELOAD: 'reload',
        UNKNOWN: 'unknown'
    };

    const STORAGE_KEY = 'nav_previous_index';

    // --- Outgoing Logic (pageswap) ---
    window.addEventListener("pageswap", (e) => {
        // Only run if a transition is actually happening
        if (!e.viewTransition) return;

        // Save the current index so the NEXT page knows where we came from
        if (navigation.currentEntry) {
            sessionStorage.setItem(STORAGE_KEY, navigation.currentEntry.index);
        }
    });

    // --- Incoming Logic (pagereveal) ---
    window.addEventListener("pagereveal", (e) => {
        // 1. Basic validation
        if (!e.viewTransition || !navigation.activation) return;

        // 2. Get navigation details
        const { navigationType, entry } = navigation.activation;
        
        // 3. Determine direction
        let direction = DIRECTION.UNKNOWN;

        if (navigationType === 'traverse') {
            // Retrieve the index saved by the previous page
            const previousIndex = Number(sessionStorage.getItem(STORAGE_KEY));
            const currentIndex = entry.index;

            // If storage is missing (NaN), assume standard forward behavior or handle as specific edge case
            if (!isNaN(previousIndex)) {
                direction = currentIndex < previousIndex ? DIRECTION.BACKWARDS : DIRECTION.FORWARDS;
            }
        } else if (navigationType === 'push' || navigationType === 'replace') {
            direction = DIRECTION.FORWARDS;
        } else if (navigationType === 'reload') {
            direction = DIRECTION.RELOAD;
        }

        // 4. Apply the class to the transition
        if (direction !== DIRECTION.UNKNOWN) {
            console.log(`[ViewTransition] Direction: ${direction}`);
            e.viewTransition.types.add(direction);
        }
        
        // 5. Cleanup (Optional: keeps storage clean, though overwriting works too)
        sessionStorage.removeItem(STORAGE_KEY);
    });
}

// Initialize
initCrossDocViewTransitions();