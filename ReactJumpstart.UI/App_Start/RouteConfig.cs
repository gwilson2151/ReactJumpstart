using System.Web.Mvc;
using System.Web.Routing;

namespace ReactJumpstart.UI
{
	public class RouteConfig
	{
		public static void RegisterRoutes(RouteCollection routes) {
			routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

			routes.MapRoute("default",
				"",
				new {controller = "Default", action = "Index"});
		}
	}
}