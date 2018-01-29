using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ReactJumpstart.API.Models;
using ReactJumpstart.API.Store;
using ReactJumpstart.API.Store.Models;

namespace ReactJumpstart.API.Controllers
{
	public class ItemsController : ApiController
	{
		private readonly ITodoRepository _todoRepository;

		public ItemsController() : this(new TodoRepository()) {
			
		}

		public ItemsController(ITodoRepository todoRepository) {
			_todoRepository = todoRepository;
		}

		// GET api/items
		public IHttpActionResult Get() {
			var listIdVal = Request.GetQueryNameValuePairs().FirstOrDefault(nv => nv.Key.Equals("listid", StringComparison.OrdinalIgnoreCase));
			if (listIdVal.Equals(default(KeyValuePair<string, string>)) || string.IsNullOrWhiteSpace(listIdVal.Value))
				return BadRequest("Must specify an integer listId to get a collection.");
			int listId;
			try
			{
				listId = Convert.ToInt32(listIdVal.Value);
			}
			catch (Exception)
			{
				return BadRequest("Must specify an integer listId to get a collection.");
			}

			var items = _todoRepository.GetItemsByListId(listId);
			if (items == null)
				return NotFound();
			return Ok(items.Select(ToDto));
		}

		// GET api/items/5
		public IHttpActionResult Get(int id) {
			var item = _todoRepository.GetItem(id);
			if (item == null)
				return NotFound();
			return Ok(ToDto(item));
		}

		// POST api/items
		public IHttpActionResult Post([FromBody]TodoItemDto value) {
			if (!ValidatePost(value))
				return BadRequest("Ensure item has listId, text and optionally done, notes.");
			return Ok(ToDto(_todoRepository.AddItem(value.listId, value.text, value.done, value.notes)));
		}

		// PUT api/items/5
		public IHttpActionResult Put(int id, [FromBody]TodoItemDto value) {
			var item = new TodoItem(id, value.listId, value.text, value.done, value.notes);
			item = _todoRepository.UpdateItem(item);
			if (null == item)
				return NotFound();
			return Ok(ToDto(item));
		}

		// DELETE api/items/5
		public IHttpActionResult Delete(int id) {
			if (null == _todoRepository.RemoveItem(id))
				return NotFound();
			return StatusCode(HttpStatusCode.NoContent);
		}

		private static bool ValidatePost(TodoItemDto item) {
			if (0 >= item.listId)
				return false;
			if (string.IsNullOrWhiteSpace(item.text))
				return false;
			return true;
		}

		private static TodoItemDto ToDto(TodoItem item) {
			return new TodoItemDto
			{
				id = item.Id,
				listId = item.ListId,
				text = item.Text,
				done = item.Done,
				notes = item.Notes
			};
		}
	}
}
