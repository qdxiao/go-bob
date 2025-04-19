# go-bob

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Bob Version](https://img.shields.io/badge/Bob-≥0.5.0-green.svg)](https://github.com/ripperhe/Bob)
[![Qwen API](https://img.shields.io/badge/Qwen-API-blue.svg)](https://help.aliyun.com/document_detail/611472.html)
[![中文](https://img.shields.io/badge/中文-README.md-blue.svg)](README.md)
[![Metrics](https://img.shields.io/badge/Metrics-middleware-blue.svg)](https://github.com/qdxiao/metrics-middleware)

An intelligent development toolkit for Go developers based on Qwen large language model. This project includes two Bob plugins designed to enhance Go development efficiency and code quality.

</div>

## ✨ Features

### 1. Go Documentation Generator (go-doc-gen)

📝 **Automatically generates Go-compliant function documentation**

- ✅ Generates complete function descriptions
- ✅ Automatically generates parameter and return value documentation
- ✅ Supports HTTP API documentation
- ✅ Generates request and response examples
- ✅ Includes error handling documentation
- ✅ Follows official Go documentation standards

### 2. Go Variable Name Generator (go-variant-gen)

🔤 **Intelligently generates Go-compliant variable names**

- ✅ Strictly follows Uber Go Style Guide
- ✅ Supports multiple naming scenarios:
  - 📌 Regular variable naming
  - 📌 Boolean variable naming
  - 📌 Slice variable naming
  - 📌 Interface type naming
  - 📌 Error type naming
  - 📌 Package-level variable naming
  - 📌 Local variable naming
  - 📌 Constant naming
  - 📌 Enum value naming
  - 📌 Type parameter naming
  - 📌 Receiver naming
  - 📌 Test function naming
  - 📌 Struct naming
  - 📌 Interface naming
  - 📌 Package naming

## 🚀 Quick Start

### Installation

1. Download plugin files:
   - `go-doc-gen.bobplugin`
   - `ali-doc-translate.bobplugin`

2. Install plugins in Bob:
   - Open Bob Settings
   - Go to Plugin Management
   - Click "Add Plugin"
   - Select downloaded plugin files

3. Configure Qwen API Key:
   - Enter your Qwen API Key in plugin settings
   - API Key can be obtained at: https://help.aliyun.com/document_detail/611472.html

### Usage

#### Go Documentation Generator

1. Select the Go function code you want to document
2. Use Bob's translation feature (default shortcut: ⌥ + D)
3. Select "Go Documentation Generator" plugin
4. Wait for documentation generation

#### Go Variable Name Generator

1. Enter Chinese variable description
2. Use Bob's translation feature (default shortcut: ⌥ + D)
3. Select "Go Variable Name Generator" plugin
4. Get compliant English variable name

## ⚠️ Notes

- 🔑 Make sure to properly configure Qwen API Key
- 🔄 It's recommended to use the latest version of Bob
- 🌐 Plugins require internet connection to work
- 📝 Generated documentation and variable names are for reference only, please adjust according to actual needs

## 🤝 Contributing

Welcome to submit Issues and Pull Requests to help improve the project!

## 📄 License

[MIT License](LICENSE)

## 🚀 Coming Soon: gfast Microservice Framework

We are developing a new Go microservice framework called gfast with the following features:

### Core Features
- 🚀 High Performance: Leveraging Go's native features for ultimate performance
- 🏗️ Modular: Modular design with on-demand loading
- 🔌 Plugin-based: Support for custom plugins and flexible extensions
- 📦 Out-of-the-box: Rich built-in components and tools

### Tech Stack
- Service Governance: Based on gRPC and HTTP/2
- Service Discovery: Multiple service discovery mechanisms
- Configuration Center: Unified configuration management
- Distributed Tracing: Complete tracing support
- Monitoring & Alerting: Built-in monitoring and alerting system

### Development Experience
- 🛠️ Scaffolding: Quick project structure creation
- 📝 Code Generation: Automatic code generation
- 🔍 Debugging Tools: Powerful debugging support
- 📚 Documentation: Comprehensive development guides and examples

### Release Schedule
- Q3 2024: First preview release
- Q4 2024: Official release

## 📊 Related Projects

### metrics-middleware
Our released metrics middleware that supports monitoring for Gin HTTP servers and gRPC servers/clients:
- Complete monitoring chain
- Metrics collection at server-side, client-side, and database level
- Integrated Grafana dashboard
- Support for custom metrics

Learn more: [metrics-middleware](https://github.com/qdxiao/metrics-middleware)

---

<div align="center">

Made with ❤️ for Go developers

</div> 