import './modules/preference.js';
import './modules/search.js';

const searchMenu = document.getElementById('search-menu');
const preferenceMenu = document.getElementById('preference-menu');

document.addEventListener("keydown", (event) => {
    if (event.key === 'k' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        searchMenu.togglePopover();
    }
    if (event.key === 'p' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        preferenceMenu.togglePopover();
    }
});