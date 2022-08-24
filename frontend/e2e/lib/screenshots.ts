import * as path from 'path'

const basePath = process.env.CI ? '/frontend/e2e/playwright-report/screenshots/' : './playwright-report/screenshots/'

export function getScreenshotsPath(params: { browserName: string; testName: string }) {
	return function (name: string) {
		return path.resolve(basePath, `${name}_${params.testName}_${params.browserName}.png`)
	}
}
