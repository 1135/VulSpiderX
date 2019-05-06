# VulSpiderX

[english](README_english.md) | [中文文档](README.md)

本程序在后台运行，每10到20分钟(随机)获取Hackerone的最新信息，如果有最新的漏洞，主动发送电子邮件(标题+链接)给若干个安全研究人员。

本程序使用node.js开发，爬取功能使用了Google puppeteer模块来模拟人工操作headless chromium，同时动态解析javascript，以绕过反爬机制。

### 实现效果

![all](https://github.com/1135/notes/blob/master/imgs/vulspiderX.png?raw=true)

收件人隐私安全(任一收件人无法得到其他收件人的邮箱地址)

### 配置参数

编辑`module_mail.js`进行配置

* 配置发件人信息
  * `host:`  邮箱服务商地址
  * `user =` 邮箱账号
  * `pass =` 邮箱密码

* 配置收件人信息
  * `recipients =`收件人邮箱地址列表

### 使用方法

请确保您已经安装了 node.js 和 包管理器yarn
```
# 自动安装本程序的依赖库
yarn install

# 运行 可选择保存程序日志
node index.js > VulSpiderX.log
```

* 安装环境测试
  * 环境1: macOS 10.14.4 + node v10.15.3 亲测通过 ✅
  * 环境2: CentOS 7 + node 亲测通过 ✅ 如果报错请安装你缺少的chromium的依赖库即可 如`yum install libXScrnSaver*`
  * 其他: 暂未测试

### 相关项目

* [1135/VulSpider: 本程序在后台持续运行，获取最新漏洞及每日简报，发送邮件给安全人员。](https://github.com/1135/VulSpider)
