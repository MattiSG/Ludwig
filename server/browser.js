var fs = Npm.require('fs');
var path = Npm.require('path');

function walk(root, done) {
  let results = [];
  fs.readdir(root, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);

    list.forEach(function(file) {
      if (file === '.git') {
        if (!--pending) done(null, results);
      } else {
        file = path.resolve(root, file);

        fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory()) {
            walk(file, function(err, res) {
              results = results.concat(res);
              if (!--pending) done(null, results);
            });
          } else {
            results.push(file);
            if (!--pending) done(null, results);
          }
        });
      }
    });
  });
}

Meteor.methods({
  getTree: () => {
    let readdir = Meteor.wrapAsync(walk);

    try {
      let result = readdir(Meteor.settings.basePath);
      return result;
    } catch (ex) {
      return Meteor.Error(500, 'Error in getTree', ex);
    }
  }
});
