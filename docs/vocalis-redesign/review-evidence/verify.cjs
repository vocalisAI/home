process.env.PLAYWRIGHT_BROWSERS_PATH='/tmp/vocalis-browsers';
const {chromium,webkit,devices}=require('/Users/somesh/.claude/skills/gstack/node_modules/playwright');
const fs=require('fs'),assert=require('assert');
(async()=>{const report={checks:[],pages:[],errors:[]};for(const engine of ['chromium','webkit']){
 const b=await (engine==='webkit'?webkit.launch():chromium.launch({channel:'chrome',headless:true}));
 try{
 const context=await b.newContext(engine==='webkit'?{...devices['iPhone 13']}:{viewport:{width:390,height:844},hasTouch:true,isMobile:true});
 const p=await context.newPage();p.on('pageerror',e=>report.errors.push({engine,error:e.message}));
 for(const width of [320,375,390,430,768,1440]){
 await p.setViewportSize({width,height:width<500?844:1000});
 for(const route of (width===390||width===1440?['/','/product','/workflows','/security','/about','/pricing']:['/','/product'])){
 const response=await p.goto('http://127.0.0.1:4174'+route,{waitUntil:'networkidle'});assert.equal(response.status(),200);
 const data=await p.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,width:innerWidth,h1s:document.querySelectorAll('h1').length,height:document.body.scrollHeight}));
 assert(data.scrollWidth<=width+1,`${engine} overflow ${width} ${route}`);assert.equal(data.h1s,1);report.pages.push({engine,width,route,...data});
 }
 }
 await p.setViewportSize({width:390,height:844});await p.goto('http://127.0.0.1:4174/',{waitUntil:'networkidle'});
 assert.equal(await p.locator('video').count(),0);report.checks.push(engine+': no initial video element');
 const menu=p.getByRole('button',{name:'Menu',exact:true});await menu.click();await p.getByRole('navigation',{name:'Mobile'}).getByRole('button',{name:'Product',exact:true}).click();
 assert(await p.locator('main').evaluate(e=>e.inert));assert((await p.locator('header').boundingBox()).height<100);await p.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');assert(await menu.evaluate(e=>document.activeElement===e));assert(!(await p.locator('main').evaluate(e=>e.inert)));report.checks.push(engine+': mobile overlay, Escape, focus, inert cleanup');
 const play=p.getByRole('button',{name:'Play walkthrough',exact:true});await play.scrollIntoViewIfNeeded();const height=await p.locator('.showcase__demo').evaluate(e=>e.offsetHeight);await play.click();const after=await p.locator('.showcase__demo').evaluate(e=>e.offsetHeight);assert(Math.abs(after-height)<=1,`${engine} playback height: ${height} -> ${after}`);await p.emulateMedia({reducedMotion:'reduce'});await p.waitForTimeout(100);assert.equal(await p.locator('.bubble--pending').count(),0);assert.equal(await p.getByRole('button',{name:'Pause',exact:true}).count(),0);report.checks.push(engine+`: playback height stable ${height}px; reduced motion restores all lines`);
 await p.goto('http://127.0.0.1:4174/about#%E0%A4%A');assert(await p.locator('h1').innerText());report.checks.push(engine+': malformed fragment renders');
 await p.goto('http://127.0.0.1:4174/product?feature=call-intelligence');await p.getByRole('tab',{name:'Clinic insights',exact:true}).click();await p.goBack();assert.equal(await p.getByRole('tab',{name:'Call intelligence',exact:true}).getAttribute('aria-selected'),'true');report.checks.push(engine+': product Back restores tab');
 await p.goto('http://127.0.0.1:4174/');await p.locator('.playground-reserve').scrollIntoViewIfNeeded();await p.locator('.voice-piece').first().waitFor();
 const piece=p.getByRole('button',{name:'Move Voice piece',exact:true});const before=await piece.evaluate(e=>e.style.transform);await piece.click();const tapped=await piece.evaluate(e=>e.style.transform);assert.notEqual(before,tapped);await piece.focus();await p.keyboard.press('ArrowRight');const keyed=await piece.evaluate(e=>e.style.transform);assert.notEqual(tapped,keyed);
 const box=await piece.boundingBox();await p.mouse.move(box.x+box.width/2,box.y+box.height/2);await p.mouse.down();await p.mouse.move(box.x+box.width/2+40,box.y+box.height/2+45,{steps:5});await p.mouse.up();assert.notEqual(keyed,await piece.evaluate(e=>e.style.transform));await p.getByRole('button',{name:'Reset pieces',exact:true}).click();
 const inside=await p.locator('.voice-piece').evaluateAll(es=>es.every(e=>{const a=e.getBoundingClientRect(),b=e.parentElement.getBoundingClientRect();return a.left>=b.left&&a.top>=b.top&&a.right<=b.right+1&&a.bottom<=b.bottom+1}));assert(inside);report.checks.push(engine+': playground tap, keyboard, drag, reset, bounds');
 await p.screenshot({path:`/tmp/vocalis-audit/after-${engine}-playground.png`});
 await p.goto('http://127.0.0.1:4174/');await p.getByRole('button',{name:/Watch the 36-second overview/}).click();assert.equal(await p.getByRole('dialog').count(),1);await p.keyboard.press('Escape');assert.equal(await p.getByRole('dialog').count(),0);assert.equal(await p.locator('video').count(),0);report.checks.push(engine+': video opens, closes and unmounts');
 // Fake transport only; no message leaves this test.
 await p.route('https://formspree.io/**',route=>route.fulfill({status:500,body:'{}',contentType:'application/json'}));
 await p.getByLabel('Your name',{exact:true}).fill('Test Reviewer');await p.getByLabel('Clinic',{exact:true}).fill('Example Clinic');await p.getByLabel('Work email',{exact:true}).fill('review@example.com');await p.getByRole('button',{name:'Request a demo',exact:true}).click();await p.getByRole('alert').waitFor();assert.equal(await p.getByLabel('Your name',{exact:true}).inputValue(),'Test Reviewer');report.checks.push(engine+': mocked form failure retains values');
 await p.unroute('https://formspree.io/**');await p.route('https://formspree.io/**',route=>route.fulfill({status:200,body:'{}',contentType:'application/json'}));await p.getByRole('button',{name:'Request a demo',exact:true}).click();await p.getByText('Thank you. Your request is in.').waitFor();report.checks.push(engine+': mocked form success');
 for(const width of [390,1440]){await p.setViewportSize({width,height:1000});await p.goto('http://127.0.0.1:4174/',{waitUntil:'networkidle'});await p.locator('#definition').scrollIntoViewIfNeeded();await p.waitForTimeout(150);await p.locator('footer').scrollIntoViewIfNeeded();await p.waitForTimeout(200);await p.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await p.screenshot({path:`/tmp/vocalis-audit/after-${engine}-${width}-home.png`,fullPage:true});}
 }finally{await b.close()}
}
fs.writeFileSync('/tmp/vocalis-audit/verified.json',JSON.stringify(report,null,2));console.log(JSON.stringify({pageChecks:report.pages.length,checks:report.checks,errors:report.errors},null,2));assert.equal(report.errors.length,0);
})().catch(e=>{console.error(e);process.exit(1)});
