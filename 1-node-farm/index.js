const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

// SERVER

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/overview-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');

    const output = tempOverview.replace('{%ProductCards%}', cardsHtml);

    res.end(output);
  }

  // API
  else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  }

  // Product page
  else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);
  }

  // Not found
  else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen(8000, 'localhost', () => {
  console.log('Listening to requests on localhost:8000');
});
