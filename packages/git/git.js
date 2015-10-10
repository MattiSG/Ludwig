var gift = Npm.require('gift');

Git = {
  clone: Meteor.wrapAsync(gift.clone)
};
