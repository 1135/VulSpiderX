# VulSpiderX

[english](README_english.md) | [中文文档](README.md) | [自动运行配置](GITHUB_ACTIONS.md)

功能说明: 本程序在后台运行，每10到20分钟(随机)获取Hackerone的最新信息，如果有最新的漏洞，主动发送电子邮件(标题+链接)给若干个安全研究人员。

技术说明: 本程序使用node.js开发，爬取功能使用了Google puppeteer模块来模拟人工操作headless chromium，同时动态解析javascript，以绕过反爬机制。


### 实现效果

![all](https://github.com/1135/notes/blob/master/imgs/vulspiderX.png?raw=true)

收件人隐私安全(任一收件人无法得到其他收件人的邮箱地址)

### 配置参数

编辑`module_mail.js`进行配置

* 配置发件人信息
  * `host: `  邮箱服务地址
  * `port: `  邮件服务端口 建议使用SMTP-over-SSL协议(通常为465端口) 不建议使用SMTP协议(通常为25端口)
  * `secureConnection: ` SMTP-over-SSL协议则设置为true 否则为false
  * `user =` 邮箱账号
  * `pass =` 邮箱密码

* 配置收件人信息
  * `recipients =`收件人邮箱地址列表

### 使用方法

请确保您已经安装了 node.js 和 包管理器yarn
```shell
# 自动安装本程序的依赖库
yarn install

# 运行 可选择保存程序日志
node index.js > VulSpiderX.log
```

* 运行环境
  * 环境1: macOS 10.14.4 + node v10.15.3 亲测通过 ✅
  * 环境2: CentOS 7 + node v11.0.0 亲测通过 ✅ 如果报错请安装你缺少的chromium的依赖库即可 如`yum install libXScrnSaver*` 更多参考[puppeteer/troubleshooting.md](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-on-google-cloud-functions)
  * 其他: 暂未测试

### 更新日志

2019.4 开发完成.  2019-2024.2持续可用.

2024.4 更新完成.  Hackerone官网前端页面发生变更, 已修改相关提取数据的代码, 已更新到这个公开仓库.


### 相关项目

* [1135/VulSpider: 本程序在后台持续运行，获取最新漏洞及每日简报，发送邮件给安全人员。](https://github.com/1135/VulSpider)
