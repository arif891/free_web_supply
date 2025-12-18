export { genDefault, genRoot };

function genDefault() {
    return `
<!-- default template -->
<info>
category: tutorial;
author: admin;
tags: html css  js;
</info>
`
}

function genRoot(title, main, meta = '') {
    return `
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>

    ${meta}

    <!-- <link rel="stylesheet" href="/layx/layx.css"> -->

    <link rel="stylesheet" href="/assets/css/base.css">
    <link rel="stylesheet" href="/assets/css/pages/inventory_single.css">
  </head>

  <body>

    ${main}

    <!-- <script src="/layx/layx.js" type="module"></script> -->

    <script src="/assets/js/base.js" type="module"></script>
    <script src="/assets/js/pages/inventory_single.js" type="module"></script>
  </body>

</html>    
`
}