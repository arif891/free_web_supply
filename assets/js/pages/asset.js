import dynamicRender from '../modules/dynamic_render.js';

new dynamicRender({
    type: 'asset',
    container: '.asset__layout',
    templateFile: '/build/templates/asset.mjs',
    limit: 12
});
