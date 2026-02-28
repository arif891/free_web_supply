class SearchManager {
    constructor() {
        this.menu = document.getElementById('search-menu');
        this.input = this.menu.querySelector('#menu-search-input');
        this.scroller = this.menu.querySelector('.scroller');
        this.infoUrl = '/build/info/info.json';
        this.data = null;
        this.debounceTimer = null;
        this.init();
    }

    init() {
        fetch(this.infoUrl)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load search data: ${response.status}`);
                return response.json();
            })
            .then(data => {
                // Flatten all section arrays (inventory, manifest, …) into one list
                this.data = Object.values(data)
                    .filter(Array.isArray)
                    .flat();
            })
            .catch(err => {
                console.error('[SearchManager]', err);
            });

        this.input.addEventListener('input', () => {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => this.search(), 500);
        });
    }

    search() {
        if (!this.data) return;

        const query = this.input.value.trim();

        if (query.length < 2) {
            this.scroller.innerHTML = '';
            return;
        }

        const lower = query.toLowerCase();
        const result = this.data.filter(item =>
            item.heading?.toLowerCase().includes(lower) ||
            item.type?.toLowerCase().includes(lower) ||
            item.category?.toLowerCase().includes(lower) ||
            item.tags?.some(tag => tag.toLowerCase().includes(lower))
        );

        this.scroller.innerHTML = result.length
            ? result.map(item => this.genItem(item)).join('')
            : '<p class="no-results dec_meta">NO_RESULTS_FOUND</p>';
    }

    genItem(item) {
        const safeTitle = this.escape(item.heading);
        const safeType = this.escape(item.type);

        return `
            <a class="item__wrapper" href="${item.url}" data-type="${safeType}" data-id="${item.id}">
              <img class="img" src="${item.thumbnail}" alt="${safeTitle}">
              <div class="right">
                <span class="title">${safeTitle}</span>
                <span class="dec_meta">${safeType}</span>
              </div>
            </a>
        `;
    }

    escape(str) {
        return String(str ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
}

new SearchManager();