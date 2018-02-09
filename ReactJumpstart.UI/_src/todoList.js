class TodoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			items: []
		};
		this.todoService = props.todoService;
		this.getItems(props.id);
	}

	getItems(listId) {
		var that = this;
		var success = function(data) {
			that.setState({ items: data });
		};
		var error = function(xhr, text, status) {
			console.error("error: [" + text + "] [" + status + "]");
		};

		this.todoService.getItems(listId, success, error);
	}

	render() {
		const items = this.state.items.map((item) => 
					<TodoItem key={item.id} id={item.id} text={item.text} done={item.done} notes={item.notes} todoService={this.todoService} />
				);
		return (<div>
			<h3>{this.state.name}</h3>
			<ul> {items} </ul>
			</div>);
	}
}