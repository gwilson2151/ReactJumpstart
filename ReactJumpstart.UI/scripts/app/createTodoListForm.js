'use strict';

class CreateTodoListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const completeCallback = () => this.setState({ value: '', isLoading: false });
    this.props.onCreateList({ name: this.state.value }, completeCallback);
    this.setState({ isLoading: true });
  }

  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        React.createElement(
          'label',
          null,
          'New List:',
          React.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange })
        ),
        React.createElement('input', { type: 'submit', value: 'CREATE', disabled: this.state.isLoading })
      )
    );
  }
}