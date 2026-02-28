import './modules/preference.js';
import './modules/search.js';

const searchMenu = document.getElementById('search-menu');
const preferenceMenu = document.getElementById('preference-menu');

document.addEventListener("keydown", (event) => {
    if (event.key === 'k' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        searchMenu?.togglePopover();
    }
    if (event.key === 'p' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        preferenceMenu?.togglePopover();
    }
});

const navSearchBtn = document.getElementById('nav-search-btn');
const navSearchInput = document.getElementById('nav-search-input');

if (navSearchBtn && navSearchInput) {
    const handleSearch = (manual = false) => {
        const searchMenuInput = document.getElementById('menu-search-input');

        if (searchMenuInput) {
            searchMenuInput.value = navSearchInput.value;
            searchMenuInput.dispatchEvent(new Event("input", { bubbles: true }));
        }

        if (manual) searchMenu?.showPopover();
        navSearchInput.value = '';

        setTimeout(() => searchMenuInput.focus(), 250);
    }

    navSearchBtn.addEventListener('click', () => handleSearch(false));

    navSearchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch(true);
        }
    });
}
