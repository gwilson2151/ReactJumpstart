"use strict";

class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lists: props.lists || []
		};
		this.getLists();
		this.getItems = this.getItems.bind(this);
		this.createList = this.createList.bind(this);
	}

	_verifyCompleteCallback(callback) {
		if (callback && typeof callback === "function") {
			return () => callback();
		}

		return () => {};
	}

	getLists(onComplete) {
		const completeCallback = this._verifyCompleteCallback(onComplete);
		const success = data => {
			this.setState({ lists: data });
			completeCallback();
		};
		const error = (xhr, text, status) => {
			console.error(`getLists error: text='${text}' status='${status}'`);
			completeCallback();
		};
		this.props.todoService.getLists(success, error);
	}

	createList(list, onComplete) {
		const completeCallback = this._verifyCompleteCallback(onComplete);
		const success = data => {
			this.setState((prevState, props) => {
				return { lists: prevState.lists.concat(data) };
			});
			completeCallback();
		};
		const error = (xhr, text, status) => {
			console.error(`createLists error: text='${text}' status='${status}'`);
			completeCallback();
		};
		this.props.todoService.createList(list, success, error);
	}

	getItems(listId, onComplete) {
		const completeCallback = this._verifyCompleteCallback(onComplete);
		const success = data => {
			this.setState((prevState, props) => {
				const lists = prevState.lists.map(list => {
					if (list.id === listId) {
						return {
							id: list.id,
							name: list.name,
							items: data
						};
					}
					return list;
				});

				return { lists: lists };
			});
			completeCallback();
		};
		const error = (xhr, text, status) => {
			console.error(`getItems error: listId='${listId}' text='${text}' status='${status}'`);
			completeCallback();
		};

		this.props.todoService.getItems(listId, success, error);
	}

	render() {
		const lists = this.state.lists.map(list => React.createElement(TodoList, { key: list.id, id: list.id, name: list.name, items: list.items, onGetItems: this.getItems }));
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h1",
				null,
				"TodoApp"
			),
			React.createElement(CreateTodoListForm, { onCreateList: this.createList }),
			React.createElement(
				"div",
				null,
				lists
			)
		);
	}
}