class dynamicRender {
    constructor(config = {}) {
        this.config = {
            type: config.type || 'inventory',
            container: config.container || '.item__wrapper',
            templateFile: config.templateFile || '/build/templates/inventory.mjs',
            infoURL: config.infoURL || '/build/info/info.json',
            limit: config.limit || 6,
            offset: 0
        };

        this.items = [];
        this.isLoading = false;
        this.hasMore = true;

        this.init();
    }

    async init() {
        await this.loadData();
        this.setupIntersectionObserver();
    }

    async loadData() {
        try {
            const response = await fetch(this.config.infoURL);
            const data = await response.json();
            this.items = data[this.config.type] || [];
            
            // Calculate initial offset based on items already in DOM
            const container = document.querySelector(this.config.container);
            if (container) {
                this.config.offset = container.children.length;
            }
            
            if (this.config.offset >= this.items.length) {
                this.hasMore = false;
            }
        } catch (error) {
            console.error('DynamicRender: Error loading data:', error);
        }
    }

    async renderMore() {
        if (this.isLoading || !this.hasMore) return;
        this.isLoading = true;

        const nextItems = this.items.slice(this.config.offset, this.config.offset + this.config.limit);
        
        if (nextItems.length === 0) {
            this.hasMore = false;
            this.isLoading = false;
            return;
        }

        try {
            const module = await import(this.config.templateFile);
            let html = '';
            
            if (this.config.type === 'inventory') {
                html = module.genInventoryItems(nextItems);
            } else if (this.config.type === 'asset') {
                html = module.genAssetItems(nextItems);
            } else if (this.config.type === 'manifest') {
                html = module.genManifestItems(nextItems, 'x-12 x-md-6 x-xl-4');
            }

            const container = document.querySelector(this.config.container);
            if (container) {
                container.insertAdjacentHTML('beforeend', html);
                this.config.offset += nextItems.length;
                
                if (this.config.offset >= this.items.length) {
                    this.hasMore = false;
                }
            }
        } catch (error) {
            console.error('DynamicRender: Error rendering items:', error);
        } finally {
            this.isLoading = false;
        }
    }

    setupIntersectionObserver() {
        const sentinel = document.createElement('div');
        sentinel.className = 'dynamic-render-sentinel';
        sentinel.style.height = '1px';
        sentinel.style.width = '100%';
        
        const main = document.querySelector('main');
        if (main) {
            main.appendChild(sentinel);
        } else {
            document.body.appendChild(sentinel);
        }

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                this.renderMore();
            }
        }, {
            rootMargin: '400px' // Load when sentinel is 400px from viewport
        });

        observer.observe(sentinel);
    }
}

export default dynamicRender;