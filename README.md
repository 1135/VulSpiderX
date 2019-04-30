# VulSpiderX

本程序在后台持续运行，(每20分钟)通过headless chrome获取最新漏洞，如果对比后发现有新内容(漏洞标题+url链接），发送邮件主动通知给若干个安全人员。

### 实现介绍

本程序使用node.js开发，爬取功能使用Google puppeteer模块，动态解析javascript绕过网站反爬机制，定期获取hackerone最新公开漏洞(漏洞标题+url链接），并将最新公布的漏洞，发送邮件主动通知给若干个安全人员。

### 实现效果

![all](https://github.com/1135/notes/blob/master/imgs/vulspiderX.png?raw=true)


### 配置参数

编辑`module_mail.js`设置发件箱信息
* 发件邮箱地址：将代码中`host:`中的地址改为发件邮箱地址。
* 发件邮箱账号：将代码中`user =`的值改为发件邮箱账号。
* 发件邮箱密码：将代码中`pass =`的值改为发件邮箱密码。

配置收件箱地址
* 收件人邮箱地址列表：将代码中`recipients =`的值改为收件人邮箱地址列表。

### Usage

请确保您已经安装了node.js及包管理器yarn

```
#安装依赖库
yarn

# 运行 可选择保存程序日志
node index.js > VulSpiderX.log
```

### 相关项目

* [1135/VulSpider: 本程序在后台持续运行，获取最新漏洞及每日简报，发送邮件给安全人员。](https://github.com/1135/VulSpider)
