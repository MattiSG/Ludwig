Template.createPullRequest.onCreated(function() {
	this.error = new ReactiveVar();
});


Template.createPullRequest.helpers({
	error: () => Template.instance().error.get()
});

Template.createPullRequest.events({
	'click button': (event, template) => {
		Meteor.call('createPullRequest', template.find('textarea').value, (err, result) => {
			template.error.set(err.error);
		});
	}
});
