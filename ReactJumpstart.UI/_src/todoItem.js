class TodoItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: props.text,
			done: props.done,
			notes: props.notes
		};
		this.deleteItem = this.deleteItem.bind(this);
	}
	
	deleteItem() {
		this.props.onDeleteItem(this.props.id);
	}

	render() {
		return (<li><span>{this.state.text}</span>
				<span onClick={this.deleteItem}>|DELETE|</span></li>);
	}
}