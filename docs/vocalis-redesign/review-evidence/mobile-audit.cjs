// Mobile scaling audit: every route at six phone widths in Chromium and WebKit.
// Reports horizontal overflow, small tap targets, tiny text, small form fields and elements outside the screen.
// Needs the build served on :4173.
process.env.PLAYWRIGHT_BROWSERS_PATH = process.env.PLAYWRIGHT_BROWSERS_PATH || '/tmp/vocalis-browsers';
const { chromium, webkit, devices } = require('/Users/somesh/.claude/skills/gstack/node_modules/playwright');
const routes = ['/', '/product', '/workflows', '/pricing', '/security', '/about', '/nope'];
const widths = [320, 360, 375, 390, 414, 430];
const report = { problems: [], checked: 0 };
const audit = () => {
  const out = { overflow: document.documentElement.scrollWidth - innerWidth, small: [], tiny: [], field: [], outside: [] };
  const vis = (e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && !e.closest('[hidden],[inert],.sr-only,.skip-link'); };
  const name = (e) => (e.getAttribute('aria-label') || e.textContent || e.className || e.tagName).trim().replace(/\s+/g, ' ').slice(0, 40);
  document.querySelectorAll('a[href], button, summary, input, textarea, [role=tab], [role=radio]').forEach((e) => {
    if (!vis(e)) return;
    const r = e.getBoundingClientRect();
    const inline = e.tagName === 'A' && e.closest('p, li, dd, span, blockquote') && getComputedStyle(e).display === 'inline'; // WCAG 2.2: inline links are exempt
    if ((r.width < 44 || r.height < 44) && !inline && !e.classList.contains('bar') && e.getAttribute('role') !== 'radio') out.small.push(`${name(e)} ${Math.round(r.width)}x${Math.round(r.height)}`);
    if ((e.tagName === 'INPUT' || e.tagName === 'TEXTAREA') && parseFloat(getComputedStyle(e).fontSize) < 16) out.field.push(name(e));
  });
  document.querySelectorAll('p, li, span, a, button, h1, h2, h3, h4, dt, dd, label, summary, blockquote, figcaption, td, th').forEach((e) => {
    if (!vis(e) || e.closest('svg')) return;
    const hasText = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (hasText && parseFloat(getComputedStyle(e).fontSize) < 12) out.tiny.push(`${name(e)} ${getComputedStyle(e).fontSize}`);
  });
  document.querySelectorAll('body *').forEach((e) => {
    if (!vis(e) || e.closest('.hero__aura, .dashboard__scroll, .tabs__list, .voice-playground__stage, svg, #intro, .site-footer__legal')) return;
    const r = e.getBoundingClientRect();
    if (r.right > innerWidth + 1 || r.left < -1) out.outside.push(`${name(e)} ${Math.round(r.left)}..${Math.round(r.right)}`);
  });
  return out;
};
(async () => {
  for (const engine of ['chromium', 'webkit']) {
    const b = await (engine === 'webkit' ? webkit.launch() : chromium.launch({ channel: 'chrome', headless: true }));
    for (const w of widths) {
      const ctx = await b.newContext(engine === 'webkit' && w === 390 ? { ...devices['iPhone 13'] } : { viewport: { width: w, height: 800 }, isMobile: true, hasTouch: true });
      const p = await ctx.newPage();
      for (const r of routes) {
        await p.goto('http://127.0.0.1:4173' + r, { waitUntil: 'networkidle' });
        await p.evaluate(() => document.fonts.ready);
        if (r === '/') { await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(400); await p.evaluate(() => window.scrollTo(0, 0)); }
        const res = await p.evaluate(audit);
        report.checked += 1;
        const bad = { overflow: res.overflow > 0 ? res.overflow : 0, small: res.small, tiny: res.tiny, field: res.field, outside: res.outside };
        if (bad.overflow || bad.small.length || bad.tiny.length || bad.field.length || bad.outside.length) report.problems.push({ engine, width: w, route: r, ...bad });
      }
      await ctx.close();
    }
    await b.close();
  }
  require('fs').writeFileSync('/tmp/vocalis-audit/mobile-audit.json', JSON.stringify(report, null, 2));
  console.log('checked', report.checked, 'page and width combinations; with problems:', report.problems.length);
  const seen = new Map();
  report.problems.forEach((x) => ['small', 'tiny', 'field', 'outside'].forEach((k) => (x[k] || []).forEach((m) => { const key = `${k}: ${m.replace(/ \d+x\d+$/, '')}`; seen.set(key, (seen.get(key) || 0) + 1); })));
  report.problems.filter((x) => x.overflow).forEach((x) => console.log('OVERFLOW', x.engine, x.width, x.route, x.overflow));
  [...seen.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40).forEach(([k, n]) => console.log(String(n).padStart(3), k));
})();
