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

class ActionHandler {
    constructor(wrapperId = 'action-wrapper') {
        this.wrapper = document.getElementById(wrapperId);
        this.init();
    }

    init() {
        if (!this.wrapper) {
            console.error('ActionHandler: Wrapper element not found.');
            return;
        }

        this.wrapper.addEventListener('click', (event) => {
            const button = event.target.closest('button[data-action]');
            if (button) {
                const action = button.getAttribute('data-action');
                const info = button.getAttribute('data-info');
                this.handleAction(action, info);
            }
        });
    }

    handleAction(action, info) {
        switch (action) {
            case 'preview':
                this.preview(info);
                break;
            default:
                console.warn(`Unknown action: ${action}`);
        }
    }

    preview(info) {
        let previewWindow = document.getElementById('preview-window');
        const template =
            `<div class="preview-window" id="preview-window" popover>
  <div class="preview-header">
    <a class="btn preview-link" href="${info}" target="_blank" title="Open in new tab">
    <svg class="icon">
    <use href="/assets/image/svg/icons.svg#arrow-up-right" />
    </svg>
    </a>
    <button class="btn close-btn" onclick="this.closest('.preview-window').hidePopover()" title="Close preview">
    <svg class="icon">
    <use href="/assets/image/svg/icons.svg#close" />
    </svg>
    </button>
  </div>
  <iframe class="preview-iframe" src="${info}" frameborder="0" allowfullscreen></iframe>
</div>`;
        if (!previewWindow) {
            document.body.insertAdjacentHTML('beforeend', template);
            previewWindow = document.getElementById('preview-window');
        }

        previewWindow.showPopover();
    }
}

new ActionHandler();