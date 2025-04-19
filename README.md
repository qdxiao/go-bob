# go-bob

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Bob Version](https://img.shields.io/badge/Bob-≥0.5.0-green.svg)](https://github.com/ripperhe/Bob)
[![Qwen API](https://img.shields.io/badge/Qwen-API-blue.svg)](https://help.aliyun.com/document_detail/611472.html)
[![English](https://img.shields.io/badge/English-README-en.md-blue.svg)](README-en.md)
[![Metrics](https://img.shields.io/badge/Metrics-middleware-blue.svg)](https://github.com/qdxiao/metrics-middleware)

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

## 🚀 重磅预告：gfast 微服务开发框架

我们正在开发一个全新的 Go 微服务开发框架 gfast，它将具有以下特点：

### 核心特性
- 🚀 高性能：基于 Go 语言原生特性，提供极致的性能表现
- 🏗️ 模块化：采用模块化设计，支持按需加载
- 🔌 插件化：支持自定义插件，灵活扩展功能
- 📦 开箱即用：提供丰富的内置组件和工具

### 技术栈
- 服务治理：基于 gRPC 和 HTTP/2
- 服务发现：支持多种服务发现机制
- 配置中心：统一的配置管理
- 链路追踪：完整的分布式追踪支持
- 监控告警：内置监控和告警系统

### 开发体验
- 🛠️ 脚手架工具：快速创建项目结构
- 📝 代码生成：自动生成基础代码
- 🔍 调试工具：强大的调试支持
- 📚 完整文档：详细的开发文档和示例

### 预计发布时间
- 2024 年 Q3 发布首个预览版本
- 2024 年 Q4 发布正式版本

## 📊 相关项目

### metrics-middleware
我们已发布的监控指标中间件，支持 Gin HTTP 服务器和 gRPC 服务器/客户端的指标监控：
- 提供完整的监控链路
- 支持服务端、客户端和数据库层面的指标采集
- 集成 Grafana 监控面板
- 支持自定义指标

了解更多：[metrics-middleware](https://github.com/qdxiao/metrics-middleware)

---

<div align="center">

Made with ❤️ for Go developers

</div>
