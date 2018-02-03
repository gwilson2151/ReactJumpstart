class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lists: props.lists || []
		};
		console.log(props);
		this.getLists();
	}

	getInitialState() {
		this.getLists();
	}

	componentWillReceiveProps(nextProps) {
		this.getLists();
	}

	getLists() {
		console.log("TodoApp.getLists");
		var self = this;
		jQuery.ajax("http://localhost:62880/api/lists",
			{
				method:"GET",
				dataType:"json",
				jsonp:false,
				success:function(data) {
					console.log(data);
					self.setState({ lists: data });
					
				},
				error:function(xhr, text, status) {
					// some error display here.
					console.log("error: [" + text + "] [" + status + "]");
				}

			}
		);
	}

	render() {
		const lists = this.state.lists.map((list) => 
			<TodoList key={list.id} id={list.id} name={list.name} />
		);
		return (
			<div>
				<h1>TodoApp</h1>
				<div>{lists}</div>
			</div>
			);
	}
}