var path = Npm.require('path');
var GithubApi = Meteor.npmRequire('github');
var github = new GithubApi({
	version: "3.0.0"
});

github.authenticate({
	type:	'oauth',
	token:	Meteor.settings.oauth
});

Meteor.methods({
	createPullRequest: () => {
		return Async.runSync((done) => {
			github.pullRequests.create({
				user:	'Flightan',
				repo:	'loulou',
				base:	'master',
				head:	'ludwig-test',
				title:	'Test PR',
			}, done);
		}).result;
	}
});

Meteor.methods({
	clone: () => {
		try {
			var result = Git.clone('https://github.com/Flightan/loulou', path.join(Meteor.settings.basePath, '/loulou/'));
			return result;
		} catch (ex) {
			throw new Meteor.Error(500, 'Exception in clone', ex);
		}
	}
});
