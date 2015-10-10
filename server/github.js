var GithubApi = Meteor.npmRequire('github');
var github = new GithubApi({
	version: "3.0.0"
});

github.authenticate({
	type:	'oauth',
	token:	'7bc1698f98cbddb0c6781e1bce647fd654746ac4'
});

Meteor.methods({
	createPullRequest: function(content) {
		let createContent = Meteor.wrapAsync(github.repos.createContent, github.repos),
			createPullRequest = Meteor.wrapAsync(github.pullRequests.create, github.pullRequests);

		try {
			createContent({
				user:		'Flightan',
				repo:		'loulou',
				ref:		'ludwig-test',
				message:	'Add test',
				path:		'test-1.yaml',
				content:	content,
			});

			createPullRequest({
				user:	'Flightan',
				repo:	'loulou',
				base:	'master',
				head:	'ludwig-test',
				title:	'Test PR',
			});
		} catch(err) {
			throw new Meteor.Error(JSON.parse(err.message));	// unwrap GitHub API response
		}
	}
});
