export { genManifestSection };

function genManifestSection(items, total = 0, home = true) {
    if (home) {
        if (items.length > 4) items.length = 4;
        if (items.length > 0) items[0].type = 'left';
    } else {
        if (items.length > 20) items.length = 20;
        if (items.length > 0) items[0].cls = 'x-12 x-xl-6';
        if (items.length > 1) items[1].cls = 'x-12 x-md-6';
    }

    return `
<section class="manifest__section" id="manifest-section">
  <layout class="manifest__layout ${home ? '' : 'gap-x-4 gap-y-2'}" ${home ? 'data-vpt' : ''}>
    <div class="x-12 info__wrapper">
      <span class="dec_bra">SYSTEM_MANIFEST</span><span class="d-md">RECORDS_FOUND: ${total.toString().padStart(2, '0')}</span>
    </div>
    <div class="x-12 header__wrapper">
      <h2 class="h4 sec__heading">DOCUMENTATION</h2>
    </div>
    ${!home ? genManifestItems(items, 'x-12 x-md-6 x-xl-4') : ''}
    ${home ? `
    <div class="x-12 x-xxl-4 left ">` : ''}
      ${home ? genManifestItems(items.filter(item => item.type === 'left'), 'x-12 x-xl-6') : ''}
    ${home ? `</div>
    <div class="x-12 x-xxl-1 divider"></div>
    <div class="x-12 x-xxl-7 right">` : ''}
      ${home ? genManifestItems(items.filter(item => item.type !== 'left'), 'x-12 x-md-6') : ''}
    ${home ? `</div>
    <div class="x-12 bottom__wrapper">
      <a class="dec_meta dec_bra dec_link" href="/pages/manifest">VIEW_ALL</a>
    </div>` : ''}
  </layout>
</section>    
    `
}

function genManifestItems(items, cls = '') {
    return items.map(item => `
      <a href="${item.url}" class="${item.cls || cls} item">
        <img class="img" src="${item.thumbnail}" alt="Thumbnail" loading="lazy">
        <div class="wrapper">
          <h3 class="h4 title">${item.heading}</h3>
          <div class="info__wrapper">
            <span class="date">DATE: ${item.date}</span>
            <span class="dec_bra dec_link">DECRYPT</span>
          </div>
        </div>
      </a>
        `).join('');
}

