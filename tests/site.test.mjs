import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync,spawnSync} from 'node:child_process';
import {readFile,readdir,access} from 'node:fs/promises';
import path from 'node:path';
execFileSync(process.execPath,['scripts/build.mjs']);
async function files(dir){return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?files(path.join(dir,e.name)):path.join(dir,e.name)))).flat()}
const htmls=(await files('dist')).filter(p=>p.endsWith('.html'));
test('all 12 pages have Polish metadata, accessibility landmarks and unique titles',async()=>{
 assert.equal(htmls.length,13);const titles=[];
 for(const f of htmls){const html=await readFile(f,'utf8');assert.match(html,/lang="pl"/);titles.push(html.match(/<title>(.*?)<\/title>/)[1]);if(!f.endsWith('404.html')){assert.match(html,/name="description"/);assert.match(html,/id="main"/);assert.match(html,/noindex,nofollow/);assert.match(html,/Przejdź do treści/);}}
 assert.equal(new Set(titles).size,titles.length);
});
test('all internal links and local assets resolve',async()=>{
 for(const f of htmls){const html=await readFile(f,'utf8');for(const match of html.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)){let target=path.join('dist',match[1]);if(!path.extname(target))target=path.join(target,'index.html');await access(target);}}
});
test('preview cannot claim submission or publish unconfirmed contacts and prices',async()=>{
 const home=await readFile('dist/index.html','utf8');assert.match(home,/data-mode="draft"/);assert.doesNotMatch(home,/<form[^>]+action=/);assert.doesNotMatch(home,/tel:|mailto:|zł|797.?098|5291846625/);assert.match(home,/SCHEMAT POGLĄDOWY/);
 const robots=await readFile('dist/robots.txt','utf8');assert.match(robots,/Disallow: \//);
});
test('production build fails closed until required data is approved',()=>{
 const run=spawnSync(process.execPath,['scripts/build.mjs','--production'],{encoding:'utf8'});assert.notEqual(run.status,0);assert.match(run.stderr,/Publikacja zablokowana/);
});
