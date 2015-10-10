const BASEPATH = 'https://api.github.com';

Meteor.methods({
	createPullRequest: function(content) {
		let PUT = Meteor.wrapAsync(HTTP.put),
			POST = Meteor.wrapAsync(HTTP.post);

		let owner = 'Flightan',
			repo = 'loulou',
			path = 'test-1.yaml',
			branch = 'ludwig-test-2';

		try {
			PUT(`${BASEPATH}/repos/${owner}/${repo}/contents/${path}`, {
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `token ${Meteor.settings.oauth}`,
					'User-Agent': 'Ludwig',
				},
				data: {
					branch:		branch,
					message:	'Add test',
					content:	CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(content)),
				}
			});

			POST(`${BASEPATH}/repos/${owner}/${repo}/pulls`, {
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `token ${Meteor.settings.oauth}`,
					'User-Agent': 'Ludwig',
				},
				data: {
					base:	'master',
					head:	branch,
					title:	'Test PR',
				}
			});
		} catch(err) {
			throw new Meteor.Error(err.message);	// expose GitHub API response
		}
	}
});
