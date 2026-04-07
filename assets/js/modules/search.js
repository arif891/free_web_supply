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
        this.input.addEventListener('input', () => {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => this.search(), 250);
        });
    }

    async loadData() {
        try {
            const response = await fetch(this.infoUrl);
            if (!response.ok) throw new Error(`Failed to load search data: ${response.status}`);
            const data = await response.json();
            // Flatten all section arrays (inventory, manifest, …) into one list
            this.data = Object.values(data)
                .filter(Array.isArray)
                .flat();
        } catch (error) {
            console.error('[SearchManager]', error);
        }
    }

    async search() {
        if (!this.data) await this.loadData();

        const query = this.input.value.trim();

        if (query.length < 3) {
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