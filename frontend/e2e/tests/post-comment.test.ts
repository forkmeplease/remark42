import { test } from "@playwright/test";

test.describe("Post comment", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/web/");
	});

	test("as dev user", async ({ page }) => {
		const iframe = page.frameLocator("iframe[name]");

		await iframe.locator("text=Sign In").click();
		await iframe.locator("[title='Sign In with Dev']").click();

		const authPage = await page.waitForEvent("popup");

		await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
		await authPage.screenshot({
			path: "/playwright-report/screenshots/dev-user-sign-in.png",
			fullPage: true,
		});
		await authPage.locator("text=Authorize").click();
		await page.locator("body").focus();
		await iframe.locator("textarea").type("Hello World");
		await iframe.locator("text=Send").click();
	});
});
