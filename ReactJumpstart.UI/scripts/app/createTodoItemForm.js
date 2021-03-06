"use strict";

class CreateTodoItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "value": "",
      "isLoading": false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ "value": event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const completeCallback = () => this.setState({ "value": "", "isLoading": false });
    this.props.onCreateItem({ "text": this.state.value, "listId": this.props.listId }, completeCallback);
    this.setState({ "isLoading": true });
  }

  render() {
    return React.createElement(
      "div",
      { className: "field-row" },
      React.createElement(
        "form",
        { onSubmit: this.handleSubmit },
        React.createElement(
          "label",
          { htmlFor: "create-item-name" },
          "New Item: "
        ),
        React.createElement("input", { type: "text", value: this.state.value, id: "create-item-name", onChange: this.handleChange }),
        "\xA0",
        React.createElement("input", { type: "submit", value: "CREATE", disabled: this.state.isLoading })
      )
    );
  }
}