const {chromium}=require('/Users/somesh/.claude/skills/gstack/node_modules/playwright');
const fs=require('fs');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const reports=[];
 for(const width of [1440,390,375,320,768]){
 await page.setViewportSize({width,height:width<500?844:1000});
 for(const path of width===390||width===1440?['/','/product','/workflows','/about','/security','/pricing']:['/','/product']){
 await page.goto('http://localhost:4173'+path,{waitUntil:'networkidle'});
 const data=await page.evaluate(()=>({title:document.title,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.body.scrollHeight,h1:document.querySelector('h1')?.innerText,text:document.body.innerText,overflow:[...document.querySelectorAll('main *')].filter(e=>{const b=e.getBoundingClientRect();return b.width>0&&(b.right>innerWidth+1||b.left < -1)}).slice(0,15).map(e=>({tag:e.tagName,cls:e.className,text:e.innerText?.slice(0,40)})),resources:performance.getEntriesByType('resource').map(e=>({name:e.name,size:e.transferSize,duration:e.duration})),viewport:document.querySelector('meta[name=viewport]')?.content}));
 reports.push({width,path,...data});
 if(width===1440||width===390)await page.screenshot({path:'/tmp/vocalis-audit/before-'+width+'-'+(path.slice(1)||'home')+'.png',fullPage:true});
 }
 }
 fs.writeFileSync('/tmp/vocalis-audit/before.json',JSON.stringify({reports,errors},null,2));
 await page.setViewportSize({width:1440,height:1000});await page.goto('https://www.namuai-lab.com/',{waitUntil:'networkidle'});await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));await page.waitForTimeout(1000);await page.screenshot({path:'/tmp/vocalis-audit/namu-footer.png'});
 fs.writeFileSync('/tmp/vocalis-audit/namu-footer.json',JSON.stringify(await page.evaluate(()=>({text:document.body.innerText.slice(-1800),canvases:[...document.querySelectorAll('canvas')].map(e=>({html:e.outerHTML,parent:e.parentElement.outerHTML.slice(0,2500)})),scripts:[...document.scripts].map(s=>s.src).filter(Boolean)})),null,2));
 console.log('Audit complete',errors, reports.map(r=>({width:r.width,path:r.path,overflow:r.scrollWidth>r.width,height:r.height})));
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
