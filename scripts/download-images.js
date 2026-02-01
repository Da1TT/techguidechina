#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 图片URL列表（从Home.tsx和其他文件中提取）
const imageUrls = [
  'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Beijing%20tech%20exhibition%20with%20AI%20robots%20modern%20technology%20and%20Beijing%20skyline%20background%20Forbidden%20City%20elements&sign=3f86a5d72ed00ee1442e87241cf5700e',
  'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Smart%20City%20Technology%20Exhibition%2C%20Beijing&sign=6856f58a6c5e477f9ad6dd8029d26b01',
  'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Digital%20Economy%20Exhibition%2C%20Guangzhou&sign=b493ac3474664c38ecb5e03975ff43da',
  'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=AI%20and%20Robotics%20Exhibition%2C%20Shanghai&sign=a71fcf6672da119c8eb27d1811b7918f',
  'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Cybersecurity%20Exhibition%2C%20China&sign=702ace6937a6f24bf35c90a1202d0f2e',
  'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Big%20Data%20and%20Cloud%20Computing%20Exhibition%2C%20China&sign=8d1ba33572ab44314f87eca5e2b8b49c',
  'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Software%20and%20information%20service%20exhibition%2C%20China&sign=c30039d78b5815b5ec9ac16c96a08416',
  'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Beijing%20Forbidden%20City%20and%20Tiananmen%20Square%2C%20historical%20cultural%20tour&sign=bbe233da432647ad12b50b290fac7703',
  'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Beijing%20CBD%20skyline%2C%20modern%20architecture%2C%20China&sign=1d304d8218d67b5a2eff3eb90b5a92dc',
  'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Summer%20Palace%20Beijing%2C%20royal%20garden%2C%20traditional%20Chinese%20architecture&sign=2317565ecaebef9aaca36e84ba711e74',
  'https://lf-code-agent.coze.cn/obj/x-ai-cn/355308353282/attachment/张博文_20260125162507.jpg',
  'https://lf-code-agent.coze.cn/obj/x-ai-cn/355308353282/attachment/关玥_20260125162507.JPG',
  'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Caucasian%20male%20businessman%2C%20professional&sign=df30afd45389a9d7aa0008231403838f',
  'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=European%20female%20businesswoman%2C%20happy&sign=9eac670ea122624cc05b31d2e1b99aac',
  'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Asian%20male%20businessman%2C%20professional&sign=5f8b153d75b3c985e35176285361cb8d'
];

const publicDir = path.join(__dirname, '../public');
const imagesDir = path.join(publicDir, 'images');

// 创建目录
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

console.log('Downloading images...');

async function downloadImage(url, filename) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const buffer = await response.arrayBuffer();
    const filePath = path.join(imagesDir, filename);
    fs.writeFileSync(filePath, Buffer.from(buffer));
    console.log(`Downloaded: ${filename}`);
    return `/images/${filename}`;
  } catch (error) {
    console.error(`Failed to download ${url}:`, error.message);
    // 返回一个占位符图片路径
    return '/images/placeholder.jpg';
  }
}

async function main() {
  const imageMap = {};
  
  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    const filename = `image-${i + 1}${path.extname(new URL(url).pathname) || '.jpg'}`;
    const localPath = await downloadImage(url, filename);
    imageMap[url] = localPath;
  }
  
  // 保存映射关系
  fs.writeFileSync(
    path.join(__dirname, 'image-map.json'),
    JSON.stringify(imageMap, null, 2)
  );
  
  console.log('Image download complete!');
  console.log('Image mapping saved to image-map.json');
}

main().catch(console.error);