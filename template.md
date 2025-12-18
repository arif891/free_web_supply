<!-- default template -->

# Proposal: Standardized Customization for HTML Media Elements

## Problem Statement

HTML media elements (`<video>` and `<audio>`) have suffered from inconsistent implementations across browsers for years. Developers are forced to implement custom UI solutions or rely on third-party libraries to achieve a consistent look and feel for basic media controls across different browsers.

Currently, only Chromium-based browsers offer limited customization through vendor-prefixed pseudo-elements. However, these prefixes (previously `-webkit-media-controls-*`, now renamed to `-internal-media-controls-*`) are non-standard and subject to change without notice. This makes them unreliable for production use, as browser updates can break existing implementations at any time.

## Current State: Inconsistent Implementations

### Chromium Media Controls UI
![thumbnail](assets/images/default_chromium.avif)

### Gecko Media Controls UI
![default_gecko](assets/images/default_gecko.avif)

As shown above, the default media controls differ significantly between browser engines, making it impossible to provide a consistent user experience without custom implementations.

## Real-World Use Case: Mobile Gesture Conflicts

Several OEM phone manufacturers (including Oppo, Realme, and Xiaomi) implement system-level navigation gestures that trigger when users swipe from the bottom edge of the screen. This creates a usability conflict: the media timeline is positioned at the bottom of the screen, making it extremely difficult for users to seek through media content without accidentally triggering the system navigation gesture.

While this may seem like an edge case, it affects millions of users on these popular Android devices.

![problem](assets/images/problem.avif)

### Current Workaround (Chromium Only)

