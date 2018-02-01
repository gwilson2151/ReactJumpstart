using System.Web.Optimization;

namespace ReactJumpstart.UI.App_Start
{
	public class BundleConfig
	{
		public static void RegisterBundles(BundleCollection bundles) {
			bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
				"~/scripts/jquery-{version}.js",
				"~/scripts/jquery.validate*"
				));

			bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
				"~/scripts/bootstrap*",
				"~/scripts/popper*"
				));

			bundles.Add(new StyleBundle("~/content/css").Include(
					  "~/content/bootstrap.css",
					  "~/content/site.css"));
		}
	}
}