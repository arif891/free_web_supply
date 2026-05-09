<!-- FWS / SUPPLY — New Archive Entry -->

# Sheet Component

![thumbnail](/assets/image/inventory/sheet-component/thumbnail.avif)

A versatile, scroll-based UI sheet component designed for smooth, high-performance drawers and overlays.

## Overview

The Sheet component provides a robust solution for off-canvas content, utilizing native CSS scroll-snapping for fluid transitions and optimal mobile performance. It bypasses heavy animation libraries in favor of browser-native behaviors, ensuring a lightweight footprint and consistent feel across devices.

## Key Features

- **Native Snapping**: Uses CSS Scroll Snap for butter-smooth interactions without external dependencies.
- **Multi-directional**: Supports Top, Bottom, Left, and Right positioning through simple attribute toggles.
- **Performance-First**: Zero-bloat logic focused on event delegation and native browser APIs.

## Technical Specifications

| Parameter | Value |
| :--- | :--- |
| **Logic** | JavaScript ES6+ |
| **Styling** | Vanilla CSS (CSS Nesting) |
| **APIs** | Element.scrollTo, scrollIntoView |
| **Payload** | < 2KB (minified) |

## Implementation

### 1. Structural CSS
```css
/* Core container for the sheet */
sheet, .sheet {
  position: fixed;
  inset: auto 0 0;
  height: var(--_h);
  display: flex;
  flex-direction: column;
  overflow: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  pointer-events: none;

  /* Hidden state when not active */
  &:not([active]) {
    visibility: hidden;
  }

  /* Snap alignment spacer */
  &::before {
    content: '';
    display: block;
    flex-shrink: 0;
    height: var(--_h);
    scroll-snap-align: end;
  }

  /* Left and Right directional styles */
  &[position=left], &[position=right] {
    inset: 0 auto 0 0;
    width: var(--_w);
    height: 100%;
    flex-direction: row;
    direction: rtl;
    scroll-snap-type: x mandatory;

    .wrapper {
      direction: unset;
      flex-direction: row;
    }

    &::before {
      height: 100%;
      width: var(--_w);
    }

  }

  &[position=right] {
    inset: 0 0 0 auto;
    direction: unset;
  }

  /* Top directional styles */
  &[position=top] {
    inset: 0 0 auto;
    flex-direction: column-reverse;

    &[active] {
      &::before, .wrapper:not(:has([snap])), [snap] {
        scroll-snap-align: start !important;
      }
    }
  }

  /* Content wrapper that handles actual interaction */
  .wrapper {
    display: flex;
    flex-direction: column;
    pointer-events: auto;
    direction: unset;

    [active] & {
      &:not(:has([snap])), [snap] {
        scroll-snap-align: end;
      }
    }
  }
}
```

