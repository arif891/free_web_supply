export { genInventorySection };

function genInventorySection(items, total = 0, home = true) {
    if (home) {
        if (items.length > 6) items.length = 6;
    } else {
        if (items.length > 20) items.length = 20;
    }

    return `
 <section class="inventory__section" id="inventory-section">
  <layout class="gap-2 inventory__layout">
    <div class="x-12 info__wrapper">
      <span class="dec_bra">RAW_INVENTORY</span> <span class="d-md">COUNT: ${total}_UNITS</span>
    </div>
    <div class="x-12 header__wrapper">
      <h2 class="h4 sec__heading">INVENTORY_ITEMS</h2>
      <p>Audited units from the FWS core. Engineered to zero-radius standards for high-performance systems. The
        vanilla baseline starts here.</p>
    </div>
    <div class="x-12 sub-x gap-y-4 item__wrapper">
      ${genInventoryItems(items)}
    </div>
    ${home ? `
    <div class="x-12 info__wrapper c-md">
      <span class="d-md">STATUS: VERIFIED</span>
      <a class="dec_bra dec_link" href="/pages/inventory">VIEW_ALL</a>
      <span class="d-md">LAST_SYNC: ${new Intl.DateTimeFormat('en-GB').format(new Date()).replace(/\//g, '.')}</span>
    </div>
    ` : ''}
  </layout>
</section>   
    `
}

function genInventoryItems(items) {
    if (items.length > 1) items[1].cls = 'sp';
    if (items.length > 4) items[4].cls = 'sp';
    return items.map(item => `
      <div class="x-12 x-md-6 x-xl-4 item ${item.cls || ''}">
        <div class="thumbnail ${item.preview ? `preview" style="--preview: url(${item.preview});"` : '"'}>
            <img class="img" src="${item.thumbnail}" alt="" loading="lazy">
        </div>
        <h3 class="h4 title">${item.heading}</h3>
        <div class="tag__wrapper">
          ${item?.tags?.map(tag => `<a class="tag" href="">${tag}</a>`).join('')}
        </div>
        <div class="action__wrapper">
          <a class="btn dec_meta dec_bra dec_link action__btn" href="${item.url}">VIEW</a>
        </div>
      </div>
      `).join('')
}

