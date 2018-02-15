"use strict";

class TodoItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: props.text,
			done: props.done,
			notes: props.notes
		};
		this.deleteItem = this.deleteItem.bind(this);
	}

	deleteItem() {
		this.props.onDeleteItem(this.props.id);
	}

	render() {
		return React.createElement(
			"li",
			null,
			React.createElement(
				"span",
				null,
				this.state.text
			),
			React.createElement(
				"span",
				{ onClick: this.deleteItem },
				"|DELETE|"
			)
		);
	}
}