This specific issue can be addressed in Chromium-based browsers using vendor-prefixed pseudo-elements to reposition the timeline. However, this solution is:
- **Non-standard** and unreliable
- **Browser-specific** (doesn't work in Firefox, Safari, etc.)
- **Subject to breakage** with any browser update

![solution](assets/images/improved.avif)

This demonstrates the need for a standardized approach to media control customization.

## Proposed Solution

### Core Proposal: Standardized Pseudo-Elements for Media Controls

Introduce a new CSS `appearance` value that reveals standardized, customizable pseudo-elements for media controls. This approach:
- Provides **backward compatibility** (no change to default behavior)
- Offers **progressive enhancement** (opt-in via CSS)
- Enables **cross-browser consistency** through standardization

#### API Design
```css
/* Opt-in to reveal standardized pseudo-elements */
audio, video {
    appearance: base;
}

/* Container for all controls */
::media-controls {
    /* Custom styles */
}

/* Controls wrapper/background */
::media-controls-enclosure {
    /* Custom styles */
}

/* Overflow menu */
::media-controls-overflow-menu {
    /* Custom styles */
}

/* Timeline/progress bar */
::media-controls-timeline {
    /* Custom styles */
}

/* Play/pause button */
::media-controls-play-button {
    /* Custom styles */
}

/* Current time display */
::media-controls-current-time {
    /* Custom styles */
}

/* Remaining time display */
::media-controls-time-remaining {
    /* Custom styles */
}

/* Volume slider */
::media-controls-volume-slider {
    /* Custom styles */
}

/* Fullscreen toggle button */
::media-controls-fullscreen-button {
    /* Custom styles */
    background-image: url('fullscreen-icon.svg'); /* Custom icon support */
}
```
---

### Extended Features: Common Use Cases

Beyond basic customization, the following features address common developer requirements that currently necessitate completely custom implementations.

#### 1. Next and Previous Navigation Buttons
Enable playlist-style navigation directly within native controls.

**HTML API:**
```html
<video controlsList="next-button previous-button" controls>
    <source src="video.mp4" type="video/mp4">
</video>
```

**Visual Representation:**
![next_previous](assets/images/prev_next.avif)

**JavaScript Events:**
```js
video.addEventListener('next', () => {
    // Load next media in playlist
    video.src = 'next-video.mp4';
});

video.addEventListener('previous', () => {
    // Load previous media in playlist
    video.src = 'previous-video.mp4';
});
```

**Use Cases:**
- Media streaming platforms (YouTube, Spotify) for suggesting next/previous content
- Playlist functionality for audio players
- Video tutorials with chapter navigation
- Course platforms with sequential video lessons

#### 2. Built-in Quality Selector

Provide native UI for quality selection when multiple sources are available.

**Visual Representation:**
![quality_selector](assets/images/quality_menu.avif)

**HTML API:**
```html
<video controls>
    <source src="video-720p.webm" type="video/webm" codecs="av1" quality="720p">
    <source src="video-720p.mp4" type="video/mp4" quality="720p">
    <source src="video-480p.mp4" type="video/mp4" quality="480p">
</video>
```

**Quality Menu Options:**
![quality_selector](assets/images/quality_menu_options.avif)

**JavaScript Events:**
```js
video.addEventListener('qualitychange', (event) => {
    console.log(`Quality changed to: ${event.detail.quality}`);
});
```

**Behavior Specifications:**
- Groups sources by `quality` attribute (ignores codec/format differences)
- Includes "Auto" option that selects optimal quality based on:
  - Network speed
  - Device capabilities
  - Available bandwidth
- Optionally remembers user preference across sessions
- Only displays when multiple quality levels are available

**Use Cases:**
- Video streaming platforms (YouTube, Vimeo, Netflix)
- Educational platforms with bandwidth-conscious users
- Content delivery networks serving multiple quality tiers

#### 3. Seek Preview Window

Display low-quality preview frames while seeking to improve user experience on high-resolution content.

**Visual Representation:**
![preview_window](assets/images/seek_preview.avif)

**HTML API:**
```html
<video controlsList="preview" controls>
    <source src="video-4k.mp4" quality="4k">
    <source src="video-1080p.mp4" quality="1080p">
    <source src="video-144p.mp4" quality="144p">
</video>
```

**Behavior Specifications:**
- Preview window anchors to timeline thumb position
- Stays within video element boundaries (respects container)
- Uses lowest quality source for instant preview rendering
- Only activates when lower quality source is available
- Falls back to direct frame updates if no lower quality exists

**Use Cases:**
- High-resolution video playback (4K, 8K) where seeking is slow
- Network-limited environments where quick scrubbing is essential
- User education content where precise timestamp selection matters
- Long-form content (movies, lectures) requiring frequent navigation

#### 4. Aspect Ratio Fill Toggle (Fullscreen)

Allow users to toggle between `contain` (letterboxed) and `fill` (cropped) video display modes in fullscreen.

**Visual Representation:**
![fill](assets/images/fill.avif)

**Behavior Specifications:**
- Only visible in fullscreen mode with native controls
- Toggles `object-fit` CSS property between:
  - `contain` (default): Shows entire video with black bars if needed
  - `fill`: Crops video to fill screen entirely
- Preference can be remembered per-session

**Use Cases:**
- **Mobile devices**: Most videos are 16:9, while modern phones are 18:9 or wider in landscape
- **Immersive viewing**: Users watching action content or sports prefer edge-to-edge display
- **Cinematic content**: Matches behavior of native video players (YouTube mobile, Netflix, etc.)
- **User preference**: Different content types benefit from different display modes

---

### Additional Possibilities: Hybrid Approaches

Standardized pseudo-elements enable **hybrid implementations** that combine native performance with custom functionality. For example:

- **Custom playlist logic** with native controls styling
- **Advanced analytics tracking** without rebuilding the entire UI
- **Accessibility enhancements** layered on top of browser defaults
- **Progressive enhancement** where modern browsers get richer features

**Current Example (Audio Element):**
![possibilities](assets/images/audio_improved.avif)

*This audio player combines native controls (customized via vendor prefixes in Chromium) with custom JavaScript functionality. With standardized pseudo-elements, this could work consistently across all browsers.*

---

## Benefits Summary

Implementing this proposal would provide significant advantages:

### For Developers
- **Reduced complexity**: No need to rebuild media controls from scratch
- **Smaller bundle sizes**: Leverage native implementations instead of JavaScript libraries
- **Better maintainability**: Standard APIs that don't break with browser updates
- **Faster development**: Consistent behavior across browsers out of the box

### For Users
- **Better performance**: Native implementations are optimized at the engine level
- **Improved accessibility**: Built-in keyboard navigation, screen reader support, and ARIA attributes
- **Consistent experience**: Familiar controls across different websites
- **Battery efficiency**: Native controls consume less power than JavaScript alternatives

### For Browser Vendors
- **Backward compatible**: Opt-in via `appearance: base` means no breaking changes
- **Standards alignment**: Follows the same path as `<select>`, `<input>`, and other form elements
- **Developer satisfaction**: Addresses a long-standing pain point in the web platform

---

## Conclusion

While media control customization may not be the highest priority feature for the web platform, it represents a **meaningful quality-of-life improvement** for both developers and users. The proposed solution:

1. ✅ **Maintains backward compatibility** (no breaking changes)
2. ✅ **Follows established patterns** (similar to `<select>` element customization efforts)
3. ✅ **Addresses real user pain points** (mobile gesture conflicts, inconsistent UI)
4. ✅ **Reduces developer burden** (eliminates need for custom implementations)
5. ✅ **Improves performance and accessibility** (native implementations are optimized)

### Path Forward

If Chromium begins implementing standardized media control pseudo-elements, other browser vendors would likely follow suit, as has been the case with other customization features. This creates an **incremental path to adoption** without requiring simultaneous buy-in from all vendors.

The current state of vendor-prefixed pseudo-elements in Chromium demonstrates both the **demand** for this feature and the **technical feasibility** of the implementation.

---

**Note**: The `index.html` file in this repository contains working demonstrations of media elements customized using Chromium vendor-prefixed pseudo-elements, showcasing what's possible with standardized implementations.

<info>
category: tutorial;
author: admin;
tags: html css  js;
</info>