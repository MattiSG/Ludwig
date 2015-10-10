var GithubApi = Meteor.npmRequire('github');
var github = new GithubApi({
	version: "3.0.0"
});

github.authenticate({
	type:	'oauth',
	token:	'7bc1698f98cbddb0c6781e1bce647fd654746ac4'
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
