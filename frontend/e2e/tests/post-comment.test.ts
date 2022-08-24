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

		await page.screenshot({
			path: "/frontend/e2e/playwright-report/screenshots/page.png",
			fullPage: true,
		});
		await authPage.screenshot({
			path: "/frontend/e2e/playwright-report/screenshots/auth.png",
			fullPage: true,
		});
		await authPage.locator("text=Authorize").click();
		await page.locator("body").focus();
		await iframe.locator("textarea").type("Hello World");
		await page.screenshot({
			path: "/frontend/e2e/playwright-report/screenshots/before-post.png",
			fullPage: true,
		});
		await iframe.locator("text=Send").click();
		await page.screenshot({
			path: "/frontend/e2e/playwright-report/screenshots/after-post.png",
			fullPage: true,
		});
	});
});
