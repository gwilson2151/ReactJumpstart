using System.Web.Mvc;

namespace ReactJumpstart.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			ViewBag.Title = "TodoList";

			return View();
		}
	}
}
