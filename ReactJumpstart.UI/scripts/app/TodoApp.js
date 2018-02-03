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
		console.log(props);
		_this.getLists();
		return _this;
	}

	_createClass(TodoApp, [{
		key: "getInitialState",
		value: function getInitialState() {
			this.getLists();
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			this.getLists();
		}
	}, {
		key: "getLists",
		value: function getLists() {
			console.log("TodoApp.getLists");
			var self = this;
			jQuery.ajax("http://localhost:62880/api/lists", {
				method: "GET",
				dataType: "json",
				jsonp: false,
				success: function success(data) {
					console.log(data);
					self.setState({ lists: data });
				},
				error: function error(xhr, text, status) {
					// some error display here.
					console.log("error: [" + text + "] [" + status + "]");
				}

			});
		}
	}, {
		key: "render",
		value: function render() {
			var lists = this.state.lists.map(function (list) {
				return React.createElement(TodoList, { key: list.id, id: list.id, name: list.name });
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