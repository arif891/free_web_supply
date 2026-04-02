<!-- FWS / SUPPLY — New Archive Entry -->

# Element Glow Effect by SVG Filter

![thumbnail](/assets/image/manifest/element-glow-effect-by-svg-filter/thumbnail.avif)

A performance-optimized SVG filter implementation to create a soft, customizable glow effect for UI elements without using heavy external libraries.

## Overview

Standard CSS `box-shadow` or `filter: blur()` can sometimes be limiting or resource-heavy for complex shapes. This approach uses SVG `feGaussianBlur` to create a diffuse light effect and `feMerge` to layer it behind the original element, ensuring crisp edges while achieving a high-end glow.

## Key Features

- **Customizable Diffusion**: Precise control over the glow size using `stdDeviation`.
- **Native Integration**: Works seamlessly with HTML/CSS via the `filter: url()` property.
- **Zero Bloat**: Minimum footprint by using built-in browser rendering engines.
- **Performance**: High-performance, zero-bloat logic.

## Technical Specifications

| Parameter | Value |
| :--- | :--- |
| **Logic** | SVG 1.1 / Filter Effects |
| **Styling** | Vanilla CSS |
| **APIs** | SVG Filter API |
| **Payload** | < 0.5 KB |

## Implementation

```svg
<svg xmlns="http://www.w3.org/2000/svg" >
    <defs>
        <!-- filter: Defines a filter effect to be applied to an element. The id attribute specifies the unique identifier of the filter. The x, y, height, and width attributes specify the bounding box of the filter effect. The color-interpolation-filters attribute specifies the color interpolation method to be used for the filter effect. -->
        
        <filter id="glow" x="-50%" y="-50%" height="200%" width="200%" color-interpolation-filters="sRGB">

            <!-- feGaussianBlur: Applies a Gaussian blur to the input image. The stdDeviation attribute specifies the standard deviation of the Gaussian kernel, which controls the amount of blur. A larger value results in a stronger blur. -->
            
            <feGaussianBlur stdDeviation="100" result="coloredBlur" />

            <!-- feMerge: Merges multiple graphical elements into a single image. The order of the feMergeNode elements determines the stacking order of the merged elements. -->
            
            <feMerge>
                <!-- feMergeNode: Specifies a node to be merged into the output image. -->

                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
    </defs>
</svg>
```

```css
.element {
    filter: url(#glow);
}
```


<info>
type: manifest;
category: effects;
tags: svg filter;
</info>