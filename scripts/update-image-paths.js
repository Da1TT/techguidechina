const fs = require('fs');
const path = require('path');

// 读取图片映射
const imageMap = JSON.parse(fs.readFileSync('./image-map.json', 'utf8'));
const homePath = './src/pages/Home.tsx';

// 读取 Home.tsx 文件
let content = fs.readFileSync(homePath, 'utf8');

// 替换所有图片链接
Object.entries(imageMap).forEach(([oldUrl, newUrl]) => {
    const escapedUrl = oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedUrl, 'g');
    content = content.replace(regex, newUrl);
});

// 写回文件
fs.writeFileSync(homePath, content, 'utf8');
console.log('Updated image paths in Home.tsx');