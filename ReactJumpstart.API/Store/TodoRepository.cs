using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using ReactJumpstart.API.Store.Models;

namespace ReactJumpstart.API.Store
{
	public class TodoRepository : ITodoRepository
	{
		private static readonly ConcurrentDictionary<int, TodoList> Lists = new ConcurrentDictionary<int, TodoList>();
		private static int s_nextListId = 0;
		private static readonly ConcurrentDictionary<int, TodoItem> Items = new ConcurrentDictionary<int, TodoItem>();
		private static int s_nextItemId = 0;

		public TodoList AddList(string name) {
			var nextId = Interlocked.Increment(ref s_nextListId);
			var list = new TodoList(nextId, name);
			Lists[list.Id] = list;
			return list;
		}

		public IEnumerable<TodoList> GetAllLists() {
			return Lists.Select(kvp => kvp.Value);
		}

		public TodoList GetList(int id) {
			TodoList list;
			return Lists.TryGetValue(id, out list) ? list : null;
		}

		public TodoList RemoveList(int id) {
			if (!Lists.ContainsKey(id))
				return null;

			var items = GetItemsByListId(id).ToList();
			TodoList list;
			Lists.TryRemove(id, out list);

			foreach (var item in items)
			{
				RemoveItem(item.Id);
			}

			return list;
		}

		public TodoList UpdateList(TodoList list) {
			if (!Lists.ContainsKey(list.Id))
				return null;
			return Lists[list.Id] = list;
		}

		public TodoItem AddItem(int listId, string text, bool done, string notes) {
			var nextId = Interlocked.Increment(ref s_nextItemId);
			var item = new TodoItem(nextId, listId, text, done, notes);
			Items.TryAdd(item.Id, item);
			return item;
		}

		public IEnumerable<TodoItem> GetItemsByListId(int listId) {
			if (!Lists.ContainsKey(listId))
				return null;
			return Items.Where(kvp => kvp.Value.ListId == listId).Select(kvp => kvp.Value);
		}

		public TodoItem GetItem(int id) {
			TodoItem item;
			return Items.TryGetValue(id, out item) ? item : null;
		}

		public TodoItem UpdateItem(TodoItem item) {
			if (!Items.ContainsKey(item.Id))
				return null;
			return Items[item.Id] = item;
		}

		public TodoItem RemoveItem(int id) {
			if (!Items.ContainsKey(id))
				return null;
			TodoItem item;
			Items.TryRemove(id, out item);
			return item;
		}
	}
}