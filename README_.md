# YouTube History Saver

<div align="center">

![YouTube History Saver](./icons/icon128.png)

**🎥 自动保存YouTube观看历史记录的浏览器插件**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/youtube-history-saver/releases)
[![Chrome](https://img.shields.io/badge/Chrome-88%2B-green.svg)](https://www.google.com/chrome/)
[![Edge](https://img.shields.io/badge/Edge-88%2B-blue.svg)](https://www.microsoft.com/edge)

[English](#english) | [中文](#中文)

</div>

---

## 中文

### 📖 项目简介

YouTube History Saver 是一款功能强大的浏览器插件，可以自动保存您的YouTube观看历史记录，并提供美观的可视化界面进行管理。所有数据保存在本地，完全保护您的隐私。

### ✨ 主要功能

- **🔄 全自动保存** - 观看YouTube视频时自动保存历史记录，无需手动操作
- **📊 可视化展示** - 精美的卡片式界面，显示缩略图、标题、频道、观看时间
- **🔍 搜索筛选** - 支持关键词搜索和日期范围筛选
- **📈 观看统计** - 记录观看次数，标注常看视频
- **💾 数据管理** - 支持导出/导入JSON格式，方便备份
- **📥 导入旧记录** - 提供工具导入Google Takeout导出的历史记录
- **🔒 隐私保护** - 所有数据本地存储，不上传到任何服务器
- **🎨 美观设计** - 紫色渐变主题，流畅动画效果

### 🖼️ 界面预览

![Screenshot](./screenshot-demo.png)

### 🚀 快速开始

#### 安装方法

1. **下载插件**
   - 从 [Releases](https://github.com/yourusername/youtube-history-saver/releases) 下载最新版本
   - 解压ZIP文件到任意文件夹

2. **加载到浏览器**

   **Chrome:**
   - 打开 `chrome://extensions/`
   - 开启"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择解压后的文件夹

   **Edge:**
   - 打开 `edge://extensions/`
   - 开启"开发人员模式"
   - 点击"加载解压缩的扩展"
   - 选择解压后的文件夹

3. **开始使用**
   - 访问YouTube并观看视频
   - 插件会自动保存历史记录
   - 点击插件图标查看历史记录

详细安装说明请查看 [安装指南](./安装指南.md)

### 📥 导入历史记录

支持三种方式导入之前观看过的YouTube视频：

#### 方法一：Google Takeout（推荐）
1. 访问 [Google Takeout](https://takeout.google.com/)
2. 导出YouTube历史记录（JSON格式）
3. 使用 `import-youtube-history.html` 工具转换
4. 在插件中导入转换后的文件

#### 方法二：网页直接抓取
1. 打开 [YouTube历史记录页面](https://www.youtube.com/feed/history)
2. 滚动加载更多记录
3. 运行提供的JavaScript脚本
4. 在插件中导入生成的文件

#### 方法三：Python脚本
```bash
python3 convert-youtube-history.py watch-history.json converted-history.json
```

详细导入教程请查看 [导入历史记录指南](./导入历史记录指南.md)

### 🎯 使用方法

#### 查看历史记录
- 点击浏览器工具栏中的插件图标
- 浏览所有保存的视频记录
- 点击视频卡片可以重新观看

#### 搜索视频
- 在搜索框输入关键词（标题或频道名）
- 点击"搜索"按钮或按回车键
- 显示匹配的结果

#### 筛选记录
- 选择开始日期和结束日期
- 点击"筛选"按钮
- 显示指定时间段的记录

#### 导出数据
- 点击"导出"按钮
- 选择保存位置
- 生成JSON格式的备份文件

#### 导入数据
- 点击"导入"按钮
- 选择之前导出的JSON文件
- 自动合并到现有记录中

### 🛠️ 技术栈

- **Manifest V3** - 最新的Chrome扩展API
- **Vanilla JavaScript** - 无外部依赖，轻量高效
- **Chrome Storage API** - 本地数据存储
- **Content Scripts** - 页面内容提取
- **Service Worker** - 后台数据处理

### 📊 浏览器兼容性

| 浏览器 | 版本要求 | 支持状态 |
|--------|---------|---------|
| Chrome | 88+ | ✅ 完全支持 |
| Edge | 88+ | ✅ 完全支持 |
| Brave | 最新版 | ✅ 完全支持 |
| Opera | 最新版 | ✅ 完全支持 |
| Firefox | - | ❌ 需要修改 |
| Safari | - | ❌ 不支持 |

### 🤝 贡献

欢迎贡献代码、报告Bug或提出建议！

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

详细贡献指南请查看 [CONTRIBUTING.md](./CONTRIBUTING.md)

### 📝 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解版本更新历史。

### ❓ 常见问题

**Q: 插件安全吗？**  
A: 完全安全！所有数据保存在本地浏览器中，不上传到任何服务器。代码开源，可以自行审查。

**Q: 会影响YouTube的正常使用吗？**  
A: 不会。插件在后台静默运行，不会干扰YouTube的任何功能。

**Q: 卸载插件后数据会丢失吗？**  
A: 是的。卸载前请使用"导出"功能备份数据。

**Q: 为什么有些视频没有保存？**  
A: 可能是页面加载不完整。刷新页面重新观看即可。

**Q: 支持YouTube Music吗？**  
A: 目前主要支持YouTube视频，YouTube Music支持可能不完整。

更多问题请查看 [Issues](https://github.com/yourusername/youtube-history-saver/issues)

### 📄 许可证

本项目采用 [MIT License](./LICENSE) 开源许可证。

### 🙏 致谢

- 感谢所有贡献者和测试用户
- 图标设计灵感来自YouTube官方设计
- 界面设计参考了现代化的浏览器插件设计规范

### 📞 联系方式

- **Issues**: [GitHub Issues](https://github.com/yourusername/youtube-history-saver/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/youtube-history-saver/discussions)
- **Email**: your.email@example.com

### ⭐ Star History

如果这个项目对您有帮助，请给个Star支持一下！

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/youtube-history-saver&type=Date)](https://star-history.com/#yourusername/youtube-history-saver&Date)

---

## English

### 📖 Introduction

YouTube History Saver is a powerful browser extension that automatically saves your YouTube watch history and provides a beautiful visualization interface for management. All data is stored locally to protect your privacy.

### ✨ Features

- **🔄 Auto Save** - Automatically saves history when watching YouTube videos
- **📊 Visualization** - Beautiful card-based interface with thumbnails, titles, channels, and timestamps
- **🔍 Search & Filter** - Keyword search and date range filtering
- **📈 Watch Statistics** - Track watch count and mark frequently watched videos
- **💾 Data Management** - Export/import in JSON format for backup
- **📥 Import Old History** - Tools to import history from Google Takeout
- **🔒 Privacy Protection** - All data stored locally, no server upload
- **🎨 Beautiful Design** - Purple gradient theme with smooth animations

### 🚀 Quick Start

#### Installation

1. **Download**
   - Download the latest version from [Releases](https://github.com/yourusername/youtube-history-saver/releases)
   - Extract the ZIP file

2. **Load into Browser**

   **Chrome:**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the extracted folder

   **Edge:**
   - Open `edge://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the extracted folder

3. **Start Using**
   - Visit YouTube and watch videos
   - Extension will automatically save history
   - Click extension icon to view history

### 📥 Import History

Three methods to import previously watched YouTube videos:

#### Method 1: Google Takeout (Recommended)
1. Visit [Google Takeout](https://takeout.google.com/)
2. Export YouTube history (JSON format)
3. Use `import-youtube-history.html` tool to convert
4. Import converted file in extension

#### Method 2: Web Page Extraction
1. Open [YouTube History Page](https://www.youtube.com/feed/history)
2. Scroll to load more records
3. Run provided JavaScript script
4. Import generated file in extension

#### Method 3: Python Script
```bash
python3 convert-youtube-history.py watch-history.json converted-history.json
```

### 🛠️ Tech Stack

- **Manifest V3** - Latest Chrome Extension API
- **Vanilla JavaScript** - No external dependencies
- **Chrome Storage API** - Local data storage
- **Content Scripts** - Page content extraction
- **Service Worker** - Background data processing

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### 📄 License

This project is licensed under the [MIT License](./LICENSE).

### 📞 Contact

- **Issues**: [GitHub Issues](https://github.com/yourusername/youtube-history-saver/issues)
- **Email**: your.email@example.com

---

<div align="center">

**Made with ❤️ by [Your Name](https://github.com/yourusername)**

If you find this project helpful, please give it a ⭐!

</div>
