using System.Net;
using System.Web.Http;
using ReactJumpstart.API.Models;
using ReactJumpstart.API.Store;
using ReactJumpstart.API.Store.Models;

namespace ReactJumpstart.API.Controllers
{
	public class ListsController : ApiController
	{
		private readonly ITodoRepository _todoRepository;

		public ListsController() : this(new TodoRepository()) {
			
		}

		public ListsController(ITodoRepository todoRepository){
			_todoRepository = todoRepository;
		}

		// GET api/lists
		public IHttpActionResult Get() {
			return Ok(_todoRepository.GetAllLists());
		}

		// GET api/lists/5
		public IHttpActionResult Get(int id) {
			var list = _todoRepository.GetList(id);
			if (list == null)
				return NotFound();
			return Ok(list);
		}

		// POST api/lists
		public IHttpActionResult Post([FromBody]TodoListDto value) {
			if (!ValidatePost(value))
				return BadRequest("Ensure list has name field...");
			return Ok(_todoRepository.AddList(value.name));
		}

		// PUT api/lists/5
		public IHttpActionResult Put(int id, [FromBody]TodoListDto value) {
			var list = new TodoList(id, value.name);
			list = _todoRepository.UpdateList(list);
			if (list == null)
				return NotFound();
			return Ok(list);
		}

		// DELETE api/lists/5
		public IHttpActionResult Delete(int id) {
			var list = _todoRepository.RemoveList(id);
			if (list == null)
				return NotFound();
			return StatusCode(HttpStatusCode.NoContent);
		}

		private static bool ValidatePost(TodoListDto list) {
			if (string.IsNullOrWhiteSpace(list.name))
				return false;
			return true;
		}
	}
}