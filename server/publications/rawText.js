Meteor.publish('rawtext',  function() {
	  return RawText.find();
});