# 贡献指南 / Contributing Guide

感谢您对 YouTube History Saver 项目的关注！我们欢迎任何形式的贡献。

Thank you for your interest in YouTube History Saver! We welcome all forms of contributions.

---

## 中文

### 如何贡献

#### 报告Bug

如果您发现了Bug，请创建一个Issue并包含以下信息：

1. **Bug描述** - 清晰简洁地描述问题
2. **复现步骤** - 详细的复现步骤
   - 步骤1
   - 步骤2
   - 步骤3
3. **预期行为** - 您期望发生什么
4. **实际行为** - 实际发生了什么
5. **环境信息**
   - 浏览器：Chrome/Edge/其他
   - 浏览器版本：例如 Chrome 120.0.0
   - 操作系统：Windows 11/macOS/Linux
   - 插件版本：v1.0.0
6. **截图** - 如果可能，提供截图或录屏
7. **控制台日志** - 按F12打开开发者工具，复制Console中的错误信息

**Issue模板：**

```markdown
**Bug描述**
简短描述问题

**复现步骤**
1. 打开YouTube
2. 观看视频
3. 点击插件图标
4. 看到错误

**预期行为**
应该显示历史记录列表

**实际行为**
显示"加载失败"

**环境信息**
- 浏览器：Chrome 120.0.0
- 操作系统：Windows 11
- 插件版本：v1.0.0

**截图**
[粘贴截图]

**控制台日志**
```
Error: Failed to load history
    at loadHistory (popup.js:123)
```
```

#### 提出功能建议

我们欢迎新功能建议！请创建Issue并包含：

1. **功能描述** - 详细描述您想要的功能
2. **使用场景** - 这个功能解决什么问题
3. **期望行为** - 功能应该如何工作
4. **替代方案** - 是否有其他解决方案
5. **附加信息** - 任何其他相关信息

**Issue模板：**

```markdown
**功能描述**
希望添加云同步功能

**使用场景**
我在多台电脑上使用，希望历史记录能够同步

**期望行为**
- 登录Google账号后自动同步
- 在不同设备上查看相同的历史记录

**替代方案**
目前只能手动导出导入

**附加信息**
可以参考Chrome的书签同步功能
```

#### 提交代码

1. **Fork仓库**
   - 点击页面右上角的"Fork"按钮
   - 将仓库复刻到您的账号下

2. **克隆仓库**
   ```bash
   git clone https://github.com/your-username/youtube-history-saver.git
   cd youtube-history-saver
   ```

3. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```
   
   分支命名规范：
   - `feature/` - 新功能
   - `bugfix/` - Bug修复
   - `docs/` - 文档更新
   - `refactor/` - 代码重构
   - `test/` - 测试相关

4. **进行更改**
   - 编写代码
   - 遵循代码规范（见下文）
   - 添加必要的注释

5. **测试更改**
   - 在浏览器中加载插件测试
   - 确保所有功能正常工作
   - 检查是否有JavaScript错误

6. **提交更改**
   ```bash
   git add .
   git commit -m "Add: 新功能描述"
   ```
   
   提交信息规范：
   - `Add:` - 添加新功能
   - `Fix:` - 修复Bug
   - `Update:` - 更新功能
   - `Refactor:` - 重构代码
   - `Docs:` - 文档更新
   - `Style:` - 代码格式调整
   - `Test:` - 测试相关

7. **推送到GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **创建Pull Request**
   - 访问您的Fork仓库
   - 点击"New Pull Request"
   - 填写PR描述
   - 等待审核

**Pull Request模板：**

```markdown
## 更改说明
简要描述本次PR的内容

## 更改类型
- [ ] Bug修复
- [ ] 新功能
- [ ] 代码重构
- [ ] 文档更新
- [ ] 其他

## 测试
- [ ] 已在Chrome中测试
- [ ] 已在Edge中测试
- [ ] 所有功能正常工作
- [ ] 无JavaScript错误

## 相关Issue
Closes #123

## 截图（如果适用）
[粘贴截图]