### 2. Core Logic
```js
/**
 * Sheet Class
 * Manages scroll-based drawer interactions and state.
 */
class Sheet {
  // ─── Config ────────────────────────────────────────────────────────────────

  static DEFAULTS = {
    scrollBehavior: 'smooth',
    resizeDelay:    100,
  };

  static ATTR = {
    TRIGGER:   'data-target-sheet',
    POSITION:  'position',
    ACTIVE:    'active',
    OPEN:      'open',
    MODAL:     'modal',
    SNAP:      'snap',
    CLOSE:     'close',
  };

  static CSS = {
    WRAPPER: '.wrapper',
    WIDTH:   '--_w',
    HEIGHT:  '--_h',
  };

  static POSITION = {
    TOP:    'top',
    LEFT:   'left',
    RIGHT:  'right',
    BOTTOM: 'bottom',
  };

  // ─── Lifecycle ─────────────────────────────────────────────────────────────

  constructor(selector = 'sheet', options = {}) {
    this._options      = { ...Sheet.DEFAULTS, ...options };
    this._sheets       = document.querySelectorAll(selector);
    this._triggers     = document.querySelectorAll(`[${Sheet.ATTR.TRIGGER}]`);
    this._wrapperCache = new Map();
    this._listeners    = new Map(); // Store handlers for easy cleanup
    this._resizeTimer  = null;

    this._onResize     = this._onResize.bind(this);
    this._onKeydown    = this._onKeydown.bind(this);

    this._init();
  }

  _init() {
    this._update();
    this._attachListeners();
  }

  /** Cleanup event listeners and caches */
  destroy() {
    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize',  this._onResize);
    window.removeEventListener('keydown', this._onKeydown);

    this._listeners.forEach((handlers, el) => {
      handlers.forEach(([event, fn]) => el.removeEventListener(event, fn));
    });

    this._wrapperCache.clear();
    this._listeners.clear();
  }

  // ─── Public API ────────────────────────────────────────────────────────────

  /** Opens the specified sheet by scrolling to its snap point */
  open(sheet) {
    if (!sheet) return;

    const wrapper    = this._getWrapper(sheet);
    if (!wrapper) return;

    const [snapPoint] = sheet.querySelectorAll(`[${Sheet.ATTR.SNAP}]`);
    const target      = snapPoint ?? wrapper;

    target.scrollIntoView({
      behavior: this._options.scrollBehavior,
      block:    'nearest',
      inline:   'nearest',
    });

    sheet.setAttribute(Sheet.ATTR.OPEN, '');
  }

  /** Closes the sheet by scrolling back to the origin */
  close(sheet) {
    if (!sheet) return;

    const position      = this._getPosition(sheet);
    const scrollOptions = { behavior: this._options.scrollBehavior };

    switch (position) {
      case Sheet.POSITION.TOP:    scrollOptions.top  = sheet.scrollHeight; break;
      case Sheet.POSITION.LEFT:   scrollOptions.left = sheet.scrollWidth;  break;
      case Sheet.POSITION.RIGHT:  scrollOptions.left = 0;                  break;
      case Sheet.POSITION.BOTTOM: scrollOptions.top  = 0;                  break;
      default:
        console.warn(`Sheet: unknown position "${position}".`);
        return;
    }

    sheet.scrollTo(scrollOptions);
    sheet.removeAttribute(Sheet.ATTR.OPEN);
  }

  // ─── Private Methods ───────────────────────────────────────────────────────

  _attachListeners() {
    window.addEventListener('resize',  this._onResize);
    window.addEventListener('keydown', this._onKeydown);

    this._triggers.forEach(trigger => {
      const fn = e => this._onTriggerClick(e);
      trigger.addEventListener('click', fn);
      this._register(trigger, 'click', fn);
    });

    this._sheets.forEach(sheet => {
      const onScroll = () => this._onSheetScroll(sheet);
      sheet.addEventListener('scroll', onScroll);
      this._register(sheet, 'scroll', onScroll);

      sheet.querySelectorAll(`[${Sheet.ATTR.CLOSE}]`).forEach(btn => {
        const onClose = () => this.close(sheet);
        btn.addEventListener('click', onClose);
        this._register(btn, 'click', onClose);
      });
    });
  }

  /** Register listener for later removal */
  _register(el, event, fn) {
    if (!this._listeners.has(el)) this._listeners.set(el, []);
    this._listeners.get(el).push([event, fn]);
  }

  _onResize() {
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(() => this._update(), this._options.resizeDelay);
  }

  _onKeydown(e) {
    if (e.key !== 'Escape') return;
    this._sheets.forEach(sheet => {
      if (sheet.hasAttribute(Sheet.ATTR.OPEN) && !sheet.hasAttribute(Sheet.ATTR.MODAL)) {
        this.close(sheet);
      }
    });
  }

  _onTriggerClick(e) {
    const id    = e.currentTarget.getAttribute(Sheet.ATTR.TRIGGER);
    const sheet = document.getElementById(id);
    sheet
      ? this.open(sheet)
      : console.warn(`Sheet: no element found with id "${id}".`);
  }

  _onSheetScroll(sheet) {
    if (!sheet.hasAttribute(Sheet.ATTR.OPEN)) return;

    const closed = this._isScrolledClosed(sheet);
    if (closed) sheet.removeAttribute(Sheet.ATTR.OPEN);
  }

  _isScrolledClosed(sheet) {
    const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = sheet;
    switch (this._getPosition(sheet)) {
      case Sheet.POSITION.TOP:    return scrollTop  >= scrollHeight - clientHeight;
      case Sheet.POSITION.LEFT:   return scrollLeft >= scrollWidth  - clientWidth;
      case Sheet.POSITION.RIGHT:  return scrollLeft <= 0;
      case Sheet.POSITION.BOTTOM: return scrollTop  <= 0;
      default:                    return false;
    }
  }

  /** Updates sheet dimensions and state based on its content wrapper */
  _update() {
    this._sheets.forEach(sheet => {
      const wrapper = this._getWrapper(sheet);
      if (!wrapper) return;
      sheet.style.setProperty(Sheet.CSS.WIDTH,  `${wrapper.offsetWidth}px`);
      sheet.style.setProperty(Sheet.CSS.HEIGHT, `${wrapper.offsetHeight}px`);
      sheet.setAttribute(Sheet.ATTR.ACTIVE, '');
    });
  }

  _getWrapper(sheet) {
    if (this._wrapperCache.has(sheet)) return this._wrapperCache.get(sheet);

    const wrapper = sheet.querySelector(Sheet.CSS.WRAPPER);
    if (!wrapper) {
      console.warn('Sheet: missing a child ".wrapper" element.');
      return null;
    }

    this._wrapperCache.set(sheet, wrapper);
    return wrapper;
  }

  _getPosition(sheet) {
    return sheet.getAttribute(Sheet.ATTR.POSITION) ?? Sheet.POSITION.BOTTOM;
  }
}

// Auto-initialize on load
new Sheet();
```

