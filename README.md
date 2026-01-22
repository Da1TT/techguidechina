# Tour & Business in China - 中国旅游商务服务平台

这是一个为国际游客提供中国境内专业地接服务的网站平台，专注于提供旅游向导、展会支持和定制化旅行解决方案。

## 技术栈

- React 18+
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion（动画效果）
- Sonner（通知提示）

## 功能亮点

- 响应式设计，适配各种设备屏幕
- 中英文双语支持
- 现代化UI设计，包含动画和过渡效果
- 完整的旅游和展会服务展示
- 咨询聊天功能
- 联系表单

## 快速开始

### 本地开发

1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm run dev
```

3. 构建生产版本
```bash
npm run build
```

4. 预览生产版本
```bash
npm run preview
```

## 使用Cloudflare Pages部署指南

以下是使用Cloudflare Pages部署此项目的详细步骤：

### 1. 准备工作

- 确保您的代码已推送到GitHub仓库
- 确保项目根目录包含以下配置文件（本项目已包含）：
  - `_headers` - Cloudflare Pages的HTTP头配置
  - `_redirects` - Cloudflare Pages的重定向配置
  - `wrangler.toml` - Cloudflare配置文件

### 2. 创建Cloudflare账号

如果您还没有Cloudflare账号，请按照以下步骤创建：
1. 访问 [Cloudflare官网](https://www.cloudflare.com/)
2. 点击右上角的"注册"按钮
3. 填写邮箱、密码，完成注册
4. 验证您的邮箱地址

### 3. 创建Cloudflare Pages项目

1. 登录到 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 在侧边栏中选择"Pages"
3. 点击"创建项目"按钮
4. 选择"连接到Git"选项

### 4. 连接GitHub仓库

1. 选择"GitHub"作为您的代码托管平台
2. 如果是第一次连接，您需要授权Cloudflare访问您的GitHub账户
3. 在仓库列表中找到并选择您的项目仓库
4. 点击"开始设置"按钮

### 5. 配置构建设置

在项目设置页面，配置以下选项：

- **项目名称**: 输入您的项目名称（如：tour-business-in-china）
- **生产分支**: 选择您要部署的分支（通常是`main`或`master`）
- **构建命令**: `npm install && npm run build`
- **构建输出目录**: `dist`
- **根目录**: 保持为空（默认为项目根目录）

点击"保存并部署"按钮开始部署过程。

### 6. 部署过程

Cloudflare Pages将开始以下过程：
1. 克隆您的代码仓库
2. 安装依赖
3. 执行构建命令
4. 部署构建产物到Cloudflare的全球网络

您可以在部署页面查看实时日志和进度。

### 7. 访问已部署的网站

部署完成后，您可以：
1. 在Cloudflare Pages项目页面找到您的网站URL（通常格式为`[项目名].[用户名].pages.dev`）
2. 点击URL直接访问您的网站
3. 分享此URL给其他人访问

### 8. 配置自定义域名（可选）

如果您想使用自己的域名访问网站：

1. 在Cloudflare Pages项目页面，点击"自定义域"选项卡
2. 点击"设置自定义域"按钮
3. 输入您的域名（如：`www.yourdomain.com`）
4. 按照提示完成DNS配置
5. 等待DNS记录生效和HTTPS证书签发（通常需要几分钟到几小时）

### 9. 配置环境变量（如果需要）

如果您的项目需要环境变量：

1. 在Cloudflare Pages项目页面，点击"设置"选项卡
2. 选择"环境变量"
3. 点击"添加变量"按钮
4. 输入变量名称和值
5. 选择环境（生产、预览或两者）
6. 点击"保存"按钮

### 10. 配置部署预览（可选）

Cloudflare Pages可以为您的每个Pull Request自动创建预览部署：

1. 在Cloudflare Pages项目页面，点击"设置"选项卡
2. 选择"构建与部署"
3. 确保"自动部署预览"选项已启用
4. 现在，每当您创建新的Pull Request时，Cloudflare将自动创建一个预览URL

## 注意事项

- 确保您的`vite.config.ts`配置正确，特别是`base`选项
- 本项目使用客户端路由，确保`_redirects`文件包含SPA重定向规则
- 如果遇到部署问题，请检查构建日志以获取详细错误信息
- 对于大型项目，可能需要调整构建超时设置

## 故障排除

### 常见问题解决方法

1. **构建失败**：
   - 检查依赖安装是否成功
   - 确认构建命令是否正确
   - 查看详细日志以定位具体错误

2. **页面刷新404错误**：
   - 确保`_redirects`文件包含`/* /index.html 200`规则
   - 此规则确保所有路径都重定向到index.html，支持SPA路由

3. **静态资源加载失败**：
   - 检查资源路径是否正确
   - 确保`vite.config.ts`中的`base`配置正确

4. **自定义域名配置问题**：
   - 验证DNS记录是否正确配置
   - 确认域名是否已在Cloudflare上激活
   - 等待足够时间让DNS记录传播和证书签发

## License

MIT