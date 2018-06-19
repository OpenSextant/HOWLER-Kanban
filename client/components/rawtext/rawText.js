BlazeComponent.extendComponent({

	getInput() {
		return this.$('.js-rawtext-input');
	},

	events() {
		return [{

			'submit .js-rawtext-form'(evt) {
				const input = this.getInput();
				const text = input.val().trim();
				if (text) {
					RawText.insert({
						text,
						boardId:Session.get('currentBoard'),
						userId: this.currentData().userId,
						inferred: false,
					});
					resetRawTextInput(input);
					Tracker.flush();
					autosize.update(input);
				}
				evt.preventDefault();
			},
			// Pressing Ctrl+Enter should submit the form
			'keydown form textarea'(evt) {
				if (evt.keyCode === 13 && (evt.metaKey || evt.ctrlKey)) {
					this.find('button[type=submit]').click();
				}
			},
		}];
	},
}).register('rawtext');



function resetRawTextInput(input) {
	input.val('');
	input.blur();
}