export { genDefault, genRoot };

function genDefault() {
    return `<!-- FWS / SUPPLY — New Archive Entry -->

# [Enter Title Here]

![thumbnail](/assets/image/base/default_thumbnail.avif)

Brief description of the unit and its purpose within the FWS architecture.

## Overview

Detailed explanation of the problem this unit solves and the methodology behind the implementation.

## Key Features

- **Feature 1**: Describe a core benefit.
- **Feature 2**: Describe another benefit.
- **Performance**: High-performance, zero-bloat logic.

## Technical Specifications

| Parameter | Value |
| :--- | :--- |
| **Logic** | [e.g. JavaScript ES6+] |
| **Styling** | [e.g. Vanilla CSS] |
| **APIs** | [e.g. Web Components] |
| **Payload** | [e.g. < 1KB] |

## Implementation

### 1. Structural CSS
\`\`\`css
/* Define styles here */
\`\`\`

### 2. Core Logic
\`\`\`js
/* Define logic here */
\`\`\`

## Integration

1. **Step One**: How to include the code.
2. **Step Two**: How to initialize.
3. **Step Three**: Verify functionality.

<info>
type: manifest;
category: uncategorized;
tags: vanilla css js;
</info>

<!-- 
type: inventory | manifest; (inventory: provide unit, manifest: provide article)
category: [category]; (Give a proper category name)
tags: [tag1 tag2 tag3]; (Give some related tag name)
preview: [url]; (Provide a animated preview image url)
demo: [url]; (Provide a demo url)
-->
`
}

