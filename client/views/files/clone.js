Template.clone.onCreated(function() {
  this.error = new ReactiveVar();
});

Template.clone.events({
  'click button': (e, template) => {
    Meteor.call('clone', (err) => {
      if (err) {
        template.error.set(err);
      }
    });
  }
});

Template.clone.helpers({
  error: () => Template.instance().error.get()
});
