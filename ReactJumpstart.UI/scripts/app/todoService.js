"use strict";

class TodoService {
	constructor(params) {
		this._params = params;
	}

	getLists(successCallback, errorCallback) {
		this._params.jQuery.ajax(this._params.listsUri, {
			"method": "GET",
			"dataType": "json",
			"jsonp": false,
			"success": successCallback,
			"error": errorCallback
		});
	}

	createList(list, successCallback, errorCallback) {
		this._params.jQuery.ajax(this._params.listsUri, {
			"method": "POST",
			"dataType": "json",
			"jsonp": false,
			"data": list,
			"success": successCallback,
			"error": errorCallback
		});
	}

	updateList(list, successCallback, errorCallback) {
		this._params.jQuery.ajax(this._params.listsUri + `/${list.id}`, {
			"method": "PUT",
			"dataType": "json",
			"jsonp": false,
			"data": list,
			"success": successCallback,
			"error": errorCallback
		});
	}

	deleteList(listId, successCallback, errorCallback) {
		this._params.jQuery.ajax(this._params.listsUri + `/${listId}`, {
			"method": "DELETE",
			"success": successCallback,
			"error": errorCallback
		});
	}

	getItems(listId, successCallback, errorCallback) {
		const query = `?listId=${listId}`;
		this._params.jQuery.ajax(this._params.itemsUri + query, {
			"method": "GET",
			"dataType": "json",
			"jsonp": false,
			"success": successCallback,
			"error": errorCallback
		});
	}

	createItem(item, successCallback, errorCallback) {
		this._params.jQuery.ajax(this._params.itemsUri, {
			"method": "POST",
			"dataType": "json",
			"jsonp": false,
			"data": item,
			"success": successCallback,
			"error": errorCallback
		});
	}

	updateItem(item, successCallback, errorCallback) {
		this._params.jQuery.ajax(this._params.itemsUri + `/${item.id}`, {
			"method": "PUT",
			"dataType": "json",
			"jsonp": false,
			"data": item,
			"success": successCallback,
			"error": errorCallback
		});
	}

	deleteItem(id, successCallback, errorCallback) {
		this._params.jQuery.ajax(this._params.itemsUri + `/${id}`, {
			"method": "DELETE",
			"success": successCallback,
			"error": errorCallback
		});
	}
}