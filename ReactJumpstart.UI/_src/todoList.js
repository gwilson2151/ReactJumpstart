class TodoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			isExpanded: false,
			isLoading: false
		};
		this.toggleExpand = this.toggleExpand.bind(this);
		this.deleteList = this.deleteList.bind(this);
	}

	getItems(listId) {
		const completeCallback = () => {
			this.setState({ isLoading: false });
		};

		this.props.onGetItems(listId, completeCallback);
		this.setState({ isLoading: true });
	}

	toggleExpand() {
		const willExpand = !this.state.isExpanded;

		if (willExpand) {
			this.getItems(this.props.id);
		}

		this.setState({ isExpanded: willExpand });
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
					<TodoItem key={item.id} id={item.id} text={item.text} done={item.done} notes={item.notes} onDeleteItem={this.props.onDeleteItem} />
				);
			if (items && items.length > 0) {
				contents = (<ul>{items}</ul>);
			} else {
				contents = (<div>no items.</div>);
			}
			form = (<CreateTodoItemForm listId={this.props.id} onCreateItem={this.props.onCreateItem}/>);
		}
		
		const expandIndicator = this.state.isExpanded ? "[-]" : "[+]";
		return (<div>
			<div>
				<span onClick={this.toggleExpand}>{expandIndicator} {this.state.name}</span>
				<span onClick={this.deleteList}>|DELETE|</span>
			</div>
			{form}
			{contents}
			</div>);
	}
}