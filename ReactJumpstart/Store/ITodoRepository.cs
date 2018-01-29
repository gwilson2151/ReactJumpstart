using System.Collections.Generic;
using ReactJumpstart.Store.Models;

namespace ReactJumpstart.Store
{
	public interface ITodoRepository
	{
		TodoList AddList(string name);
		IEnumerable<TodoList> GetAllLists();
		TodoList GetList(int id);
		TodoList UpdateList(TodoList list);
		TodoList RemoveList(int id);

		TodoItem AddItem(int listId, string text, bool done, string notes);
		IEnumerable<TodoItem> GetItemsByListId(int listId);
		TodoItem GetItem(int id);
		TodoItem UpdateItem(TodoItem item);
		TodoItem RemoveItem(int id);
	}
}