Meteor.methods({
  follow: function(followingId) {
    check(followingId, String);
    userId = Meteor.userId();
    result = Friends.findOne({userId: userId, followingId: followingId});
    if (result) {
      Friends.update(result._id, {$set:{status: true, updatedAt: new Date()}});
    } else {
      Friends.insert({
        userId: userId,
        followingId: followingId,
        followingUsername: Meteor.users.findOne(followingId).username,
        createdAt: new Date(),
        status: true
      });
    }
  },
  unfollow: function(followingId) {
    check(followingId, String);
    userId = Meteor.userId();
    result = Friends.findOne({userId: userId, followingId: followingId});
    if (result) {
      Friends.update(result._id, {$set:{updatedAt: new Date(), status: false}});
    }
  },
  isfollowing: function(userId, followingId) {
    check(userId, String);
    check(followingId, String);
    result = Friends.findOne({userId: userId, followingId: followingId});
    if (result) {
      return result.status;
    } else {
      return false;
    }
  }
});
