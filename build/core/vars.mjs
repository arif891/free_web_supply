export const config = {
  directories: {

    out: {
        markdown: 'markdown/',
        html: 'pages/inventory/'
    },
    info: 'build/info/'
  },

  files: {
    in: {
        markdown: 'template.md'
    },
    info: {
      build: 'info.json'
    }
  }
}