namespace ReactJumpstart.API.Models
{
	public class TodoItemDto
	{
		public int id { get; set; }
		public int listId { get; set; }
		public string text { get; set; }
		public bool done { get; set; }
		public string notes { get; set; }
	}
}