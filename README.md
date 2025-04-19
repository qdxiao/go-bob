# go-bob

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Bob Version](https://img.shields.io/badge/Bob-≥0.5.0-green.svg)](https://github.com/ripperhe/Bob)
[![Qwen API](https://img.shields.io/badge/Qwen-API-blue.svg)](https://help.aliyun.com/document_detail/611472.html)
[![English](https://img.shields.io/badge/English-README-en.md-blue.svg)](README-en.md)

基于通义千问大模型，为 Go 开发者提供的智能开发工具集。本项目包含两个 Bob 插件，旨在提升 Go 开发效率和代码质量。

</div>

## ✨ 功能特性

### 1. Go 函数文档生成器 (go-doc-gen)

📝 **自动生成符合 Go 文档规范的函数注释**

- ✅ 支持生成完整的函数功能描述
- ✅ 自动生成参数和返回值说明
- ✅ 支持生成 HTTP 接口文档
- ✅ 自动生成请求和响应示例
- ✅ 支持生成错误处理说明
- ✅ 遵循 Go 官方文档规范

### 2. Go 变量名生成器 (go-variant-gen)

🔤 **智能生成符合 Go 命名规范的变量名**

- ✅ 严格遵循 Uber Go 语言编码规范
- ✅ 支持多种命名场景：
  - 📌 普通变量命名
  - 📌 布尔变量命名
  - 📌 切片变量命名
  - 📌 接口类型命名
  - 📌 错误类型命名
  - 📌 包级别变量命名
  - 📌 局部变量命名
  - 📌 常量命名
  - 📌 枚举值命名
  - 📌 类型参数命名
  - 📌 接收器命名
  - 📌 测试函数命名
  - 📌 结构体命名
  - 📌 接口命名
  - 📌 包命名

## 🚀 快速开始

### 安装说明

1. 下载插件文件：
   - `go-doc-gen.bobplugin`
   - `ali-doc-translate.bobplugin`

2. 在 Bob 中安装插件：
   - 打开 Bob 设置
   - 进入插件管理
   - 点击"添加插件"
   - 选择下载的插件文件

3. 配置通义千问 API Key：
   - 在插件设置中填入您的通义千问 API Key
   - API Key 获取地址：https://help.aliyun.com/document_detail/611472.html

### 使用说明

#### Go 函数文档生成器

1. 选中需要生成文档的 Go 函数代码
2. 使用 Bob 的翻译功能（默认快捷键：⌥ + D）
3. 选择 "Go 函数文档生成器" 插件
4. 等待生成文档注释

#### Go 变量名生成器

1. 输入中文变量描述
2. 使用 Bob 的翻译功能（默认快捷键：⌥ + D）
3. 选择 "Go 变量名生成器" 插件
4. 获取符合规范的英文变量名

## ⚠️ 注意事项

- 🔑 请确保已正确配置通义千问 API Key
- 🔄 建议使用最新版本的 Bob 软件
- 🌐 插件需要网络连接才能正常工作
- 📝 生成的文档和变量名仅供参考，请根据实际情况进行调整

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目！

## 📄 许可证

[MIT License](LICENSE)

---

<div align="center">

Made with ❤️ for Go developers

</div>
