const fs = require('fs');
const path = require('path');

const notesPath = path.resolve(__dirname, 'docs/notes');
const sidebarPath = path.resolve(__dirname, 'docs', '_navbar.md');

function generateSidebar(dir, baseDir = notesPath, level = 0) {
  const items = fs.readdirSync(dir).filter(item => item !== '_navbar.md');
  let sidebarContent = '';
  let directories = [];
  let files = [];

  // Separate directories and files
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      directories.push(item);
    } else if (stat.isFile() && item.endsWith('.md')) {
      files.push(item);
    }
  });

  // Process directories first
  directories.forEach(dirName => {
    const fullPath = path.join(dir, dirName);
    sidebarContent += `${'  '.repeat(level)}- ${dirName}\n`;
    sidebarContent += generateSidebar(fullPath, baseDir, level + 1);
  });

  // Process files next
  files.forEach(fileName => {
    const fileBaseName = fileName.slice(0, -3);
    const relativePath = path.relative(baseDir, path.join(dir, fileName)).replace(/\\/g, '/');
    sidebarContent += `${'  '.repeat(level)}- [${fileBaseName}](/notes/${relativePath})\n`;
  });

  return sidebarContent;
}

let sidebarContent = '- [首页](/)\n'; // 添加首页条目
sidebarContent += generateSidebar(notesPath);
fs.writeFileSync(sidebarPath, sidebarContent);

console.log('Sidebar generated successfully!');
