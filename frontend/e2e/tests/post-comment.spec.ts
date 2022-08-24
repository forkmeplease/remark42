import { test } from '@playwright/test'
import { getScreenshotsPath } from 'lib/screenshots'

test.describe('Post comment', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/web/')
	})

	test('as dev user', async ({ page, browserName }) => {
		const getPath = getScreenshotsPath({
			browserName,
			testName: 'post-comment-as-dev-user',
		})
		const iframe = page.frameLocator('iframe[name]')
		await iframe.locator('text=Sign In').click()
		await iframe.locator("[title='Sign In with Dev']").click()
		const authPage = await page.waitForEvent('popup')
		await page.screenshot({
			path: getPath('auth-popup'),
			fullPage: true,
		})
		await authPage.screenshot({
			path: getPath('auth-dropdown'),
			fullPage: true,
		})
		await authPage.locator('text=Authorize').click()
		// triggers tab visibility and enables widget to re-render with auth state
		await page.press('iframe[name]', 'Tab')
		await iframe.locator('textarea').click()
		await iframe.locator('textarea').type('Hello World')
		await page.screenshot({
			path: getPath('before-submit'),
			fullPage: true,
		})
		await iframe.locator('text=Send').click()
		await page.screenshot({
			path: getPath('after-submit'),
			fullPage: true,
		})
	})
})
