var http = require('http'),

    api = require('./lib/api.js'),
    Cache = require('./lib/cache.js'),
    Package = require('./lib/package.js'),

    config = require('./config.js');

Resource.setCache(new Cache({ path: config.cacheDirectory }));
Resource.setCacheAge(config.cacheAge);
Resource.setMaxRetries(5);

Package.configure({
  externalUrl: config.externalUrl
});

var server = http.createServer();

server.on('request', function(req, res) {
  if(!api.route(req, res)) {
    console.log('No route found', req.url);
    res.end();
  }
}).listen(config.port, config.host);

console.log('npm_lazy at', config.host, 'port', config.port);
