import fs from 'fs';
import path from 'path';

// 读取图片映射
const imageMap = JSON.parse(fs.readFileSync('./image-map.json', 'utf8'));
const homePath = './src/pages/Home.tsx';

// 读取 Home.tsx 文件
let content = fs.readFileSync(homePath, 'utf8');

// 替换所有图片链接
for (const [oldUrl, newUrl] of Object.entries(imageMap)) {
    const escapedUrl = oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedUrl, 'g');
    content = content.replace(regex, newUrl);
}

// 写回文件
fs.writeFileSync(homePath, content);
console.log('Successfully updated image paths in Home.tsx');