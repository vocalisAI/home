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
 const response=await p.goto('http://127.0.0.1:4173'+route,{waitUntil:'networkidle'});assert([200,304].includes(response.status()));
 const data=await p.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,width:innerWidth,h1s:document.querySelectorAll('h1').length,height:document.body.scrollHeight}));
 assert(data.scrollWidth<=width+1,`${engine} overflow ${width} ${route}`);assert.equal(data.h1s,1);report.pages.push({engine,width,route,...data});
 }
 }
 await p.setViewportSize({width:390,height:844});await p.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
 assert.equal(await p.locator('video').count(),0);report.checks.push(engine+': no initial video element');
 const menu=p.getByRole('button',{name:'Menu',exact:true});await menu.click();await p.getByRole('navigation',{name:'Mobile'}).getByRole('button',{name:'Product',exact:true}).click();
 assert(await p.locator('main').evaluate(e=>e.inert));assert((await p.locator('header').boundingBox()).height<100);await p.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');assert(await menu.evaluate(e=>document.activeElement===e));assert(!(await p.locator('main').evaluate(e=>e.inert)));report.checks.push(engine+': mobile overlay, Escape, focus, inert cleanup');
 const play=p.getByRole('button',{name:'Play walkthrough',exact:true});await play.scrollIntoViewIfNeeded();const height=await p.locator('.showcase__demo').evaluate(e=>e.offsetHeight);await play.click();const after=await p.locator('.showcase__demo').evaluate(e=>e.offsetHeight);assert(Math.abs(after-height)<=1,`${engine} playback height: ${height} -> ${after}`);await p.emulateMedia({reducedMotion:'reduce'});await p.waitForTimeout(100);assert.equal(await p.locator('.bubble--pending').count(),0);assert.equal(await p.getByRole('button',{name:'Pause',exact:true}).count(),0);report.checks.push(engine+`: playback height stable ${height}px; reduced motion restores all lines`);
 await p.goto('http://127.0.0.1:4173/about#%E0%A4%A');assert(await p.locator('h1').innerText());report.checks.push(engine+': malformed fragment renders');
 await p.goto('http://127.0.0.1:4173/product?feature=call-intelligence');await p.getByRole('tab',{name:'Clinic Insights',exact:true}).click();await p.goBack();assert.equal(await p.getByRole('tab',{name:'Call Intelligence',exact:true}).getAttribute('aria-selected'),'true');report.checks.push(engine+': product Back restores tab');
 await p.emulateMedia({reducedMotion:'no-preference'});await p.goto('http://127.0.0.1:4173/');await p.locator('.playground-reserve').scrollIntoViewIfNeeded();await p.locator('.voice-piece').first().waitFor();const showStage=()=>p.evaluate(()=>document.querySelector('.voice-playground__stage').scrollIntoView({block:'end'}));await showStage();
 const settle=async()=>{await p.waitForFunction(()=>document.querySelector('.voice-playground__stage')?.dataset.state==='settled',null,{timeout:15000})};
 const centresInside=()=>p.locator('.voice-piece').evaluateAll(es=>{const s=es[0].parentElement.getBoundingClientRect();return es.every(e=>{const r=e.getBoundingClientRect();const cx=(r.left+r.right)/2,cy=(r.top+r.bottom)/2;return cx>=s.left-1&&cx<=s.right+1&&cy>=s.top-1&&cy<=s.bottom+1})});
 const topLabel=()=>p.locator('.voice-piece').evaluateAll(es=>{for(const e of es){const r=e.getBoundingClientRect();const t=document.elementFromPoint((r.left+r.right)/2,(r.top+r.bottom)/2);if(t===e||e.contains(t))return e.getAttribute('aria-label')}return null});
 await settle();await showStage();assert.equal(await p.locator('.voice-piece').count(),20);assert(await centresInside(),engine+' pieces rest inside the stage after falling');
 // They fell: the lowest piece sits near the floor, over the wordmark, not still parked above the stage.
 const rested=await p.locator('.voice-piece').evaluateAll(es=>{const s=es[0].parentElement.getBoundingClientRect();return Math.max(...es.map(e=>e.getBoundingClientRect().bottom))>s.bottom-40});assert(rested,engine+' pieces reached the floor');
 let label=await topLabel();assert(label,'a piece is on top');let piece=p.getByRole('button',{name:label,exact:true});
 const t0=await piece.evaluate(e=>e.style.transform);await piece.click();await p.waitForTimeout(300);const t1=await piece.evaluate(e=>e.style.transform);assert.notEqual(t0,t1,engine+' tap moves a piece');
 await settle();await piece.focus();await p.keyboard.press('ArrowRight');await p.waitForTimeout(300);const t2=await piece.evaluate(e=>e.style.transform);assert.notEqual(t1,t2,engine+' arrow key moves a piece');
 await settle();label=await topLabel();piece=p.getByRole('button',{name:label,exact:true});const before=await piece.evaluate(e=>e.style.transform);
 const box=await piece.boundingBox();await p.mouse.move(box.x+box.width/2,box.y+box.height/2);await p.mouse.down();await p.mouse.move(box.x+box.width/2+50,box.y+box.height/2-60,{steps:6});await p.mouse.up();await p.waitForTimeout(300);assert.notEqual(before,await piece.evaluate(e=>e.style.transform),engine+' drag moves a piece');
 await settle();assert(await centresInside(),engine+' pieces stay inside after being thrown');
 await showStage();await p.locator('.voice-piece').first().focus();await p.keyboard.press('Home');await p.waitForTimeout(200);assert.equal(await p.locator('.voice-playground__stage').getAttribute('data-state'),'falling');await settle();assert(await centresInside(),engine+' reset drops them back in');
 report.checks.push(engine+': playground falls and settles, tap, keyboard, drag, reset, bounds');
 await p.emulateMedia({reducedMotion:'reduce'});await p.reload({waitUntil:'networkidle'});await p.locator('.playground-reserve').scrollIntoViewIfNeeded();await settle();assert(await centresInside(),engine+' reduced motion: pieces rest in the stage');
 const rt0=await p.getByRole('button',{name:'Move voice piece',exact:true}).evaluate(e=>e.style.transform);await p.getByRole('button',{name:'Move voice piece',exact:true}).focus();await p.keyboard.press('ArrowLeft');assert.notEqual(rt0,await p.getByRole('button',{name:'Move voice piece',exact:true}).evaluate(e=>e.style.transform),engine+' reduced motion: keyboard still moves a piece');
 report.checks.push(engine+': playground with Reduce Motion rests statically and still moves by keyboard');await p.emulateMedia({reducedMotion:'no-preference'});
 
 await p.goto('http://127.0.0.1:4173/');await p.getByRole('button',{name:/See it live/}).first().click();assert.equal(await p.getByRole('dialog').count(),1);const dlg=await p.getByRole('dialog').boundingBox();const vp=p.viewportSize();assert(dlg.width>=vp.width-1&&dlg.height>=vp.height-1,engine+' See it live fills the whole screen');await p.waitForFunction(()=>{const v=document.querySelector('.theater video');return v&&!v.paused&&v.currentTime>0.2},null,{timeout:10000});await p.keyboard.press('Escape');assert.equal(await p.getByRole('dialog').count(),0);assert.equal(await p.locator('video').count(),0);report.checks.push(engine+': See it live fills the screen, plays at once, closes and unmounts');
 // Fake transport only; no message leaves this test.
 await p.route('https://formspree.io/**',route=>route.fulfill({status:500,body:'{}',contentType:'application/json'}));
 await p.getByLabel('Your name',{exact:true}).fill('Test Reviewer');await p.getByLabel('Clinic',{exact:true}).fill('Example Clinic');await p.getByLabel('Work email',{exact:true}).fill('review@example.com');await p.getByRole('button',{name:'Request a demo',exact:true}).click();await p.getByRole('alert').waitFor();assert.equal(await p.getByLabel('Your name',{exact:true}).inputValue(),'Test Reviewer');report.checks.push(engine+': mocked form failure retains values');
 await p.unroute('https://formspree.io/**');await p.route('https://formspree.io/**',route=>route.fulfill({status:200,body:'{}',contentType:'application/json'}));await p.getByRole('button',{name:'Request a demo',exact:true}).click();await p.getByText('Thank you. Your request is in.').waitFor();report.checks.push(engine+': mocked form success');
 for(const width of [390,1440]){await p.setViewportSize({width,height:1000});await p.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});await p.locator('#definition').scrollIntoViewIfNeeded();await p.waitForTimeout(150);await p.locator('footer').scrollIntoViewIfNeeded();await p.waitForTimeout(200);await p.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await p.screenshot({path:`/tmp/vocalis-audit/after-${engine}-${width}-home.png`,fullPage:true});}
 }finally{await b.close()}
}
fs.writeFileSync('/tmp/vocalis-audit/verified.json',JSON.stringify(report,null,2));console.log(JSON.stringify({pageChecks:report.pages.length,checks:report.checks,errors:report.errors},null,2));assert.equal(report.errors.length,0);
})().catch(e=>{console.error(e);process.exit(1)});
