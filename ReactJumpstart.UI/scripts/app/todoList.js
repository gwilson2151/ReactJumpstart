"use strict";

class TodoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"name": props.list.name,
			"isExpanded": false,
			"isLoading": false,
			"isEditing": false
		};
		this.toggleExpand = this.toggleExpand.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.deleteList = this.deleteList.bind(this);
		this.updateName = this.updateName.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.name !== this.state.name) {
			let list = {
				"id": this.props.list.id,
				"name": this.state.name
			};
			this.props.onUpdateList(list);
		}
	}

	updateName(name, completeCallback) {
		this.setState({ "name": name, "isEditing": false });
		if (completeCallback && typeof completeCallback === "function") completeCallback();
	}

	getItems(listId) {
		const completeCallback = () => {
			this.setState({ "isLoading": false });
		};

		this.props.onGetItems(listId, completeCallback);
		this.setState({ "isLoading": true });
	}

	toggleExpand() {
		const willExpand = !this.state.isExpanded;
		if (willExpand) {
			this.getItems(this.props.list.id);
		}
		this.setState({ "isExpanded": willExpand });
	}

	toggleEdit() {
		this.setState((prevState, props) => {
			return { "isEditing": !prevState.isEditing };
		});
	}

	deleteList() {
		this.props.onDeleteList(this.props.list.id);
	}

	render() {
		let contents;
		let form;

		if (this.state.isLoading) {
			contents = React.createElement(
				"div",
				null,
				"loading..."
			);
		} else if (this.state.isExpanded) {
			const items = this.props.list.items.map(item => React.createElement(TodoItem, { key: item.id,
				item: item,
				listId: this.props.list.id,
				onUpdateItem: this.props.onUpdateItem,
				onDeleteItem: this.props.onDeleteItem }));
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
			form = React.createElement(CreateTodoItemForm, { listId: this.props.list.id, onCreateItem: this.props.onCreateItem });
		}

		const expandIndicator = this.state.isExpanded ? "[-]" : "[+]";
		let name;
		let buttons;

		if (!this.state.isEditing) {
			name = React.createElement(
				"span",
				{ className: "hand list-name", onClick: this.toggleExpand },
				expandIndicator,
				" ",
				this.state.name
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
					{ type: "button", onClick: this.deleteList },
					"DELETE"
				)
			);
		} else {
			name = React.createElement(
				"span",
				null,
				React.createElement(
					"span",
					{ className: "hand", onClick: () => this.setState({ "isEditing": false, "isExpanded": false }) },
					expandIndicator,
					" "
				),
				React.createElement(EditableField, { value: this.state.name, buttonText: "UPDATE", onSubmit: this.updateName })
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
			"div",
			{ className: "list" },
			React.createElement(
				"div",
				{ className: "field-row" },
				name,
				buttons
			),
			form,
			contents
		);
	}
}