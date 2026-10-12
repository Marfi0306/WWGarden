import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const code=await readFile(new URL('../src/assets/app.js',import.meta.url),'utf8');
function harness(photos=[],phone='797000000'){
 let submit,download=false,prevented=false;
 const status={textContent:''};
 const form={dataset:{mode:'draft'},elements:{photos:{files:photos}},addEventListener:(type,fn)=>{submit=fn;}};
 for(const k of ['name','phone','town','service','email','area','description','date'])form.elements[k]={value:k==='phone'?phone:'Test'};
 const context={document:{querySelector:s=>s==='#quote-form'?form:s==='#form-status'?status:null,addEventListener(){},createElement:()=>({click(){download=true},remove(){}}),body:{append(){}}},URL:{createObjectURL:()=> 'blob:local',revokeObjectURL(){}},Blob,setTimeout:fn=>fn()};
 vm.runInNewContext(code,context); submit({preventDefault(){prevented=true;}});return {status:status.textContent,download,prevented};
}
test('draft downloads locally and explicitly reports no transmission',()=>{const r=harness();assert.ok(r.download);assert.ok(r.prevented);assert.match(r.status,/Nie wysłano/);});
test('invalid phone and file limits prevent download',()=>{for(const r of [harness([], '---------'),harness(Array(6).fill({type:'image/jpeg',size:1})),harness([{type:'image/jpeg',size:11*1024*1024}]),harness([{type:'text/html',size:10}])]){assert.ok(r.prevented);assert.equal(r.download,false);}});
