export { genAssetSection, genAssetItems };

function genAssetSection(items) {
    if (items.length > 24) items.length = 24;
    return `
    <section class="asset__section" id="asset-section">
      <layout class="asset__layout gap" id="asset-scroller">
        ${genAssetItems(items)}
      </layout>
    </section>
    `
}

function genAssetItems(items) {
    return items.map(item => `
          <div class="x-12 x-md-6 x-lg-4 x-xxl-3 asset" data-id="${item.id}">
            <img class="image" src="${item.thumbnail}" alt="${item.heading}" loading="lazy">
            <div class="wrapper">
              <div class="top">
            <button class="link copy" title="Copy Link" data-id="${item.id}" data-action="copy">
              <svg class="icon">
                <use href="/assets/image/svg/icons.svg#link" />
              </svg>
            </button>

            ${item.link ? `
            <a class="link" href="${item.link}" title="View">
                  <svg class="icon">
                    <use href="/assets/image/svg/icons.svg#arrow-up-right" />
                  </svg>
            </a>` : ''}
            <a class="link" href="${item.download ? (item.download.startsWith('/') ? `https://raw.githubusercontent.com/arif891/free_web_supply/refs/heads/main${item.download}` : item.download) : item.thumbnail}" download title="Download">
                  <svg class="icon">
                    <use href="/assets/image/svg/icons.svg#download" />
                  </svg>
            </a>
              </div>
              <div class="bottom">
                <h1 class="h5 title">${item.heading}</h1>
              </div>
            </div>
          </div>
      `).join('')
}
