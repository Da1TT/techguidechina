# Cloudflare 访问计数器设置指南

本指南将帮助你使用 Cloudflare Workers 和 KV 存储实现网站访问计数功能。

## 📋 前提条件

- Cloudflare 账号（免费计划即可）
- 已部署到 Cloudflare Pages 的网站
- GitHub 仓库权限

## 🚀 设置步骤

### 第一步：创建 KV Namespace

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 在左侧菜单中选择 **"Workers & Pages"**
3. 点击 **"KV"** 标签
4. 点击 **"Create a namespace"**
5. 输入 namespace 名称，例如：`techguidechina-visitors`
6. 点击 **"Add"**

创建后，你会看到 KV Namespace ID（类似 `abc123def456`）。**记住这个ID，后面需要用到。**

### 第二步：配置 Worker

1. 打开项目根目录下的 `wrangler-worker.toml` 文件
2. 将你的 KV Namespace ID 填入到 `id` 字段中：

```toml
name = "techguidechina-worker"
main = "worker.js"
compatibility_date = "2024-04-15"

[[kv_namespaces]]
binding = "VISITORS"
id = "your-namespace-id-here"  # 👈 替换为你的 KV Namespace ID
preview_id = ""
```

### 第三步：部署 Worker

有两种方式部署 Worker：

#### 方式 A：通过 Cloudflare Dashboard（推荐）

1. 在 Cloudflare Dashboard 中，点击 **"Workers & Pages"**
2. 点击 **"Create Application"**
3. 选择 **"Create Worker"**
4. 输入 Worker 名称：`techguidechina-worker`
5. 点击 **"Deploy"**
6. 部署成功后，点击 **"Quick Edit"** 或上传你的 `worker.js` 文件
7. 在 Worker 设置中绑定 KV namespace：
   - 进入 Worker 设置页面
   - 找到 **"Bindings"** 部分
   - 添加 KV Namespace binding：
     - Variable name: `VISITORS`
     - KV Namespace: 选择你创建的 namespace

#### 方式 B：通过 Wrangler CLI（需要安装）

1. 安装 Wrangler：
```bash
npm install -g wrangler
```

2. 登录 Cloudflare：
```bash
wrangler login
```

3. 部署 Worker：
```bash
wrangler deploy --config wrangler-worker.toml
```

### 第四步：绑定 Worker 到网站

1. 在 Cloudflare Dashboard 中，进入你的 Pages 项目
2. 点击 **"Settings"** 标签
3. 找到 **"Functions"** 部分
4. 点击 **"Create function"**
5. 选择 **"Attach Worker"** 或 **"Bind to Worker"**
6. 选择或输入你的 Worker 名称：`techguidechina-worker`
7. 保存设置

### 第五步：更新网站代码

代码已经更新完成，包含以下文件：

1. **VisitorCounter.tsx** - 访问计数器组件
2. **worker.js** - Cloudflare Worker 脚本
3. **wrangler-worker.toml** - Worker 配置文件
4. **Home.tsx** - 已更新，包含计数器组件

### 第六步：部署更新

1. 提交代码到 GitHub：
```bash
git add .
git commit -m "添加网站访问计数器功能"
git push origin main
```

2. Cloudflare Pages 会自动部署更新

## ✅ 验证功能

部署完成后，访问你的网站首页，你应该能看到：

- 在首页 Hero 区域下方显示一个访问计数器卡片
- 每次刷新页面，计数器数字会增加
- 计数器有漂亮的动画效果和红色主题

## 🎨 自定义样式

如果你想修改计数器的外观，编辑 `src/components/VisitorCounter.tsx`：

```tsx
// 修改颜色、尺寸、动画效果等
<div className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg">
  {/* 你的自定义样式 */}
</div>
```

## 📊 数据持久性

Cloudflare KV 存储的数据是持久的，除非：

- 手动删除 namespace
- KV 数据过期（可以通过设置 TTL）
- 超出免费配额限制

免费计划 KV 配额：
- 100,000 次读取/天
- 1,000 次写入/天
- 1GB 存储

对于个人网站来说，这些配额完全够用。

## 🔍 故障排除

### 计数器不显示数字

**可能原因：**
- Worker 未正确绑定到网站
- KV namespace 未正确配置
- Worker 脚本有错误

**解决方案：**
1. 检查浏览器控制台是否有错误
2. 在 Cloudflare Dashboard 中检查 Worker 日志
3. 确认 KV namespace ID 正确填写
4. 测试 Worker 端点：`https://your-worker.workers.dev/api/visitor`

### 计数器显示 "加载中..."

..."

**可能原因：**
- Worker 响应超时
- 网络问题

**解决方案：**
1. 检查网络连接
2. 等待几秒后刷新页面
3. 查看浏览器控制台是否有错误

### 计数器数字不增加

**可能原因：**
- KV 写入权限问题
- Worker 脚本逻辑错误

**解决方案：**
1. 检查 KV namespace 写入配额
2. 查看 Worker 日志
3. 确认 Worker 脚本正确执行

## 💡 高级功能

### 1. 设置过期时间

在 Worker 脚本中添加 TTL：

```javascript
await env.VISITORS.put('count', count, {
  expirationTtl: 60 * 60 * 24 * 30  // 30天后过期
});
```

### 2. 添加去重逻辑

防止同一个人重复计数：

```javascript
// 使用 IP 地址或 cookie
const clientIP = request.headers.get('CF-Connecting-IP');
const visited = await env.VISITORS.get(`visited_${clientIP}`);

if (!visited) {
  // 新访问，增加计数
  await env.VISITORS.put(`visited_${clientIP}`, '1', {
    expirationTtl: 60 * 60 * 24  // 24小时后过期
  });
  // ... 增加计数逻辑
}
```

### 3. 添加多个计数器

区分不同页面的访问：

```javascript
// 根据路径统计
const path = url.pathname;
const count = await env.VISITORS.get(`count_${path}`) || '0';
await env.VISITORS.put(`count_${path}`, (parseInt(count) + 1).toString());
```

## 📚 相关资源

- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Cloudflare KV 文档](https://developers.cloudflare.com/kv/)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)

## 🆘 技术支持

如果遇到问题：

1. 检查 Cloudflare 状态页面：https://www.cloudflarestatus.com/
2. 查看 GitHub Issues
3. 联系 Cloudflare 支持

---

祝你设置顺利！如有问题，随时询问 🌸
