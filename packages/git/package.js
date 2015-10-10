Package.describe({
  name: 'flightan:git',
  version: '0.0.1',
  documentation: 'README.md'
});

Npm.depends({
  'gift': '0.6.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use('ecmascript');
  api.addFiles('git.js', 'server');
  api.export('Git');
});
