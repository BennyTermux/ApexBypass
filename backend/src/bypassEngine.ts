import { Browser, Page } from 'playwright';
import { getHandler } from './handlers/index';
import { applyStealth } from './playwrightPool';
import { solveCaptcha } from './captchaBridge';
import { rotateProxy } from './proxyManager';

export async function bypassLink(url: string): Promise<string> {
  const proxy = await rotateProxy();
  const browser = await Browser.launch({ headless: true, proxy });
  const page = await browser.newPage();
  await applyStealth(page);

  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });

  const handler = getHandler(url);
  let direct = await handler.execute(page);

  if (handler.requiresCaptcha) {
    const captchaToken = await solveCaptcha(page);
    direct = await handler.submitCaptcha(page, captchaToken);
  }

  await page.close();
  await browser.close();
  return direct;
}