## Usage Examples

### 1. Basic Bottom Sheet
The default behavior is a bottom-up drawer. Ensure you provide a unique `id` and a `.wrapper` for the content.

```html
<!-- Trigger Button -->
<button data-target-sheet="my-bottom-sheet">Open Bottom Sheet</button>

<!-- Sheet Component -->
<sheet id="my-bottom-sheet" position="bottom">
  <div class="wrapper">
    <header>
      <h3>Sheet Title</h3>
      <button close>Close</button>
    </header>
    <div class="content">
      <p>Your content goes here...</p>
    </div>
  </div>
</sheet>
```

### 2. Side Drawer (Left/Right)
Specify the `position` attribute to change the entry direction.

```html
<!-- Trigger for Left Drawer -->
<button data-target-sheet="left-drawer">Open Menu</button>

<!-- Left Drawer -->
<sheet id="left-drawer" position="left">
  <div class="wrapper">
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
      <button close>Dismiss</button>
    </nav>
  </div>
</sheet>
```

### 3. Custom Snap Points
Use the `snap` attribute to define exactly where the sheet should rest when opened.

```html
<sheet id="custom-snap" position="bottom">
  <div class="wrapper">
    <div class="hero-header" snap>
      <!-- This element will be scrolled into view when opened -->
      <h2>Pinned Header</h2>
    </div>
    <div class="scroll-content" snap>
      <p>Extended content that scrolls beyond the snap point...</p>
    </div>
  </div>
</sheet>
```

## Integration

1. **Structural Setup**: Copy the CSS styles into your global stylesheet or a component-specific file. Ensure the `--_h` and `--_w` variables are handled by the script or set manually if needed.
2. **Implementation**: Add the `<sheet>` markup with a `.wrapper` child. Use the `position` attribute to define its origin.
3. **Initialization**: Include the JavaScript class. It will auto-initialize for all `<sheet>` elements unless a custom selector is provided.

<info>
type: inventory;
category: component;
tags: sheet drawer;
preview: /assets/image/inventory/sheet-component/preview.avif;
demo: /pages/demo/sheet-component;
</info>