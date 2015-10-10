var GithubApi = Meteor.npmRequire('github');
var github = new GithubApi({
	version: "3.0.0"
});

github.authenticate({
	type:	'oauth',
	token:	Meteor.settings.oauth
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
				content:	CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(content)),
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
