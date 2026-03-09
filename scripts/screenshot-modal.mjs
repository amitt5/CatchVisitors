import puppeteer from 'puppeteer';
import { mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../screenshots');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1');

await page.goto('http://localhost:3000/hotels', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));

// Log all button texts
const buttonTexts = await page.evaluate(() => 
  Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim())
);
console.log('Buttons found:', buttonTexts);

// Click the Talk to AI Concierge button
const clicked = await page.evaluate(() => {
  const btns = Array.from(document.querySelectorAll('button'));
  const btn = btns.find(b => b.textContent?.includes('Concierge') || b.textContent?.includes('Talk to'));
  if (btn) { btn.click(); return btn.textContent?.trim(); }
  return null;
});
console.log('Clicked:', clicked);

await new Promise(r => setTimeout(r, 2000));
await page.screenshot({ path: join(outDir, 'mobile-state1-idle.png') });
console.log('State 1 (idle) screenshot saved');

await browser.close();
