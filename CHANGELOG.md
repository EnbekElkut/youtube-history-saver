# 更新日志 / Changelog

本文档记录了项目的所有重要更改。

All notable changes to this project will be documented in this file.

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [Unreleased]

### 计划添加 / Planned
- 云同步功能
- 标签分类功能
- 笔记功能
- 数据可视化图表
- 观看习惯分析

---

## [1.0.0] - 2025-10-05

### 新增 / Added
- ✨ 自动保存YouTube观看历史记录功能
- ✨ 可视化历史记录展示界面
  - 缩略图显示
  - 视频标题和频道信息
  - 观看时间显示
  - 观看次数统计
- ✨ 搜索功能
  - 按标题搜索
  - 按频道名称搜索
- ✨ 筛选功能
  - 按日期范围筛选
  - 一键重置筛选条件
- ✨ 数据管理功能
  - 导出为JSON格式
  - 导入JSON文件
  - 删除单条记录
  - 清空所有记录
- ✨ 观看统计功能
  - 记录观看次数
  - 标注常看视频
  - 显示总记录数和总观看次数
- ✨ 导入工具
  - `import-youtube-history.html` 网页工具
  - `convert-youtube-history.py` Python转换脚本
  - 支持Google Takeout导出格式
  - 支持网页直接抓取
- ✨ 美观的用户界面
  - 紫色渐变主题
  - 卡片式布局
  - 流畅的动画效果
  - 响应式设计

### 技术实现 / Technical
- 使用Manifest V3规范
- Service Worker后台脚本
- Content Script内容脚本
- Chrome Storage API本地存储
- 纯JavaScript实现，无外部依赖

### 文档 / Documentation
- 📖 完整的README.md
- 📖 安装指南
- 📖 导入历史记录指南
- 📖 贡献指南
- 📖 更新日志

### 浏览器支持 / Browser Support
- ✅ Chrome 88+
- ✅ Edge 88+
- ✅ Brave (最新版)
- ✅ Opera (最新版)

---

## 版本说明 / Version Notes

### 版本号规则
- **主版本号 (Major)**: 不兼容的API更改
- **次版本号 (Minor)**: 向下兼容的功能新增
- **修订号 (Patch)**: 向下兼容的问题修正

### 示例
- `1.0.0` → `1.0.1`: Bug修复
- `1.0.0` → `1.1.0`: 新增功能
- `1.0.0` → `2.0.0`: 重大更改

---

## 贡献 / Contributing

如果您想为项目做出贡献，请查看 [CONTRIBUTING.md](./CONTRIBUTING.md)。

---

## 链接 / Links

- [项目主页 / Homepage](https://github.com/yourusername/youtube-history-saver)
- [问题反馈 / Issues](https://github.com/yourusername/youtube-history-saver/issues)
- [发布版本 / Releases](https://github.com/yourusername/youtube-history-saver/releases)

---

**注意 / Note**: 将 `yourusername` 替换为您的实际GitHub用户名。
