const fs = require('fs');
const path = require('path');

const notesPath = path.resolve(__dirname, 'docs/notes');
const sidebarPath = path.resolve(__dirname, 'docs', '_sidebar.md');

function generateSidebar(dir, baseDir = notesPath, level = 0) {
  const items = fs.readdirSync(dir).filter(item => item !== '_sidebar.md');
  let sidebarContent = '';

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      sidebarContent += `${'  '.repeat(level)}- ${item}\n`;
      sidebarContent += generateSidebar(fullPath, baseDir, level + 1);
    } else if (stat.isFile() && item.endsWith('.md')) {
      const fileName = item.slice(0, -3);
      const relativePath = fullPath.replace(baseDir, '').replace(/\\/g, '/');
      sidebarContent += `${'  '.repeat(level + 1)}- [${fileName}](/notes${relativePath})\n`;
    }
  });

  return sidebarContent;
}

let sidebarContent = '- [首页](/)\n'; // 添加首页条目
sidebarContent += generateSidebar(notesPath);
fs.writeFileSync(sidebarPath, sidebarContent);

console.log('Sidebar generated successfully!');
