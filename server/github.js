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
	getTree: () => {
		var response = Async.runSync((done) => {
			github.gitdata.getTree({
				user:	'Flightan',
				repo:	'loulou',
				sha:	'3446f80a653360af3be8d42eef5dc23814512955',
				recursive: true
			}, done);
		});

		return response.result;
	}
});
