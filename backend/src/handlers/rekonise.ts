import { Page } from 'playwright';

export class RekoniseHandler {
  requiresCaptcha = false;
  matches = (url: string) => url.includes('rekonise.com');

  async execute(page: Page): Promise<string> {
    await page.waitForTimeout(1200);
    await page.evaluate(() => { (window as any).__rekoniseBypass = true; });
    const api = await page.waitForResponse(r => r.url().includes('/api/v1'));
    return (await api.json()).redirectUrl;
  }
}
