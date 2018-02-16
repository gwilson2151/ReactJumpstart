class TodoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"name": props.name,
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
				"id": this.props.id,
				"name": this.state.name
			};
			this.props.onUpdateList(list);
		}
	}
	
	updateName(name, completeCallback) {
		this.setState({ "name": name, "isEditing": false });
		if (completeCallback && typeof(completeCallback) === "function") completeCallback();
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
			this.getItems(this.props.id);
		}
		this.setState({ "isExpanded": willExpand });
	}
	
	toggleEdit() {
		this.setState((prevState, props) => {
			return { "isEditing": !prevState.isEditing };
		});
	}
	
	deleteList() {
		this.props.onDeleteList(this.props.id);
	}

	render() {
		let contents;
		let form;
		
		if (this.state.isLoading) {
			contents = (<div>loading...</div>);
		} else if (this.state.isExpanded) {
			const items = this.props.items.map(item => 
					<TodoItem key={item.id} id={item.id} listId={this.props.id} text={item.text} done={item.done} notes={item.notes} onUpdateItem={this.props.onUpdateItem} onDeleteItem={this.props.onDeleteItem} />
				);
			if (items && items.length > 0) {
				contents = (<ul>{items}</ul>);
			} else {
				contents = (<div>no items.</div>);
			}
			form = (<CreateTodoItemForm listId={this.props.id} onCreateItem={this.props.onCreateItem}/>);
		}
		
		const expandIndicator = this.state.isExpanded ? "[-]" : "[+]";
		let name;
		let buttons;
		
		if (!this.state.isEditing) {
			name = (<span onClick={this.toggleExpand}>{expandIndicator} {this.state.name}</span>);
			buttons = (<span>
				<button type="button" onClick={this.toggleEdit}>EDIT</button>
				<button type="button" onClick={this.deleteList}>DELETE</button>
			</span>);
		} else {
			name = (<span>
				<span onClick={() => this.setState({"isEditing": false, "isExpanded": false})}>{expandIndicator} </span>
				<EditableField value={this.state.name} buttonText="UPDATE" onSubmit={this.updateName} />
			</span>);
			buttons = (<span><button type="button" onClick={() => {this.setState({"isEditing": false})}}>CANCEL</button></span>);
		}
		
		return (<div>
			<div>
				{name}{buttons}
			</div>
			{form}
			{contents}
			</div>);
	}
}