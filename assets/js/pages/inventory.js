import dynamicRender from '../modules/dynamic_render.js';

new dynamicRender({
    type: 'inventory',
    container: '.item__wrapper',
    templateFile: '/build/templates/inventory.mjs',
    limit: 6
});
