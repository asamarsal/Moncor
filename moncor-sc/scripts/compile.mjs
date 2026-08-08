import fs from 'node:fs'; import path from 'node:path'; import solc from 'solc';
const root=process.cwd(),sources={};
function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())walk(p);else if(e.name.endsWith('.sol'))sources[path.relative(root,p).replaceAll('\\','/')]={content:fs.readFileSync(p,'utf8')};}}
for(const dir of ['src','script','test']){const p=path.join(root,dir);if(fs.existsSync(p))walk(p);}
const input={language:'Solidity',sources,settings:{optimizer:{enabled:true,runs:200},viaIR:true,evmVersion:'cancun',outputSelection:{'*':{'*':['abi','evm.bytecode.object']}}}};
function imports(i){const p=i.startsWith('@openzeppelin/')?path.join(root,'node_modules',i):path.join(root,i);try{return{contents:fs.readFileSync(p,'utf8')}}catch{return{error:`Import not found: ${i}`}}}
const output=JSON.parse(solc.compile(JSON.stringify(input),{import:imports}));for(const e of output.errors??[])console[e.severity==='error'?'error':'warn'](e.formattedMessage);if((output.errors??[]).some(e=>e.severity==='error'))process.exit(1);
fs.mkdirSync(path.join(root,'artifacts'),{recursive:true});fs.writeFileSync(path.join(root,'artifacts','solc-output.json'),JSON.stringify(output,null,2));console.log(`Compiled ${Object.keys(sources).length} source files with solc ${solc.version()}`);
