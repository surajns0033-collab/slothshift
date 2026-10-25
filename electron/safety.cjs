const path=require('node:path');
const crypto=require('node:crypto');
function sanitizeFilename(s){
  const p=path.parse(String(s||'untitled'));
  const stem=p.name.replace(/[<>:"|?*\x00-\x1f]/g,'-').replaceAll('/','-').replaceAll('\\','-').replace(/[. ]+$/g,'').trim().slice(0,90)||'untitled';
  return stem+p.ext.replace(/[^.\w-]/g,'').slice(0,10);
}
function isWithin(root,file){
  const rel=path.relative(path.resolve(root),path.resolve(file));
  return !!rel&&rel!=='..'&&!rel.startsWith('..'+path.sep)&&!path.isAbsolute(rel);
}
function hash(b){return crypto.createHash('sha256').update(b).digest('hex')}
function icsDate(v){
  const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(v||''));if(!m)return null;
  const d=new Date(Date.UTC(+m[1],+m[2]-1,+m[3]));
  return d.getUTCFullYear()===+m[1]&&d.getUTCMonth()+1===+m[2]&&d.getUTCDate()===+m[3]?m.slice(1).join(''):null;
}
function icsEscape(s){return String(s||'').replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\r?\n/g,'\\n')}
module.exports={sanitizeFilename,isWithin,hash,icsDate,icsEscape};
