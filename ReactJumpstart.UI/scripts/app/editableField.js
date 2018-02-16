"use strict";

class EditableField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "value": props.value || "",
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
    this.props.onSubmit(this.state.value, completeCallback);
    this.setState({ "isLoading": true });
  }

  render() {
    return React.createElement(
      "span",
      null,
      React.createElement(
        "label",
        null,
        this.props.label,
        React.createElement("input", { type: "text", value: this.state.value, onChange: this.handleChange })
      ),
      React.createElement(
        "button",
        { type: "button", onClick: this.handleSubmit, disabled: this.state.isLoading },
        this.props.buttonText
      )
    );
  }
}