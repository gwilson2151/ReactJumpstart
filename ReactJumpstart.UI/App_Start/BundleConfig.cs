using System.Web.Optimization;

namespace ReactJumpstart.UI
{
	public class BundleConfig
	{
		public static void RegisterBundles(BundleCollection bundles) {
			bundles.Add(new ScriptBundle("~/bundles/lib").Include(
				"~/scripts/jquery-{version}.js",
				"~/scripts/jquery.validate*",
				"~/scripts/bootstrap*",
				"~/scripts/popper*",
				"~/scripts/react.js",
				"~/scripts/react-dom.js"
				));

			bundles.Add(new ScriptBundle("~/bundles/app").Include(
				"~/scripts/app/todoService.js",
				"~/scripts/app/todoApp.js",
				"~/scripts/app/todoList.js",
				"~/scripts/app/todoItem.js",
				"~/scripts/app/createTodoListForm.js",
				"~/scripts/app/createTodoItemForm.js"));

			bundles.Add(new StyleBundle("~/content/css").Include(
					  "~/content/bootstrap.css",
					  "~/content/site.css"));
		}
	}
}