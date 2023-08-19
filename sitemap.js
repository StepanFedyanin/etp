const SitemapGenerator = require('sitemap-generator');
// create generator
const generator = SitemapGenerator('http://stroytech.flexidev.ru:3000/', {
    stripQuerystring: false
});
// register event listeners
generator.on('done', () => {
    console.log('sitemaps created');
    // sitemaps created
});
// start the crawler
generator.start();