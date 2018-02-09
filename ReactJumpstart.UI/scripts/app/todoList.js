"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoList = function (_React$Component) {
	_inherits(TodoList, _React$Component);

	function TodoList(props) {
		_classCallCheck(this, TodoList);

		var _this = _possibleConstructorReturn(this, (TodoList.__proto__ || Object.getPrototypeOf(TodoList)).call(this, props));

		_this.state = {
			name: props.name,
			items: []
		};
		_this.todoService = props.todoService;
		_this.getItems(props.id);
		return _this;
	}

	_createClass(TodoList, [{
		key: "getItems",
		value: function getItems(listId) {
			var that = this;
			var success = function success(data) {
				that.setState({ items: data });
			};
			var error = function error(xhr, text, status) {
				console.error("error: [" + text + "] [" + status + "]");
			};

			this.todoService.getItems(listId, success, error);
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var items = this.state.items.map(function (item) {
				return React.createElement(TodoItem, { key: item.id, id: item.id, text: item.text, done: item.done, notes: item.notes, todoService: _this2.todoService });
			});
			return React.createElement(
				"div",
				null,
				React.createElement(
					"h3",
					null,
					this.state.name
				),
				React.createElement(
					"ul",
					null,
					" ",
					items,
					" "
				)
			);
		}
	}]);

	return TodoList;
}(React.Component);