"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TodoService = function () {
	function TodoService(params) {
		_classCallCheck(this, TodoService);

		this._params = params;
	}

	_createClass(TodoService, [{
		key: "getLists",
		value: function getLists(successCallback, errorCallback) {
			this._params.jQuery.ajax(this._params.listsUri, {
				method: "GET",
				dataType: "json",
				jsonp: false,
				success: successCallback,
				error: errorCallback
			});
		}
	}, {
		key: "getItems",
		value: function getItems(listId, successCallback, errorCallback) {
			var query = "?listId=" + listId;
			this._params.jQuery.ajax(this._params.itemsUri + query, {
				method: "GET",
				dataType: "json",
				jsonp: false,
				success: successCallback,
				error: errorCallback
			});
		}
	}]);

	return TodoService;
}();