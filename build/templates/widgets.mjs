export { genWidget };

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
    <div class="wrapper">
    <nav class="toc" id="toc">
    </nav>
    </div>
</div>
`

        case 'action':
            return `
<div class="action__wrapper" id="action-wrapper">
    ${Object.entries(info.buttons).map(([action, info]) => `
   <button class="dec_bra dec_meta dec_link action__btn ${action.replaceAll(' ', '-')}" data-action="${action.replaceAll(' ', '-')}" data-info="${info}">${action.toUpperCase()}</button>`).join('')}
</div>       
`

        case 'detail':
            return `
<div class="detail__wrapper">
    <div class="header__wrapper">
        <h5 class="title">DETAILS</h5>
        <span class="dec_meta">UID_${info?.id}</span>
    </div>
    <div class="text__block_wrapper">
        <div class="text__block">
            <span class="dec_meta">CATEGORY:</span>
            <span class="dec_meta cap">${info?.category}</span>
        </div>
        <div class="text__block">
            <span class="dec_meta">DATE:</span>
            <span class="dec_meta">${info?.date}</span>
        </div>
    </div>
    <div class="tag__wrapper">
        ${info?.tags?.map(tag => `<a class="tag" href="">${tag}</a>`).join('')}
    </div>
</div>      
`
    }
}

