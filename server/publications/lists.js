Meteor.publish('list', (listId) => {
  check(listId, String);
  return Lists.find({ _id: listId });
});

Meteor.publish('lists',  function() {
	  return Lists.find();
});