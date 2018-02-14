class TodoService {
	constructor(params) {
		this._params = params;
	}

	getLists(successCallback, errorCallback)
	{
		this._params.jQuery.ajax(this._params.listsUri,
			{
				method:"GET",
				dataType:"json",
				jsonp:false,
				success:successCallback,
				error:errorCallback
			});
	}
	
	createList(list, successCallback, errorCallback) {
		this._params.jQuery.ajax(this._params.listsUri,
		{
			method:"POST",
			dataType:"json",
			jsonp:false,
			data:list,
			success:successCallback,
			error:errorCallback
		});
	}

	getItems(listId, successCallback, errorCallback)
	{
		const query = `?listId=${listId}`;
		this._params.jQuery.ajax(this._params.itemsUri + query,
			{
				method:"GET",
				dataType:"json",
				jsonp:false,
				success:successCallback,
				error:errorCallback
			});
	}
}