## 检查清单
- [ ] 代码遵循项目规范
- [ ] 已添加必要的注释
- [ ] 已更新相关文档
- [ ] 已测试所有更改
```

### 代码规范

#### JavaScript规范

1. **使用ES6+语法**
   ```javascript
   // 好的
   const videos = [];
   const getVideos = async () => { ... };
   
   // 不好的
   var videos = [];
   function getVideos() { ... }
   ```

2. **使用有意义的变量名**
   ```javascript
   // 好的
   const videoTitle = 'Example Video';
   const watchCount = 5;
   
   // 不好的
   const vt = 'Example Video';
   const cnt = 5;
   ```

3. **添加注释**
   ```javascript
   // Get video history from storage
   async function getHistory() {
     // ...
   }
   ```

4. **错误处理**
   ```javascript
   try {
     const result = await chrome.storage.local.get(['videoHistory']);
     // ...
   } catch (error) {
     console.error('Failed to get history:', error);
   }
   ```

5. **代码格式**
   - 使用2个空格缩进
   - 每行不超过100个字符
   - 函数之间空一行
   - 使用分号结尾

#### HTML/CSS规范

1. **语义化HTML**
   ```html
   <!-- 好的 -->
   <header class="header">
   <main class="content">
   <footer class="footer">
   
   <!-- 不好的 -->
   <div class="header">
   <div class="content">
   <div class="footer">
   ```

2. **CSS类命名**
   - 使用kebab-case：`video-card`, `search-box`
   - 使用BEM命名法（可选）：`video-card__title`, `video-card--active`

3. **CSS组织**
   - 按功能分组
   - 添加注释说明
   - 使用CSS变量（可选）

### 文档贡献

1. **改进README**
   - 修正错别字
   - 添加示例
   - 翻译成其他语言

2. **添加教程**
   - 使用指南
   - 常见问题解答
   - 视频教程

3. **API文档**
   - 函数说明
   - 参数说明
   - 返回值说明

### 翻译贡献

我们欢迎将文档翻译成其他语言：

1. 创建语言文件夹：`docs/zh-CN/`, `docs/ja/`, `docs/ko/`
2. 翻译README.md和其他文档
3. 提交Pull Request

### 审核流程

1. **提交PR后**
   - 维护者会在1-3天内审核
   - 可能会提出修改建议
   - 请及时回复和修改

2. **审核通过后**
   - PR会被合并到main分支
   - 您的名字会出现在贡献者列表中
   - 感谢您的贡献！

### 行为准则

1. **尊重他人**
   - 友善、礼貌地交流
   - 尊重不同的观点
   - 接受建设性批评

2. **专业态度**
   - 专注于技术讨论
   - 避免人身攻击
   - 保持专业

3. **开放包容**
   - 欢迎新手贡献
   - 帮助他人成长
   - 分享知识经验

### 获得帮助

如果您在贡献过程中遇到问题：

1. **查看文档** - 先查看README和其他文档
2. **搜索Issue** - 看看是否有人遇到过类似问题
3. **创建Discussion** - 在GitHub Discussions中提问
4. **联系维护者** - 通过Issue或Email联系

### 贡献者

感谢所有贡献者！

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## English

### How to Contribute

#### Report Bugs

If you find a bug, please create an Issue with:

1. **Bug Description** - Clear and concise description
2. **Steps to Reproduce** - Detailed steps
3. **Expected Behavior** - What should happen
4. **Actual Behavior** - What actually happens
5. **Environment**
   - Browser: Chrome/Edge/Other
   - Browser Version: e.g., Chrome 120.0.0
   - OS: Windows 11/macOS/Linux
   - Extension Version: v1.0.0
6. **Screenshots** - If possible
7. **Console Logs** - Error messages from Console

#### Suggest Features

We welcome feature suggestions! Please create an Issue with:

1. **Feature Description** - Detailed description
2. **Use Case** - What problem does it solve
3. **Expected Behavior** - How should it work
4. **Alternatives** - Other possible solutions
5. **Additional Context** - Any other relevant information

#### Submit Code

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/youtube-history-saver.git
   ```
3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make changes**
5. **Test changes**
6. **Commit changes**
   ```bash
   git commit -m "Add: feature description"
   ```
7. **Push to GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Create Pull Request**

### Code Style

- Use ES6+ syntax
- Use meaningful variable names
- Add comments
- Handle errors properly
- Use 2 spaces for indentation

### Review Process

1. Submit PR
2. Maintainer reviews within 1-3 days
3. Make requested changes
4. PR gets merged

### Code of Conduct

1. Be respectful
2. Be professional
3. Be open and inclusive

### Get Help

- Check documentation
- Search existing Issues
- Create a Discussion
- Contact maintainers

---

**Thank you for contributing!** 🎉
