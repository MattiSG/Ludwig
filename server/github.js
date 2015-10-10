const BASEPATH = 'https://api.github.com/repos',
	owner = 'Flightan',
	repo = 'loulou',
	headers = {
		Accept: 'application/vnd.github.v3+json',
		Authorization: `token ${Meteor.settings.oauth}`,
		'User-Agent': 'Ludwig',
	};


Meteor.methods({
	createPullRequest: function(content) {
		let path = 'test-2.yaml',
			target = 'master',
			branch = 'ludwig-test-7';

		try {
			let targetRef = HTTP.get(`${BASEPATH}/${owner}/${repo}/git/refs/heads/${target}`, {
				headers
			});

			HTTP.post(`${BASEPATH}/${owner}/${repo}/git/refs`, {
				headers,
				data: {
					ref:	`refs/heads/${branch}`,
					sha:	targetRef.data.object.sha,
				}
			});

			HTTP.put(`${BASEPATH}/${owner}/${repo}/contents/${path}`, {
				headers,
				data: {
					path,
					branch,
					message:	'Add test',
					content:	CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(content)),
				}
			});

			HTTP.post(`${BASEPATH}/${owner}/${repo}/pulls`, {
				headers,
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

Meteor.methods({
	clone: () => {
		try {
			var result = Git.clone(`https://github.com/${owner}/${repo}`, `${Meteor.settings.basePath}/${repo}/`);
			return result;
		} catch (ex) {
			throw new Meteor.Error(500, 'Exception in clone', ex);
		}
	}
});
