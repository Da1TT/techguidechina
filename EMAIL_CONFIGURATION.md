# 邮件发送功能配置指南

本指南将帮助您配置网站中的邮件发送功能，使您能够接收来自访问者的表单提交邮件。

## 使用的服务

目前网站使用 [Formspree](https://formspree.io/) 作为邮件发送服务提供商。这是一个简单易用的表单处理服务，可以帮助您接收表单数据并发送到您的邮箱。

## 配置步骤

### 1. 创建Formspree账号

1. 访问 [Formspree官网](https://formspree.io/)
2. 点击"Sign Up"按钮注册一个新账号
3. 按照提示完成注册流程（您可以使用邮箱或GitHub账号注册）

### 2. 创建新表单

1. 登录到您的Formspree账号
2. 点击仪表板上的"+ Add New"按钮或"Click + to create a form"区域
3. 选择表单的用途（如"Client projects"、"My business/organization"等）
4. 按照引导完成表单设置

### 3. 获取表单端点

1. 在Formspree仪表板中，找到您刚刚创建的表单
2. 点击进入表单详情页面
3. 复制页面中提供的"Form Endpoint" URL，格式通常为 `https://formspree.io/f/{your-form-id}`

### 4. 更新网站代码

在项目中，邮件发送功能主要在以下两个文件中实现：

1. `src/components/BookingForm.tsx`
2. `src/pages/Contact.tsx`

您需要将这两个文件中的演示Formspree端点替换为您自己的端点。

#### 更新 BookingForm.tsx

1. 打开 `src/components/BookingForm.tsx` 文件
2. 找到以下代码（大约在第104行）：
   ```typescript
   fetch('https://formspree.io/f/maykgzqe', { // 演示的Formspree端点，需要替换为您自己的
   ```
3. 将 `https://formspree.io/f/maykgzqe` 替换为您自己的Formspree端点

#### 更新 Contact.tsx

1. 打开 `src/pages/Contact.tsx` 文件
2. 找到以下代码（大约在第38行）：
   ```typescript
   fetch('https://formspree.io/f/maykgzqe', { // 这个是演示的Formspree端点，您需要替换为自己的
   ```
3. 将 `https://formspree.io/f/maykgzqe` 替换为您自己的Formspree端点

## 测试邮件发送功能

完成配置后，建议您进行测试以确保邮件发送功能正常工作：

1. 运行您的网站
2. 填写并提交一个表单（如联系表单或预订表单）
3. 检查您在Formspree中配置的邮箱，确认是否收到了测试邮件

## 高级配置（可选）

### 配置通知

在Formspree中，您可以配置当表单收到新提交时的通知方式：

1. 在表单详情页面中，点击"Notifications"选项卡
2. 配置您希望接收通知的方式（如邮件通知、Slack通知等）

### 数据存储

Formspree还提供了数据存储功能，让您可以查看和导出所有表单提交的历史记录：

1. 在表单详情页面中，点击"Submissions"选项卡
2. 在这里您可以查看所有表单提交记录，并进行搜索、筛选和导出操作

## 常见问题排查

如果您在配置过程中遇到问题，可以尝试以下排查步骤：

1. 确保您的Formspree账号已经验证了邮箱
2. 检查您的Formspree端点URL是否正确复制到了代码中
3. 确认您的表单字段名称与代码中的字段名称一致
4. 查看浏览器的控制台，检查是否有任何错误信息
5. 检查Formspree仪表板中的"Logs"选项卡，查看是否有任何失败的提交记录

如果问题仍然存在，建议您查阅 [Formspree文档](https://formspree.io/docs/) 或联系Formspree支持团队获取帮助。