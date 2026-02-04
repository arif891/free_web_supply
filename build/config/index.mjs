export const config = {
    directories: {

        out: {
            markdown: 'markdown/',
            html: {
                inventory: 'pages/inventory/',
                manifest: 'pages/manifest/'
            }
        },
        info: 'build/info/'
    },

    files: {
        home: 'index.html',
        in: {
            markdown: 'template.md'
        },
        info: {
            build: 'info.json'
        },
        default: {
            thumbnail: '/assets/images/base/default_thumbnail.avif'
        }
    }
}
