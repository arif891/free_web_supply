<!-- FWS / SUPPLY — New Archive Entry -->

# Video Preview on Hover Using Only CSS

![thumbnail](/assets/image/manifest/thumbnail-hover-preview-video-in-only-css/thumbnail.avif)

In many cases, showing a video preview when a user hovers over a thumbnail is a great way to enhance user experience. While there are several ways to achieve this, we'll focus on a pure CSS approach. This technique is inspired by the thumbnail previews used for `inventory` items on this site.

### The Traditional Approach (JavaScript)
The conventional method involves using JavaScript to trigger video playback. A typical structure looks like this:

```html
<!-- HTML Structure -->
<div class="thumbnail">
    <img src="thumbnail.jpg" alt="Thumbnail">
    <div class="preview">
        <video src="video.mp4" muted loop></video>
    </div>
</div>
```

```css
/* Styling for the preview container */
.thumbnail {
    position: relative;
    overflow: hidden;
}

.preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
}

.thumbnail:hover .preview {
    opacity: 1;
}
```

Then, you would need JavaScript to handle the hover events:

```js
// Toggle video playback on hover
const thumbnail = document.querySelector('.thumbnail');
const video = document.querySelector('video');

thumbnail.addEventListener('mouseover', () => {
    video.play();
});

thumbnail.addEventListener('mouseout', () => {
    video.pause();
});
```

If you want to add a delay before showing the preview, you'd need additional logic to manage timers.

### A Better Way: Pure CSS
Is there a better way? Just by using CSS, we can simplify our structure:

```html
<!-- Simplified HTML Structure -->
<div class="thumbnail">
    <img src="thumbnail.avif" alt="Thumbnail">
</div>
```

You might wonder: how can we show a video preview on hover using just CSS? The secret lies in the `::before` pseudo-element. Since pseudo-elements don't support `<video>` tags, we use a modern animated image format instead: **AVIF**.

AVIF is a modern image format with approximately 94.71% browser support. It supports both lossy and lossless compression, and most importantly, it supports animation.

Here is how the CSS looks:

```css
/* Base thumbnail styles with pseudo-element preview */
.thumbnail {
    position: relative;
    width: fit-content;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-size: cover;
        background-repeat: no-repeat;
    }

    &:hover::before {
        background-image: url(preview.avif);
    }
    
    img {
        aspect-ratio: 16/9;
        object-fit: cover;
    }
}
```

### Improving Performance and Polish
While the above works, we can improve it by adding a smooth transition and a slight delay before the preview starts. This prevents the preview from triggering if the user just quickly moves their mouse over the thumbnail.

```css
/* Adding smooth transitions and hover delay */
.thumbnail {
    &::before {
        background-image: url(preview.avif);
        opacity: 0;
        transition: opacity .3s;
    }

    &:hover::before {
        opacity: 1;
        transition-delay: .3s; /* Wait .3s before showing preview */
    }
}
```

Now it transitions smoothly and waits `.3s` before showing the preview. However, setting the `background-image` directly might cause the browser to load all preview images immediately when the page loads, which can hurt performance. To fix this, we swap the background image only on hover:

```css
/* Performance-optimized hover transition */
.thumbnail {

    &::before {
        background-image: url(transparent-[16/9].avif);
        transition: background-image .3s;
    }

    &:hover::before {
        background-image: url(preview-[16/9].avif);
        transition-delay: .3s;
    }
}
```

**Why use `transparent-[16/9].avif`?**
Browsers need two images to transition smoothly between them. By using a tiny, transparent image with the correct aspect ratio, we ensure the transition is fluid without loading the full animation until it's needed.

### Generating Your Assets
You can create transparent placeholder images with tools like Photoshop, GIMP, or Figma:
1. Create a frame with your thumbnail's aspect ratio.
2. Remove the **Fill** and set a very small size (e.g., 16x9 pixels).
3. Export as PNG and convert it to AVIF. You can use any online converter or my [batch image converter tool](https://github.com/arif891/web_dev_tools).

### Handling Multiple Thumbnails
To make this reusable for multiple unique previews, use CSS variables for the preview URL:

```html
<!-- Unique previews using CSS variables -->
<div class="thumbnail" style="--preview: url(preview-1.avif);">
    <img src="thumbnail-1.avif" alt="Thumbnail 1">
</div>

<div class="thumbnail" style="--preview: url(preview-2.avif);">
    <img src="thumbnail-2.avif" alt="Thumbnail 2">
</div>
```

```css
/* Reusable styling using CSS variables */
.thumbnail {

    &::before {
        background-image: url(transparent-[16/9].avif);
        transition: background-image .3s;
    }

    &:hover::before {
        background-image: var(--preview);
        transition-delay: .3s;
    }
}
```

### Converting Video to Animated AVIF
You can use `ffmpeg` to convert your video clips into high-quality, lightweight AVIF animations:

```bash
ffmpeg -i preview.mp4 -c:v libsvtav1 -vf "fps=24,scale=iw*.5:ih*.5" -still-picture 0 preview.avif
```

- `-i preview.mp4`: Input video file.
- `-c:v libsvtav1`: Uses the AV1 codec.
- `fps=24`: Sets the frame rate to 24 FPS.
- `scale=iw*.5:ih*.5`: Scales the resolution to 50% of the original.
- `-still-picture 0`: Ensures the output is an animated file.

<info>
type: manifest;
category: interaction;
tags: hover css micro-interaction preview;
</info>
