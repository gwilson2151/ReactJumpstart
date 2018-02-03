class TodoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			items: props.items || []
		};
	}

	render() {
		const items = this.state.items.map((item) => 
					<TodoItem key={item.id} id={item.id} text={item.text} done={item.done} notes={item.notes} />
				);
		return (<div>
			<h3>{this.state.name}</h3>
			<ul> {items} </ul>
			</div>);
	}
}