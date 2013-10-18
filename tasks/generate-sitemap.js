module.exports = function() {
  var fs = require('fs');
  var _ = require('lodash');
  var walk = require('walk');
  var options = this.options();
  var template = _.template(fs.readFileSync(options.sitemap).toString());
  var done = this.async();
  var pages = [];
  var count = 0;
  var MAX = 10;
  var skip;

  function finish() {
    fs.writeFileSync('sitemap.xml', template({pages: pages}));
    done();
  }

  walk.walk(options.docdir).on('names', function(dir, names) {
    names.forEach(function(name) {
      // if (skip) {
      //   return;
      // }
      if (/.txt$/.test(name)) {
        pages.push({
          url: '/' + dir + '/' + name,
          lastmod: '2013-10-18'
        });
        // count++;
      }
      // if (count > MAX) {
      //   skip = true;
      //   finish();
      // }
    });
  }).on('end', finish)
};

module.exports.desc = 'generate the sitemap.xml listing all of the links';
