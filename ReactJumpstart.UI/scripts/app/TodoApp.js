"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoApp = function (_React$Component) {
	_inherits(TodoApp, _React$Component);

	function TodoApp(props) {
		_classCallCheck(this, TodoApp);

		var _this = _possibleConstructorReturn(this, (TodoApp.__proto__ || Object.getPrototypeOf(TodoApp)).call(this, props));

		_this.state = {
			lists: props.lists || []
		};
		_this.todoService = props.todoService;
		_this.getLists();
		return _this;
	}

	_createClass(TodoApp, [{
		key: "getLists",
		value: function getLists() {
			var that = this;
			var success = function success(data) {
				that.setState({ lists: data });
			};
			var error = function error(xhr, text, status) {
				console.error("error: [" + text + "] [" + status + "]");
			};
			this.todoService.getLists(success, error);
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var lists = this.state.lists.map(function (list) {
				return React.createElement(TodoList, { key: list.id, id: list.id, name: list.name, todoService: _this2.todoService });
			});
			return React.createElement(
				"div",
				null,
				React.createElement(
					"h1",
					null,
					"TodoApp"
				),
				React.createElement(
					"div",
					null,
					lists
				)
			);
		}
	}]);

	return TodoApp;
}(React.Component);