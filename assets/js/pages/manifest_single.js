class ContentOrganizer {
    constructor(contentId = 'content-wrapper', tocId = 'toc') {
        this.wrapper = document.getElementById(contentId);
        this.tocNav = document.getElementById(tocId);

        if (!this.wrapper || !this.tocNav) {
            console.error('Organizer: Required elements not found.');
            return;
        }

        // State tracking
        this.levelStack = { 0: this.wrapper };
        this.tocStack = { 0: this.tocNav };
        this.currentMaxLevel = 0;

        this.init();
    }

    init() {
        const elements = Array.from(this.wrapper.children);

        elements.forEach((el) => {
            const match = el.tagName.match(/^H([1-6])$/);

            if (match) {
                const level = parseInt(match[1]);
                const title = el.textContent;
                const slug = this.generateSlug(title);

                // 1. Create Content Section
                const section = document.createElement('div');
                section.className = `block-wrapper l${level}`;
                section.id = slug;

                const parentContainer = this.getNearestParent(this.levelStack, level);
                parentContainer.appendChild(section);
                section.appendChild(el);

                // 2. Create TOC Entry
                const tocEntry = document.createElement('div');
                tocEntry.className = `block l${level}`;

                const tocLink = document.createElement('a');
                tocLink.href = `#${slug}`;
                tocLink.textContent = title;
                tocLink.className = 'link';

                tocEntry.appendChild(tocLink);

                const parentToc = this.getNearestParent(this.tocStack, level);
                parentToc.appendChild(tocEntry);

                // 3. Update Stacks
                this.levelStack[level] = section;
                this.tocStack[level] = tocEntry;
                this.currentMaxLevel = level;

                this.clearSubsequentLevels(level);

            } else {
                // Move non-heading content to the deepest active section
                const deepestLevel = Math.max(...Object.keys(this.levelStack).map(Number));
                this.levelStack[deepestLevel].appendChild(el);
            }
        });
    }

    /**
     * Generates a URL-friendly slug
     */
    generateSlug(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '');
    }

    /**
     * Finds the nearest existing parent container in the stack
     */
    getNearestParent(stack, level) {
        let parentLevel = level - 1;
        while (parentLevel >= 0 && !stack[parentLevel]) {
            parentLevel--;
        }
        return stack[parentLevel];
    }

    /**
     * Cleans up stacks to prevent "ghost" parents when jumping levels
     */
    clearSubsequentLevels(level) {
        for (let i = level + 1; i <= 6; i++) {
            delete this.levelStack[i];
            delete this.tocStack[i];
        }
    }
}

new ContentOrganizer();