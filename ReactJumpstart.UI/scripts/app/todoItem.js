"use strict";

class TodoItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: props.text,
			done: props.done,
			notes: props.notes
		};
		this.todoService = props.todoService;
	}

	render() {
		return React.createElement(
			"li",
			null,
			this.state.text
		);
	}
}