namespace ReactJumpstart.API.Store.Models
{
	public class TodoItem
	{
		public int Id { get; private set; }
		public int ListId { get; private set; }
		public string Text { get; private set; }
		public bool Done { get; private set; }
		public string Notes { get; private set; }

		public TodoItem(int id, int listId, string text, bool done, string notes) {
			Id = id;
			ListId = listId;
			Text = text;
			Done = done;
			Notes = notes;
		}

		public TodoItem(TodoItem item, int listId = default(int), string text = default(string), bool? done = default(bool?), string notes = default(string)) {
			Id = item.Id;
			ListId = listId != default(int) ? listId : item.ListId;
			Text = text != default(string) ? text : item.Text;
			Done = done != default(bool?) ? done.Value : item.Done;
			Notes = notes != default(string) ? notes : item.Notes;
		}
	}
}