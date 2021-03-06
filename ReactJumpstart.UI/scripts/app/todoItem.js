"use strict";

class TodoItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"text": props.item.text,
			"done": props.item.done,
			"notes": props.item.notes,
			"isEditing": false
		};
		this.deleteItem = this.deleteItem.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.toggleDone = this.toggleDone.bind(this);
		this.updateText = this.updateText.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.text !== this.state.text || prevState.done !== this.state.done || prevState.notes !== this.state.notes) {
			this.updateItem();
		}
	}

	deleteItem() {
		this.props.onDeleteItem(this.props.item.id);
	}

	updateText(text, completeCallback) {
		this.setState({ "text": text, "isEditing": false });
		if (completeCallback && typeof completeCallback === "function") completeCallback();
	}

	updateItem() {
		let item = {
			"id": this.props.item.id,
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

	toggleDone() {
		this.setState((prevState, props) => {
			return { "done": !prevState.done };
		});
	}

	render() {
		let buttons;
		let text;
		const checkbox = React.createElement("input", { type: "checkbox", onChange: this.toggleDone, checked: this.state.done });

		if (!this.state.isEditing) {
			text = React.createElement(
				"span",
				{ className: `item-name ${this.state.done ? "done" : ""}` },
				this.state.text
			);
			buttons = React.createElement(
				"span",
				{ className: "buttons-container" },
				React.createElement(
					"button",
					{ type: "button", onClick: this.toggleEdit },
					"EDIT"
				),
				"\xA0",
				React.createElement(
					"button",
					{ type: "button", onClick: this.deleteItem },
					"DELETE"
				)
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
			checkbox,
			" ",
			text,
			" ",
			buttons
		);
	}
}