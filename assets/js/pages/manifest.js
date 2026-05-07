import dynamicRender from '../modules/dynamic_render.js';

new dynamicRender({
    type: 'manifest',
    container: '.item__wrapper',
    templateFile: '/build/templates/manifest.mjs',
    limit: 6
});
