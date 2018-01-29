namespace ReactJumpstart.API.Store.Models
{
	public class TodoList
	{
		public int Id { get; private set; }
		public string Name { get; private set; }

		public TodoList(int id, string name) {
			Id = id;
			Name = name;
		}

		public TodoList(TodoList list, string name = default(string)) {
			Id = list.Id;
			Name = name != default(string) ? name : list.Name;
		}
	}
}