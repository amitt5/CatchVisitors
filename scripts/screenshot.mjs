import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../screenshots');

const url = process.argv[2] || 'http://localhost:3000/hotels';
const filename = process.argv[3] || 'hotels-page.png';
const isMobile = process.argv.includes('--mobile');
const outPath = join(outDir, filename);

// Create screenshots dir if needed
import { mkdirSync, existsSync } from 'fs';
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();

if (isMobile) {
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1');
} else {
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
}

console.log(`Navigating to ${url}... (${isMobile ? 'mobile 390×844' : 'desktop 1440×900'})`);
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

// Wait a bit for fonts/images to load
await new Promise(r => setTimeout(r, 2000));

// Full-page screenshot
await page.screenshot({ path: outPath, fullPage: true });
console.log(`Screenshot saved: ${outPath}`);

await browser.close();
