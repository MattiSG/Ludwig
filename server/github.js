var GithubApi = Meteor.npmRequire('github');
var github = new GithubApi({
    version: "3.0.0"
});

Meteor.methods({
  'getGists': function getGists(user) {
    var gists = Async.runSync(function(done) {
      github.gists.getFromUser({user: 'arunoda'}, function(err, data) {
        done(null, data);
      });
    });

    return gists.result;
  }
});