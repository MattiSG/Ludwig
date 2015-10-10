Template.createPullRequest.events({
	'click button': () => {
		Meteor.call('createPullRequest');
	}
});
