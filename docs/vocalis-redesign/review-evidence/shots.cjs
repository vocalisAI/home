// Usage: node shots.cjs [baseUrl] [outDir]
// Captures every route and each demo tab at phone and desktop widths in Chromium and WebKit.
process.env.PLAYWRIGHT_BROWSERS_PATH = process.env.PLAYWRIGHT_BROWSERS_PATH || '/tmp/vocalis-browsers';
const { chromium, webkit, devices } = require('/Users/somesh/.claude/skills/gstack/node_modules/playwright');
const base = process.argv[2] || 'http://127.0.0.1:4173';
const out = process.argv[3] || '/tmp/vocalis-audit/new';
const routes = ['/', '/product', '/workflows', '/security', '/about', '/pricing'];
const tabs = ['Answer', 'Understand', 'Act', 'Improve'];
(async () => {
  for (const engine of ['chromium', 'webkit']) {
    const b = await (engine === 'webkit' ? webkit.launch() : chromium.launch({ channel: 'chrome', headless: true }));
    for (const width of [390, 1440]) {
      const ctx = await b.newContext(engine === 'webkit' && width === 390 ? { ...devices['iPhone 13'] } : { viewport: { width, height: width < 500 ? 844 : 900 }, deviceScaleFactor: 1 });
      const p = await ctx.newPage();
      for (const r of routes) {
        await p.goto(base + r, { waitUntil: 'networkidle' });
        await p.evaluate(() => document.fonts.ready);
        await p.waitForTimeout(200);
        if (r === '/') { await p.locator('#definition').scrollIntoViewIfNeeded(); await p.waitForTimeout(100); await p.locator('footer').scrollIntoViewIfNeeded(); await p.waitForTimeout(500); await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); }
        await p.screenshot({ path: `${out}/${engine}-${width}-${r === '/' ? 'home' : r.slice(1)}.png`, fullPage: true });
      }
      await p.goto(base + '/', { waitUntil: 'networkidle' });
      for (const t of tabs) {
        await p.getByRole('tab', { name: t, exact: true }).click();
        await p.waitForTimeout(250);
        await p.locator('.stage').screenshot({ path: `${out}/${engine}-${width}-stage-${t.toLowerCase()}.png` });
      }
      await ctx.close();
    }
    await b.close();
  }
  console.log('done');
})().catch((e) => { console.error(e); process.exit(1); });
