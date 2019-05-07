const Purgecss = require('purgecss');

const purgeCss = new Purgecss({
    content: ['./docs/index-FR.html'],
    css: ['./docs/css/all.css']
});
const result = purgeCss.purge();
console.info(result);
