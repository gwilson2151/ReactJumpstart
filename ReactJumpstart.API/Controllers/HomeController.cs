using System.Web.Mvc;

namespace ReactJumpstart.API.Controllers
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
