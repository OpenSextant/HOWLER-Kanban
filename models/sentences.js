Sentences = new Mongo.Collection('sentences');


WordSchema = new SimpleSchema({
	surfaceForm:{type:String},
	logicalForm:{type:String},
	partOfSpeech:{type:String},
	vocabulary:{type:String},
	auxiliary:{type:String, optional: true},
	baseVerb:{type:String, optional: true},
	particle:{type:String, optional: true},
});


Sentences.attachSchema(new SimpleSchema({
	text: {type: String},
	words: {type: [WordSchema]},
	keys:{type:[String]},
	parseable: {type: Boolean},
	inferred: {type: Boolean},
	userId: {type: String, optional: true},
	boardId: {type: String, optional: true},
	createdAt: {type: Date, denyUpdate: true, optional: true},
}));

Sentences.helpers({
	board() {
		return Boards.findOne(this.boardId);
	},

	cards() {
		return Cards.find( {title: {$in: this.keys()} });
	},
	
	displayText() {
		
		if (this.inferred){
			return '(*) ' + this.text
		}else{
			return this.text
		}
		
		
	}
	

});

Sentences.before.insert((userId, doc) => {
	doc.userId =userId;
	doc.createdAt = new Date();
});


Sentences.allow({
	insert(userId, doc) {
		//return true;
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
