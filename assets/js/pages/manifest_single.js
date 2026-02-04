class ContentOrganizer {
    constructor(contentId = 'content-wrapper', tocId = 'toc') {
        this.wrapper = document.getElementById(contentId);
        this.tocNav = document.getElementById(tocId);

        // Only the wrapper is strictly required for content organizing
        if (!this.wrapper) {
            console.error('Organizer: Wrapper element not found.');
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

                // 2. Create TOC Entry (Only if tocNav exists)
                if (this.tocNav) {
                    const tocEntry = document.createElement('div');
                    tocEntry.className = `block l${level}`;

                    const tocLink = document.createElement('a');
                    tocLink.href = `#${slug}`;
                    tocLink.textContent = title;
                    tocLink.className = 'link';

                    tocEntry.appendChild(tocLink);

                    const parentToc = this.getNearestParent(this.tocStack, level);
                    // Ensure we have a valid parent in the TOC stack
                    if (parentToc) {
                        parentToc.appendChild(tocEntry);
                    }
                    
                    this.tocStack[level] = tocEntry;
                }

                // 3. Update Stacks
                this.levelStack[level] = section;
                this.currentMaxLevel = level;

                this.clearSubsequentLevels(level);

            } else {
                // Move non-heading content to the deepest active section
                const levels = Object.keys(this.levelStack).map(Number);
                const deepestLevel = Math.max(...levels);
                this.levelStack[deepestLevel].appendChild(el);
            }
        });
    }

    generateSlug(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '');
    }

    getNearestParent(stack, level) {
        let parentLevel = level - 1;
        while (parentLevel >= 0 && !stack[parentLevel]) {
            parentLevel--;
        }
        return stack[parentLevel];
    }

    clearSubsequentLevels(level) {
        for (let i = level + 1; i <= 6; i++) {
            delete this.levelStack[i];
            delete this.tocStack[i];
        }
    }
}

new ContentOrganizer();