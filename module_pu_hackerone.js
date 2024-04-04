const puppeteer = require('puppeteer');


//模拟移动设备  默认支持列表 https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js
//const devices = require('puppeteer/DeviceDescriptors');
//const iPhone = devices['iPhone X'];


async function crawl() {

    //const puppeteer = require('puppeteer');

    //模拟移动设备  默认支持列表 https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js
    //const devices = require('puppeteer/DeviceDescriptors');
    //const iPhone = devices['iPhone X'];



    //运行浏览器
    const browser = await
        puppeteer.launch({
            //headless: false,// false则显示浏览器窗口
            //devtools: true, //是否为每个选项卡自动打开DevTools面板 (该选项只有当 headless 选项为 false 的时候有效)
            slowMo: 250,//浏览器每个操作的间隔时间 慢下来以便观察  slow down by 250ms
            defaultViewport: { width: 1440, height: 821 },//修改viewport为mbp15下用chrome时的大小  //默认viewport为 800x600
            ignoreHTTPSErrors: true, //忽略https错误
            args: [
                // browser proxy
                //'--proxy-server=127.0.0.1:8080',

                //设置整个浏览器的user-agent为 Mac+chrome
                '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',

                // 已知1: 如果在 mac系统下 开启chromium沙箱 正常运行.
                // 已知2: 如果在 linux和windows系统下 开启chromium沙箱 可能兼容性不佳 要么关闭沙箱 要么尝试使用参数  --enable-features=UseOzonePlatform

                //'--no-sandbox', 
                //'--disable-setuid-sandbox',
            ],
        });


    let page1 = await browser.newPage();
    //await page.emulate(iPhone);
    let url1 = 'https://hackerone.com/hacktivity/overview?queryString=disclosed%3Atrue&sortField=latest_disclosable_activity_at&sortDirection=DESC&pageIndex=0';



    /*
    删除部分代码：
    由于新版本的hackerone网站(2024年) 已经不是懒加载了 所以不需要 滚动/向下翻页 了.

    */






    //---------------------
    try {

        // 启动浏览器
        await page1.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined,
            });
        })

        // 跳转配置
        await
            page1.goto(
                url1,
                {
                    waitUntil: 'networkidle2',//networkidle2 表示500毫秒内 没有 多于2个网络连接时 结束navigation导航 //networkidle0表示500毫秒内 没有任何网络连接时 结束navigation导航
                    timeout: 400 * 1000,//最大导航时间（以毫秒为单位），默认为30秒，传递0表示禁用超时(disable timeout) 一直等待(好像是600秒)
                    referer: 'https://www.hackerone.com/', //请求头中加入referer
                }
            );



        //等待页面内容的加载.
        await page1.waitForSelector('input[data-testid="hacktivity-search-input-input-input"]'); //等待具有 name="search" 属性的 <input> 元素加载到 DOM 中，并且该元素是可见的和可交互的。






    //-----提取内容

    //在浏览器console调试
    // 获取漏洞标题
    // 筛选1 document.querySelectorAll('div.spec-hacktivity-content>a')[0].innerText
    // 说明 因为未公开的漏洞标题 没有a标签 所以这个筛选只能找到不被隐藏的标题。  无法找到隐藏的标题

    // 筛选2 document.querySelectorAll('div.spec-hacktivity-content')[16].outerText
    // 如果 隐藏 不能被展示 爬到的内容为 "closed 2 hrs agoBy batee5a to InnoGames$300.00"


    // 获取漏洞链接
    // 筛选1 document.querySelectorAll('div.spec-hacktivity-content>a')[0].href

        let eleCount = await page1.evaluate((sel) => {
            // return document.querySelectorAll('div.spec-hacktivity-content>a').length; 
            return document.querySelectorAll('div[data-testid="hacktivity-item"]').length;
        });


        //输出爬取的 元素条数 数据量 
        console.log(eleCount);

        var result;//声明变量
        if (eleCount != 0) {
            result = await page1.evaluate((sel, eleCount) => {
                let element = document.querySelectorAll(sel);//获取文档中所有 'div.react-flex-view>a' 元素的NodeList
                console.log(element);

                let tempArray1 = [];//定义空数组


                for (let i = 0; i <= eleCount - 1; i++) {
                    console.log(i);
                    // console.log(element[i]?.innerText);


                    const one_item = {
                        title: element[i].querySelector('div[data-testid="report-title"]')?.innerText,
                        severity: element[i].querySelector('span[data-testid="report-severity"]')?.innerText,
                        reward奖金: element[i].querySelector('span[data-testid="report-reward"]')?.innerText,
                        status: element[i].querySelector('div[data-testid="report-status"]')?.innerText,
                        disclosedAt披露时间点: element[i].querySelector('div[data-testid="report-disclosed-at"]')?.innerText,
                        link: element[i].querySelector('a[href^="/"]')?.href,
                        summary: element[i].querySelector('div[class="interactive-markdown text-sm w-full"]')?.innerText,
                    };



                    let  one_item_title = element[i].querySelector('div[data-testid="report-title"]')?.innerText;
                    // let one_item_severity = element[i].querySelector('span[data-testid="report-severity"]')?.innerText;

                    // let one_item_reward = element[i].querySelector('span[data-testid="report-reward"]')?.innerText;

                    // let one_item_status = element[i].querySelector('div[data-testid="report-status"]')?.innerText;
                    // let one_item_disclosedAt = element[i].querySelector('div[data-testid="report-disclosed-at"]')?.innerText;
                    // let one_item_reporter = element[i].querySelector('a[href^="/"]')?.innerText;
                    // let one_item_summary = element[i].querySelector('div[class="interactive-markdown text-sm w-full"]')?.innerText;


                    // let one_item = [one_item_title, one_item_severity, one_item_reward, one_item_status, one_item_disclosedAt, one_item_reporter, one_item_summary];
                    // const oneItemString = one_item.join('\n\n\n');

                    const oneItemString = JSON.stringify(one_item, null, 2);

                    tempArray1[i] = [one_item_title, oneItemString]
                    // element[i].innerText+'\n'+element[i].href;//取出某个元素 的innerText

                }
                return tempArray1
            }, 'div[data-testid="hacktivity-item"]', eleCount);

            //console.log(result)

        }
    }
    catch (err) {
        console.log(`An error occured.h1_[will_close_browser]`);
        await browser.close(); //已经出现异常 那就关闭浏览器 等待下次爬
        console.log(err);

    }
    finally {
        await browser.close();
        return result;
    }


}


//暴露函数 让index.js调用
module.exports.crawl = crawl;