function genRoot(main, left = '', right = '', other = {}) {
    const def = {
        heading: '',
        thumbnail: '/assets/image/base/default.avif',
        meta: '',
        type: 'manifest',
        ...other
    }
    return `
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${def.heading}</title>

        ${def.meta}

        <meta property="og:type" content="article" />
        <meta property="og:title" content="${def.heading}" />
        <meta property="og:image" content="${def.thumbnail}" />

        <link rel="stylesheet" href="/layx/layx.css">

        <link rel="stylesheet" href="/assets/css/base.css">
        <link rel="stylesheet" href="/assets/css/pages/inventory_&_manifest_single.css">
        <link rel="stylesheet" href="/assets/css/pages/${def.type}_single.css">

        <link rel="shortcut icon" href="/assets/brand/logo.svg" type="image/svg">
        <link rel="manifest" href="/assets/brand/app.webmanifest">
    </head>

    <body>
        <header>
            <navbar id="main-navbar" data-component="navbar">
                <div class="main-wrapper">
                    <div class="main">
                        <div class="start">
                            <button class="search-btn" popovertarget="search-menu">
                                <svg class="icon search-icon">
                                    <use href="/assets/image/svg/icons.svg#search" />
                                </svg>
                            </button>
                            <input class="search-input" type="search" id="nav-search-input">
                        </div>
                        <div class="center">
                            <a href="/">
                                <svg class="logo" id="nav-logo">
                                    <use href="/assets/brand/logo.svg" />
                                </svg>
                            </a>
                        </div>
                        <div class="end">
                            <nav class="link__wrapper">
                                <a class="link dec_bra dec_link" href="/pages/inventory/">INVENTORY</a>
                                <a class="link dec_bra dec_link" href="/pages/manifest/">MANIFEST</a>
                                <a class="link dec_bra dec_link" href="/pages/system.html">SYSTEM</a>
                            </nav>
                            <button class="menu-btn" id="menu-btn"></button>
                        </div>
                    </div>
                </div>

                <div class="menu" id="menu">
                    <div class="left">
                        <nav class="link__wrapper">
                            <a class="link" href="/pages/inventory/">INVENTORY</a>
                            <a class="link" href="/pages/manifest/">MANIFEST</a>
                            <a class="link" href="/pages/team/">PERSONNEL</a>
                            <a class="link" href="/pages/system.html">SYSTEM</a>
                        </nav>
                    </div>
                    <div class="right">
                        <svg class="dec__logo">
                            <use href="/assets/brand/logo.svg" />
                        </svg>
                    </div>
                    <div class="bottom">
                        <span class="dec_meta">ROOT<span class="d-md">_ACCESS</span>: ENABLED</span>
                        <button class="dec_meta dec_bra dec_link" id="pre-btn"
                            popovertarget="preference-menu">PREFERENCES</button>
                    </div>
                </div>
            </navbar>
        </header>


        <main>
            <section class="${def.type}__section">
                <layout class="gap-2 ${def.type}__layout">
                    <div class="x-3 left">
                        ${left}
                    </div>
                    <article class="x-12 x-lg-8 x-xxl-6 main">
                        <div class="thumbnail ${def.preview ? 'preview' : ''}" style="--preview: url(${def.preview || ''})">
                           <img class="img" src="${def.thumbnail}" alt="">
                        </div>
                        <h1 class="h2 heading">${def.heading}</h1>
                        <div class="content__wrapper" id="content-wrapper">
${main} 
                        </div>
                    </article>
                    <div class="x-12 x-lg-4 x-xxl-3 right">
                        ${right}
                    </div>
                </layout>
            </section>
        </main>


        <footer class="section" data-component="footer">
            <layout class="footer__layout">
                <div class="x-12 info__wrapper">
                    <span class="dec_bra">FWS / SUPPLY</span>
                    <span class="d-md">LAST_SYNC: 21.12.2025</span>
                </div>

                <div class="x-12 x-xxl-3 brand__space">
                    <span class="h4">VANILLA_STANDARDS</span>
                </div>

                <div class="x-12 x-xxl-1 divider"></div>

                <div class="x-12 x-xxl-8 link__block_wrapper">
                    <div class="link__block">
                        <span class="dec_meta">ROOT_DIRECTORY:</span>
                        <a href="/pages/inventory/" class="link">INVENTORY</a>
                        <a href="/pages/manifest/" class="link">MANIFEST</a>
                        <a href="/pages/team/" class="link">PERSONNEL</a>
                    </div>
                    <div class="link__block">
                        <span class="dec_meta">PROTOCOLS:</span>
                        <a href="https://github.com/arif891/free_web_supply?tab=MIT-1-ov-file" target="_blank"
                            class="link">MIT_LICENSE</a>
                        <a href="" class="link">PRIVACY_LOG</a>
                        <a href="" class="link">TERMS_OF_ACCESS</a>
                    </div>
                    <div class="link__block">
                        <span class="dec_meta">CONNECT:</span>
                        <a href="https://github.com/arif891/free_web_supply" target="_blank" class="link">GITHUB</a>
                        <a href="" class="link">TERMINAL</a>
                        <a href="" class="link">TWITTER / X</a>
                    </div>
                </div>

                <div class="x-12 info__wrapper">
                    <span>ⓒ 2026 FWS <span class="d-md">/ SUPPLY</span></span>
                    <span>ALL_RIGHTS_RESERVED</span>
                </div>
            </layout>
        </footer>

        <div class="preference-menu" id="preference-menu" popover data-component="preferenceMenu">
            <div class="header">
              <div class="wrapper">
                <h3 class="heading">PREFERENCES</h3>
                <button class="dec_meta dec_bra dec_link close-btn" commandfor="preference-menu"
                  command="hide-popover">CLOSE</button>
              </div>
            </div>
            <div class="scroller" data-smooth-scroll="prevent">
              <div class="item__wrapper motion">
                <h5 class="title">Motion</h5>
                <input class="switch" name="motion" type="checkbox" checked>
              </div>
              <div class="item__wrapper smooth-scroll">
                <h5 class="title">Smooth Scroll</h5>
                <input class="switch" name="smooth-scroll" type="checkbox" checked>
              </div>
              <div class="item__wrapper page-transition">
                <h5 class="title">Page Transition</h5>
                <input class="switch" name="page-transition" type="checkbox" checked>
              </div>
              <div class="item__wrapper show-loader">
                <h5 class="title">Show Loader</h5>
                <input class="switch" name="show-loader" type="checkbox" checked>
              </div>
              <div class="item__wrapper theme">
                <h5 class="title">Theme</h5>
                <div class="btn__wrapper">
                  <button class="btn" data-theme-set="auto">
                    <svg class="icon">
                      <use href="/assets/image/svg/icons.svg#circle-half" />
                    </svg>
                  </button>
                  <button class="btn" data-theme-set="light">
                    <svg class="icon">
                      <use href="/assets/image/svg/icons.svg#sun" />
                    </svg>
                  </button>
                  <button class="btn" data-theme-set="dark">
                    <svg class="icon">
                      <use href="/assets/image/svg/icons.svg#moon" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
        </div>

        <div class="search-menu" id="search-menu" popover data-component="searchMenu">
            <div class="header">
                <div class="wrapper">
                    <h3 class="heading">SEARCH</h3>
                    <button class="dec_meta dec_bra dec_link close-btn" commandfor="search-menu"
                        command="hide-popover">CLOSE</button>
                </div>
                <div class="input__wrapper">
                    <input class="search-input" type="search" id="menu-search-input" placeholder="Search Items">
                </div>
            </div>
            <div class="scroller" data-smooth-scroll="prevent">

            </div>
        </div>

        <backdrop></backdrop>

        <script src="/layx/layx.js" type="module"></script>

        <script src="/assets/js/base.js" type="module"></script>
        <script src="/assets/js/pages/inventory_&_manifest_single.js" type="module"></script>
        <script src="/assets/js/pages/${def.type}_single.js" type="module"></script>
    </body>

</html>
`
}