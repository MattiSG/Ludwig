Template.getTree.helpers({
  tree: () => {
    return Session.get('content').tree;
  }
});

Template.getTree.events({
  'click button': () => {
    Meteor.call('getTree', function(err, result) {
      Session.set('content', result);
      console.log(result);
    });
  }
});
