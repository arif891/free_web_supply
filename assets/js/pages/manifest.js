import dynamicRender from '../modules/dynamic_render.js';

new dynamicRender({
    type: 'manifest',
    container: '.manifest__layout',
    templateFile: '/build/templates/manifest.mjs',
    limit: 6
});
