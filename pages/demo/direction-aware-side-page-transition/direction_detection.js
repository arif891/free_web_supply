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