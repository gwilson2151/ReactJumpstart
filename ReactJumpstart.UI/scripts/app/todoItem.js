"use strict";

class TodoItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"text": props.text,
			"done": props.done,
			"notes": props.notes,
			"isEditing": false
		};
		this.deleteItem = this.deleteItem.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.updateText = this.updateText.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.text !== this.state.text || prevState.done !== this.state.done || prevState.notes !== this.state.notes) {
			this.updateItem();
		}
	}

	deleteItem() {
		this.props.onDeleteItem(this.props.id);
	}

	updateText(text, completeCallback) {
		this.setState({ "text": text, "isEditing": false });
		if (completeCallback && typeof completeCallback === "function") completeCallback();
	}

	updateItem() {
		let item = {
			"id": this.props.id,
			"listId": this.props.listId,
			"text": this.state.text,
			"done": this.state.done,
			"notes": this.state.notes
		};
		this.props.onUpdateItem(item);
	}

	toggleEdit() {
		this.setState((prevState, props) => {
			return { "isEditing": !prevState.isEditing };
		});
	}

	render() {
		let buttons;
		let text;
		if (!this.state.isEditing) {
			buttons = React.createElement(
				"span",
				null,
				React.createElement(
					"button",
					{ type: "button", onClick: this.toggleEdit },
					"EDIT"
				),
				React.createElement(
					"button",
					{ type: "button", onClick: this.deleteItem },
					"DELETE"
				)
			);
			text = React.createElement(
				"span",
				null,
				this.state.text
			);
		} else {
			text = React.createElement(
				"span",
				null,
				React.createElement(EditableField, { value: this.state.text, buttonText: "UPDATE", onSubmit: this.updateText })
			);
			buttons = React.createElement(
				"span",
				null,
				React.createElement(
					"button",
					{ type: "button", onClick: () => {
							this.setState({ "isEditing": false });
						} },
					"CANCEL"
				)
			);
		}
		return React.createElement(
			"li",
			null,
			text,
			buttons
		);
	}
}