export { genAssetSection };

function genAssetSection(items) {
    return `
    <section class="asset__section" id="asset-section">
      <layout class="asset__layout gap">
       ${genAssetItems(items)}
      </layout>
    </section>
    `
}

function genAssetItems(items) {
    return items.map(item => `
      <div class="x-12 x-md-6 x-lg-4 x-xxl-3 asset">
        <img class="image" src="${item.image}" alt="">
        <div class="wrapper">
          <div class="top">
            ${item.link ? `
            <a class="link" href="${item.link}" title="View">
              <svg class="icon">
                <use href="/assets/image/svg/icons.svg#arrow-up-right" />
              </svg>
            </a>` : ''}
            <a class="link" href="${item.download ?? item.image}" download title="Download">
              <svg class="icon">
                <use href="/assets/image/svg/icons.svg#download" />
              </svg>
            </a>
          </div>
          <div class="bottom">
            <h1 class="h4 title">${item.title}</h1>
          </div>
        </div>
      </div>
    `).join('')
}
