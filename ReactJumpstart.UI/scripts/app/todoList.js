"use strict";

class TodoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			items: props.items || [],
			isExpanded: false,
			isLoading: false
		};
		this.toggle = this.toggle.bind(this);
	}

	getItems(listId) {
		const completeCallback = () => {
			this.setState({ isLoading: false });
		};

		this.props.onGetItems(listId, completeCallback);
		this.setState({ isLoading: true });
	}

	toggle() {
		const willExpand = !this.state.isExpanded;

		if (willExpand) {
			this.getItems(this.props.id);
		}

		this.setState({ isExpanded: willExpand });
	}

	render() {
		let contents;

		if (this.state.isLoading) {
			contents = React.createElement(
				"div",
				null,
				"loading..."
			);
		} else if (this.state.isExpanded) {
			const items = this.state.items.map(item => React.createElement(TodoItem, { key: item.id, id: item.id, text: item.text, done: item.done, notes: item.notes }));
			if (items && items.length > 0) {
				contents = React.createElement(
					"ul",
					null,
					items
				);
			} else {
				contents = React.createElement(
					"div",
					null,
					"no items."
				);
			}
		}

		const expandIndicator = this.state.isExpanded ? "[-]" : "[+]";
		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ onClick: this.toggle },
				expandIndicator,
				" ",
				React.createElement(
					"span",
					null,
					this.state.name
				)
			),
			contents
		);
	}
}