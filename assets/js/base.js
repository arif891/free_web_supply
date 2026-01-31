const mediaMotion = window.matchMedia('(prefers-reduced-motion: no-preference)');
const prefersMotion = mediaMotion.matches;

const mediaPointer = window.matchMedia('(pointer: fine)');
const hasFinePointer = mediaPointer.matches;
class PreferencesManager {
    constructor() {
        this.preferences = {};
        this.preferenceMenu = document.getElementById('preference-menu');
        this.inputs = this.preferenceMenu.querySelectorAll('input.switch');
        this.init();
    }

    init() {
        this.loadPreferences();

        if (this.inputs) {
            this.inputs.forEach(input => {
                input.addEventListener('change', (e) => {
                    const key = e.target.name;
                    const value = e.target.checked;
                    this.setPreference(key, value);
                    window.dispatchEvent(new Event('preferencesChanged'));
                });
            });
        }
    }

    loadPreferences() {
        const storedPrefs = localStorage.getItem('userPreferences');
        if (storedPrefs) {
            this.preferences = JSON.parse(storedPrefs);
            window.userPreferences = this.preferences;
            window.dispatchEvent(new Event('preferencesLoaded'));

            this.updateUI();
        }
    }

    updateUI() {
        this.inputs.forEach(input => {
            const key = input.name;
            if (this.preferences.hasOwnProperty(key)) {
                input.checked = this.preferences[key];
            }
        });
    }

    setPreference(key, value) {
        this.preferences[key] = value;
        this.savePreferences();
        window.userPreferences = this.preferences;
    }

    getPreference(key) {
        if (!(key in this.preferences)) {
            this.inputs.forEach(input => {
                if (input.name === key) {
                    this.preferences[key] = input.checked;
                }
            });
        }
        return this.preferences[key];
    }

    savePreferences() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    }
}

const preferencesManager = new PreferencesManager();

class usePreferences {
    constructor() {
        this.update();
        window.addEventListener('preferencesChanged', () => this.update());
        window.addEventListener('preferencesLoaded', () => this.update());
    }

    getPreference(key) {
        return preferencesManager.getPreference(key);
    }

    update() {
        this.useSmoothScroll();
        this.otherPreference();
    }

    async useSmoothScroll() {
        const isEnabled = prefersMotion && hasFinePointer && (window.location.pathname === "/" || window.location.pathname === "/index.html") && this.getPreference('smooth-scroll') && this.getPreference('motion');

        if (isEnabled) {
            if (window.__smoothScrollInstance) return;

            const { SmoothScroll } = await import('/layx/others/smooth_scroll/smooth_scroll.js');

            new SmoothScroll();

        } else {
            const existingInstance = window.__smoothScrollInstance;
            if (existingInstance) {
                existingInstance.destroy();
            }
        }
    }

    otherPreference() {
        if (!window.userPreferences) return;
        Object.keys(window.userPreferences).forEach(pref => {
            document.documentElement.setAttribute(`data-pref-${pref}`, window.userPreferences[pref]);
        });
    }
}

new usePreferences();