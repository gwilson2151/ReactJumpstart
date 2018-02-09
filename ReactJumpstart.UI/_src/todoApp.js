class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lists: props.lists || []
		};
		this.todoService = props.todoService;
		this.getLists();
	}

	getLists() {
		var that = this;
		var success = function(data) {
			that.setState({ lists: data });
		};
		var error = function(xhr, text, status) {
			console.error("error: [" + text + "] [" + status + "]");
		};
		this.todoService.getLists(success, error);
	}

	render() {
		const lists = this.state.lists.map((list) => 
			<TodoList key={list.id} id={list.id} name={list.name} todoService={this.todoService} />
		);
		return (
			<div>
				<h1>TodoApp</h1>
				<div>{lists}</div>
			</div>
			);
	}
}