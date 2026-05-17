import dynamicRender from '../modules/dynamic_render.js';

new dynamicRender({
    type: 'asset',
    container: '.asset__layout',
    templateFile: '/build/templates/asset.mjs',
    limit: 12
});


document.addEventListener('click', (e) => {
    const linkBase = 'https://fws-supply.website/asset/single?id=';

    const btn = e.target.closest('button[data-action="copy"]');
    if (!btn) return;

    const text = linkBase + btn.dataset.id;

    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Copied:', text);
            const icon = btn.querySelector('svg use');
            icon.setAttribute('href', '/assets/image/svg/icons.svg#clipboard-check');
            setTimeout(() => {
                icon.setAttribute('href', '/assets/image/svg/icons.svg#link');
            }, 2500);
        })
        .catch(err => {
            console.error('Failed to copy:', err);
        });
});
