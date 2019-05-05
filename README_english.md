# VulSpiderX

[english](README_english.md) | [中文文档](README.md)

It runs in the background and gets the latest information on Hackerone every 10 to 20 minutes (random). If there are the latest vulnerabilities, it sends emails (title + URL links) to security researchers actively.

The crawl function uses Google puppeteer module to manipulate headless chromium to dynamically parse javascript bypass the anti-crawl mechanism.

* technical fundamentals : Google puppeteer
* bypass anti-crawl : simulates manual and adds some randomness
* non-interference : recipient A cannot see the address of recipient B

### Screenshots

![all](https://github.com/1135/notes/blob/master/imgs/vulspiderX.png?raw=true)

### Configuration

Edit `module_mail.js` to set the mail sender information
* `host:`  E-mail host address
* `user =` E-mail account
* `pass =` E-mail password


Configure recipient address
* `recipients =` recipient address

### Usage

>Please ensure that you have installed node.js and the package manager yarn(I use the environment Mac OS + node v10.15.3).
>Other environments are not actually tested yet.

```
# Install dependent libraries
yarn install

# Run (save the log)
node index.js > VulSpiderX.log
```

### Related projects

* [1135/VulSpider](https://github.com/1135/VulSpider)
