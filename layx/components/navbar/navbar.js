class Navbar {
    constructor(selector = '#main-navbar') {
        this.element = document.querySelector(selector);
        this.menuBtn = this.element.querySelector('#menu-btn');
        this.menu = this.element.querySelector('#menu');
        this.backdrop = document.querySelector('backdrop');
        this.isOpened = false;
        this.init();
    }

    init() {
        this.menuBtn.addEventListener('click', () => {
            this.toggle();
        });

        this.backdrop.addEventListener('click', () => {
            this.close();
        });
    }

    toggle() {
        this.isOpened = this.element.classList.toggle('open');

        window.__smoothScrollInstance.scrollLocked = this.isOpened;

        if (document.documentElement.classList.contains('scrolled')) {
            this.backdrop.classList.toggle('open');
        }

        if (this.isOpened) {
            this.menu.addEventListener('transitionend', () => {
                this.menu.classList.add('_opened');
            }, { once: true });
        } else {
            this.menu.addEventListener('transitionend', () => {
                this.menu.classList.add('_wait');
                this.menu.classList.remove('_opened');
                setTimeout(() => {
                    this.menu.classList.remove('_wait');
                }, 20);
            }, { once: true });
        }
    }

    close() {
        this.element.classList.remove('open');
        this.backdrop.classList.remove('open');
        window.__smoothScrollInstance.scrollLocked = false;
        this.isOpened = false;
    }
}

export default new Navbar;