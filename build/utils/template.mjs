export { genDefault, genRoot, genWidget, genInventorySection, genManifestSection };

function genDefault() {
    return `<!-- default template -->

<info>
type: manifest;
category: tutorial;
tags: html css js;
</info>`
}

function genWidget(name, info = {}) {
    switch (name) {
        case 'author':
            return `
<div class="author__wrapper">
    <img class="img" src="${info.image}" alt="">
    <div class="content__wrapper">
        <div class="text__wrapper">
            <a class="name" href="${info.url}">${info.name}</a>
            <span class="role">${info.role}</span>
        </div>
        <div class="social__wrapper">
            ${Object.entries(info.social).map(([key, value]) => `
            <a class="link" href="${value}">
                <svg class="icon">
                    <use href="/assets/image/svg/icons.svg#${key}" />
                </svg>
            </a>`).join('')}
        </div>
    </div>
</div>
`

        case 'toc':
            return `
<div class="toc__wrapper">
    <div class="header__wrapper">
        <h5 class="title">ON THIS PAGE</h5>
        <span class="dec_meta">IDX</span>
    </div>
    <nav class="toc" id="toc">
    </nav>
</div>
`

        case 'action':
            return `
<div class="action__wrapper">
    ${Object.entries(info.buttons).map(([name, url]) => `
   <a class="btn dec_bra dec_meta dec_link action__btn ${name}" href="${url}">${name.toUpperCase()}</a>`).join('')}
</div>       
`
    }
}

function genInventorySection(items) {
    if (items.length > 6) items.length = 6;

    return `
 <section class="inventory__section" id="inventory-section">
  <layout class="gap-2 inventory__layout">
    <div class="x-12 info__wrapper">
      <span class="dec_bra">RAW_INVENTORY</span> <span class="d-md">COUNT: 12_UNITS</span>
    </div>
    <div class="x-12 header__wrapper">
      <h2 class="h4 sec__heading">INVENTORY_ITEMS</h2>
      <p>Audited units from the FWS core. Engineered to zero-radius standards for high-performance systems. The
        vanilla baseline starts here.</p>
    </div>
    <div class="x-12 sub-x gap-y-4 item__wrapper">
      ${items.map(item => `
      <div class="x-12 x-md-6 x-xl-4 item">
        <img class="img" src="${item.thumbnail}" alt="">
        <h3 class="h4 title">${item.heading}</h3>
        <div class="tag__wrapper">
          ${item.tags.map(tag => `<a href="">${tag}</a>`).join('')}
        </div>
        <div class="action__wrapper">
          <a class="btn dec_meta dec_bra dec_link action__btn" href="${item.url}">VIEW</a>
        </div>
      </div>
      `).join('')}
    </div>
    <div class="x-12 info__wrapper c-md">
      <span class="d-md">STATUS: VERIFIED</span>
      <a class="dec_bra dec_link" href="/pages/inventory/">VIEW_ALL</a>
      <span class="d-md">LAST_SYNC: ${new Intl.DateTimeFormat('en-GB').format(new Date()).replace(/\//g, '.')}</span>
    </div>
  </layout>
</section>   
    `
}

function genManifestSection(items) {
    if (items.length > 4) items.length = 4;
    if (items.length > 0) items[0].type = 'left';

    function genItem(item) {
        return `
        <a href="" class="${item.type === 'left' ? 'x-12 x-xl-6 item' : 'x-12 x-md-6 item'}">
        <img class="img" src="${item.thumbnail}" alt="">
        <div class="wrapper">
          <h3 class="h4 title">${item.heading}</h3>
          <div class="info__wrapper">
            <span class="date">DATE: ${item.date}</span>
            <span class="dec_bra dec_link">DECRYPT</span>
          </div>
        </div>
      </a>
        `
    }

    return `
<section class="manifest__section" id="manifest-section">
  <layout class="manifest__layout" data-vpt>
    <div class="x-12 info__wrapper">
      <span class="dec_bra">SYSTEM_MANIFEST</span><span class="d-md">RECORDS_FOUND: 04</span>
    </div>
    <div class="x-12 header__wrapper">
      <h2 class="h4 sec__heading">DOCUMENTATION</h2>
    </div>
    <div class="x-12 x-xxl-4 left ">
      ${items.filter(item => item.type === 'left').map(genItem).join('')}
    </div>
    <div class="x-12 x-xxl-1 divider"></div>
    <div class="x-12 x-xxl-7 right">
      ${items.filter(item => item.type !== 'left').map(genItem).join('')}
    </div>
    <div class="x-12 bottom__wrapper">
      <a class="dec_meta dec_bra dec_link" href="/pages/manifest/">VIEW_ALL</a>
    </div>
  </layout>
</section>    
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
        <link rel="stylesheet" href="/assets/css/pages/${def.type}_single.css">
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
                                <a class="link dec_bra dec_link" href="/pages/about.html">SYSTEM</a>
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
                            <a class="link" href="/pages/team.html">PERSONNEL</a>
                            <a class="link" href="/pages/about.html">SYSTEM</a>
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
                    <div class="x-12 x-lg-8 x-xxl-6 main">
                        <img class="thumbnail" src="${def.thumbnail}" alt="">
                        <h1 class="h2 heading">${def.heading}</h1>
                        <div class="content__wrapper" id="content-wrapper">
${main} 
                        </div>
                    </div>
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
                        <a href="/pages/team.html" class="link">PERSONNEL</a>
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

        <div class="preference-menu" id="preference-menu" popover data-component="preference-menu">
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
            </div>
        </div>

        <div class="search-menu" id="search-menu" popover data-component="search-menu">
            <div class="header">
                <div class="wrapper">
                    <h3 class="heading">SEARCH</h3>
                    <button class="dec_meta dec_bra dec_link close-btn" commandfor="search-menu"
                        command="hide-popover">CLOSE</button>
                </div>
                <div class="input__wrapper">
                    <input class="search-input" type="search" id="nav-search-input" placeholder="Search Items">
                </div>
            </div>
            <div class="scroller" data-smooth-scroll="prevent">

            </div>
        </div>

        <backdrop></backdrop>

        <script src="/layx/layx.js" type="module"></script>

        <script src="/assets/js/base.js" type="module"></script>
        <script src="/assets/js/pages/${def.type}_single.js" type="module"></script>
    </body>

</html>
`
}