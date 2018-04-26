"use strict";

class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"lists": props.lists || []
		};
		this.getLists();
		this.createList = this.createList.bind(this);
		this.updateList = this.updateList.bind(this);
		this.deleteList = this.deleteList.bind(this);
		this.getItems = this.getItems.bind(this);
		this.createItem = this.createItem.bind(this);
		this.updateItem = this.updateItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
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
			this.setState({ "lists": data });
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
				return { "lists": prevState.lists.concat(data) };
			});
			completeCallback();
		};
		const error = (xhr, text, status) => {
			console.error(`createList error: text='${text}' status='${status}'`);
			completeCallback();
		};
		this.props.todoService.createList(list, success, error);
	}

	updateList(list, onComplete) {
		const completeCallback = this._verifyCompleteCallback(onComplete);
		const success = data => {
			this.setState((prevState, props) => {
				const lists = prevState.lists.map(l => {
					if (l.id === list.id) {
						return {
							"id": list.id,
							"name": list.name,
							"items": l.items
						};
					}
					return l;
				});

				return { "lists": lists };
			});
			completeCallback();
		};
		const error = (xhr, text, status) => {
			console.error(`updateList error: listId='${list.id}' text='${text}' status='${status}'`);
			completeCallback();
		};

		this.props.todoService.updateList(list, success, error);
	}

	deleteList(id) {
		const success = data => {
			this.setState((prevState, props) => {
				return { "lists": prevState.lists.filter(list => list.id !== id) };
			});
		};
		const error = (xhr, text, status) => {
			console.error(`deleteList error: text='${text}' status='${status}'`);
		};
		this.props.todoService.deleteList(id, success, error);
	}

	getItems(listId, onComplete) {
		const completeCallback = this._verifyCompleteCallback(onComplete);
		const success = data => {
			this.setState((prevState, props) => {
				const lists = prevState.lists.map(list => {
					if (list.id === listId) {
						return {
							"id": list.id,
							"name": list.name,
							"items": data
						};
					}
					return list;
				});

				return { "lists": lists };
			});
			completeCallback();
		};
		const error = (xhr, text, status) => {
			console.error(`getItems error: listId='${listId}' text='${text}' status='${status}'`);
			completeCallback();
		};

		this.props.todoService.getItems(listId, success, error);
	}

	createItem(item, onComplete) {
		const completeCallback = this._verifyCompleteCallback(onComplete);
		const success = data => {
			this.setState((prevState, props) => {
				const lists = prevState.lists.map(list => {
					if (list.id === item.listId) {
						return {
							"id": list.id,
							"name": list.name,
							"items": list.items.concat(data)
						};
					}
					return list;
				});

				return { "lists": lists };
			});
			completeCallback();
		};
		const error = (xhr, text, status) => {
			console.error(`createItem error: listId='${item.listId}' text='${text}' status='${status}'`);
			completeCallback();
		};

		this.props.todoService.createItem(item, success, error);
	}

	updateItem(item, onComplete) {
		const completeCallback = this._verifyCompleteCallback(onComplete);
		const success = data => {
			this.setState((prevState, props) => {
				const lists = prevState.lists.map(list => {
					if (list.id === item.listId) {
						let newItems = list.items.map(i => {
							if (i.id === item.id) {
								return item;
							}
							return i;
						});
						return {
							"id": list.id,
							"name": list.name,
							"items": newItems
						};
					}
					return list;
				});

				return { "lists": lists };
			});
			completeCallback();
		};
		const error = (xhr, text, status) => {
			console.error(`updateItem id='${item.id}' error: text='${text}' status='${status}'`);
			completeCallback();
		};
		this.props.todoService.updateItem(item, success, error);
	}

	deleteItem(id) {
		const success = data => {
			this.setState((prevState, props) => {
				const lists = prevState.lists.map(list => {
					if (list.items && list.items.find(item => item.id === id)) {
						const items = list.items.filter(item => item.id !== id);
						return {
							"id": list.id,
							"name": list.name,
							"items": items
						};
					}

					return list;
				});

				return { "lists": lists };
			});
		};
		const error = (xhr, text, status) => {
			console.error(`deleteItem id=${id} error: text='${text}' status='${status}'`);
		};
		this.props.todoService.deleteItem(id, success, error);
	}

	render() {
		const lists = this.state.lists.map(list => React.createElement(TodoList, { key: list.id,
			list: list,
			onUpdateList: this.updateList,
			onDeleteList: this.deleteList,
			onGetItems: this.getItems,
			onCreateItem: this.createItem,
			onUpdateItem: this.updateItem,
			onDeleteItem: this.deleteItem }));
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