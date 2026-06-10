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

const files = walkSync('d:/ERP/erp-frontend/erp-frontend/src/features');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Add min="0" to any input that has type="number" if it doesn't already have min=
  content = content.replace(/<input([^>]*?)type="number"([^>]*?)>/g, (match, p1, p2) => {
    if (!match.includes('min=')) {
      return `<input${p1}type="number" min="0"${p2}>`;
    }
    return match;
  });

  // Also catch <input type="number" ... /> where type="number" is first
  content = content.replace(/<input([^>]*?)type={'number'}([^>]*?)>/g, (match, p1, p2) => {
    if (!match.includes('min=')) {
      return `<input${p1}type={'number'} min="0"${p2}>`;
    }
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', file);
  }
}
