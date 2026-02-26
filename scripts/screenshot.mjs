import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../screenshots');

const url = process.argv[2] || 'http://localhost:3000/hotels';
const filename = process.argv[3] || 'hotels-page.png';
const outPath = join(outDir, filename);

// Create screenshots dir if needed
import { mkdirSync, existsSync } from 'fs';
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

console.log(`Navigating to ${url}...`);
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

// Wait a bit for fonts/images to load
await new Promise(r => setTimeout(r, 2000));

// Full-page screenshot
await page.screenshot({ path: outPath, fullPage: true });
console.log(`Screenshot saved: ${outPath}`);

await browser.close();
