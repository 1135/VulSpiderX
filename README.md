# VulSpiderX

[english](README_english.md) | [中文文档](README.md)

本程序在后台运行，每10到20分钟(随机)获取Hackerone的最新信息，如果有最新的漏洞，主动发送电子邮件(标题+链接)给若干个安全研究人员。

本程序使用node.js开发，爬取功能使用了Google puppeteer模块来操作headless chromium，从而实现动态解析javascript，以绕过反爬机制。

* 特点
  * 技术基础 - Google puppeteer
  * 绕过反爬 - 模拟人工 且加入了一定的随机性
  * 互不干扰 - 收件人A看不到收件人B的地址

### 实现效果

![all](https://github.com/1135/notes/blob/master/imgs/vulspiderX.png?raw=true)


### 配置参数

编辑`module_mail.js`进行配置

* 配置发件人信息
  * `host:`  邮箱服务商地址
  * `user =` 邮箱账号
  * `pass =` 邮箱密码

* 配置收件人信息
  * `recipients =`收件人邮箱地址列表

### 使用方法

>请确保您已经安装了node.js及包管理器yarn(本人使用的环境 Mac OS + node v10.15.3)
>其他环境暂未实际测试

```
#安装依赖库
yarn install

# 运行 可选择保存程序日志
node index.js > VulSpiderX.log
```

### 相关项目

* [1135/VulSpider: 本程序在后台持续运行，获取最新漏洞及每日简报，发送邮件给安全人员。](https://github.com/1135/VulSpider)
