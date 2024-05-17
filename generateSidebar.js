const fs = require('fs');
const path = require('path');

const docsPath = path.resolve(__dirname, 'docs');
const sidebarPath = path.resolve(docsPath, '_sidebar.md');

function generateSidebar(dir, level = 0) {
  const items = fs.readdirSync(dir).filter(item => item !== '_sidebar.md');
  let sidebarContent = '';

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      sidebarContent += `${'  '.repeat(level)}- ${item}\n`;
      sidebarContent += generateSidebar(fullPath, level + 1);
    } else if (stat.isFile() && item.endsWith('.md')) {
      const fileName = item.slice(0, -3);
      sidebarContent += `${'  '.repeat(level + 1)}- [${fileName}](${fullPath.replace(docsPath, '').replace(/\\/g, '/')})\n`;
    }
  });

  return sidebarContent;
}

const sidebarContent = generateSidebar(docsPath);
fs.writeFileSync(sidebarPath, sidebarContent);

console.log('Sidebar generated successfully!')
