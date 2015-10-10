Template.getTree.onCreated(function() {
  this.tree = new ReactiveVar();
});

Template.getTree.helpers({
  tree: function() {
    return Template.instance().tree.get();
  }
});

Template.getTree.events({
  'click button': (e, template) => {
    Meteor.call('getTree', function(err, result) {
      if (err) {
        console.error(err);
      }
      template.tree.set(result.tree);
    });
  }
});
