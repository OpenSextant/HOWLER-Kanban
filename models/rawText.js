RawText = new Mongo.Collection('rawtext');


RawText.attachSchema(new SimpleSchema({
	text: {type: String},
	boardId: {type: String},
	userId: {type: String},
	inferred:{type: Boolean},
	createdAt: {type: Date, denyUpdate: true, optional:true},
}));

RawText.allow({
	insert(userId, doc) {
		return allowIsBoardMember(userId, Boards.findOne(doc.boardId));
	},
	update(userId, doc) {
		return allowIsBoardMember(userId, Boards.findOne(doc.boardId));
	},
	remove(userId, doc) {
		return allowIsBoardMember(userId, Boards.findOne(doc.boardId));
	},
	fetch: ['boardId'],
});

RawText.before.insert((userId, doc) => {
	  doc.createdAt = new Date();
	  doc.userId = userId;
	});