import fs from 'fs';
import path from 'path';

function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
}

const files = walkSync('d:/ERP/erp-frontend/erp-frontend/src');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // 1. Fix missing text-gray-800 and text-gray-700
  content = content.replace(/text-gray-800(?! dark:text-)/g, 'text-gray-800 dark:text-gray-200');
  content = content.replace(/text-gray-700(?! dark:text-)/g, 'text-gray-700 dark:text-gray-300');
  
  // Also fix any other missing text colors just in case
  content = content.replace(/text-slate-800(?! dark:text-)/g, 'text-slate-800 dark:text-slate-200');
  content = content.replace(/text-slate-700(?! dark:text-)/g, 'text-slate-700 dark:text-slate-300');

  // 2. Change all dark:bg-neutral-900 to dark:bg-black (pure black background for all cards/tables)
  content = content.replace(/dark:bg-neutral-900/g, 'dark:bg-black');
  
  // Change any remaining dark:bg-gray-900 or dark:bg-gray-950 to pure black just to be absolutely sure
  content = content.replace(/dark:bg-gray-900/g, 'dark:bg-black');
  content = content.replace(/dark:bg-gray-950/g, 'dark:bg-black');
  
  // Make sure table headers (which might be dark:bg-black/60) are fully black or just have a dark bottom border
  content = content.replace(/dark:bg-black\/60/g, 'dark:bg-black');
  content = content.replace(/dark:bg-black\/50/g, 'dark:bg-black');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', file);
  }
}
