const BASEPATH = 'https://api.github.com';

Meteor.methods({
	createPullRequest: function(content) {
		let owner = 'Flightan',
			repo = 'loulou',
			path = 'test-2.yaml',
			target = 'master',
			branch = 'ludwig-test-6';

		try {
			let targetRef = HTTP.get(`${BASEPATH}/repos/${owner}/${repo}/git/refs/heads/${target}`, {
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `token ${Meteor.settings.oauth}`,
					'User-Agent': 'Ludwig',
				}
			});

			HTTP.post(`${BASEPATH}/repos/${owner}/${repo}/git/refs`, {
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `token ${Meteor.settings.oauth}`,
					'User-Agent': 'Ludwig',
				},
				data: {
					ref:	`refs/heads/${branch}`,
					sha:	targetRef.data.object.sha,
				}
			});

			HTTP.put(`${BASEPATH}/repos/${owner}/${repo}/contents/${path}`, {
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `token ${Meteor.settings.oauth}`,
					'User-Agent': 'Ludwig',
				},
				data: {
					path:		path,
					branch:		branch,
					message:	'Add test',
					content:	CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(content)),
				}
			});

			HTTP.post(`${BASEPATH}/repos/${owner}/${repo}/pulls`, {
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `token ${Meteor.settings.oauth}`,
					'User-Agent': 'Ludwig',
				},
				data: {
					base:	target,
					head:	branch,
					title:	'Test PR',
				}
			});
		} catch(err) {
			throw new Meteor.Error(err.message);	// expose GitHub API response
		}
	}
});
