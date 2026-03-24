import { Page } from 'playwright';

export class LootLinkHandler {
  requiresCaptcha = true;
  matches = (url: string) => url.includes('loot-link.com') || url.includes('lootlink');

  async execute(page: Page): Promise<string> {
    await page.evaluate(() => document.querySelectorAll('button').forEach(b => b.click()));
    const res = await page.waitForResponse(r => r.url().includes('/api/redirect'));
    return (await res.json()).url;
  }

  async submitCaptcha(page: Page, token: string): Promise<string> {
    await page.evaluate((t) => (window as any).captcha = t, token);
    const final = await page.waitForResponse(r => r.url().includes('/validate'));
    return (await final.json()).destination;
  }
}
