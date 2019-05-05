# VulSpiderX

[english](README_english.md) | [中文文档](README.md)

本程序使用node.js开发，在后台持续运行，爬取功能使用了Google puppeteer模块，通过操作headless chromium(动态解析javascript绕过网站反爬机制)，每10-20分钟(随机)获取一次hackerone页面信息，如果对比发现存在最新漏洞信息(漏洞标题+url链接），发送邮件主动通知给若干个安全人员。

* 技术基础 - Google puppeteer
* 绕过反爬 - 模拟人工 且加入了一定的随机性
* 互不干扰 - 收件人A看不到收件人B的地址

### 实现效果

![all](https://github.com/1135/notes/blob/master/imgs/vulspiderX.png?raw=true)


### 配置参数

编辑`module_mail.js`设置发件箱信息
* 发件邮箱地址：将代码中`host:`中的地址改为发件邮箱地址。
* 发件邮箱账号：将代码中`user =`的值改为发件邮箱账号。
* 发件邮箱密码：将代码中`pass =`的值改为发件邮箱密码。

配置收件箱地址
* 收件人邮箱地址列表：将代码中`recipients =`的值改为收件人邮箱地址列表。

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
