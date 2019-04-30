const puppeteer = require('puppeteer');

async function crawl() {

    const puppeteer = require('puppeteer');


    //运行浏览器
    const browser = await
        puppeteer.launch({
            //headless: false,// false则显示浏览器窗口
            //devtools: true, //是否为每个选项卡自动打开DevTools面板 (该选项只有当 headless 选项为 false 的时候有效)
            slowMo: 250,//浏览器每个操作的间隔时间 慢下来以便观察  slow down by 250ms
            //defaultViewport: {width:1920, height:1080},//修改viewport  //默认viewport为 800x600
            ignoreHTTPSErrors: true, //忽略https错误

            args: [
                //设置整个浏览器的user-agent为 win10+chrome
                '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
                // browser proxy
                //'--proxy-server=127.0.0.1:8080'
            ],
        });


    let url = 'https://hackerone.com/hacktivity?order_direction=DESC&order_field=latest_disclosable_activity_at&filter=type%3Aall';

    let page = await
        browser.newPage();


    try {
        await
            page.goto(
                url,
                {
                    waitUntil: 'networkidle2',//networkidle2表示500毫秒内 没有 多于2个网络连接时 完成导航 //networkidle0表示500毫秒内 没有任何网络连接时 完成导航
                    timeout: 0,//最大导航时间（以毫秒为单位），默认为30秒，传递0表示禁用超时 一直等待(好像是600秒)
                    referer: 'https://www.hackerone.com/', //请求头中加入referer
                }
            );

        await page.waitFor('input[name=search]');
       


        //向下滚动
        await page.evaluate(() => {
            return new Promise((resolve, reject) => {
                //let pos = 8000//当前页面高度 >= 该数值 则停止下翻 //如果设置为0则一直翻页 不停止
                let timer = setInterval(() => {
                    let scrollTop1 = document.documentElement.scrollTop
                    window.scrollBy(0, 400)
                    let scrollTop2 = document.documentElement.scrollTop
                    console.log(scrollTop2)//输出当前页面高度
                    
                    //如果达到了预期高度 或 两次相等(即向下翻页面高度不变 也没有懒加载了)
                    //终止下翻
                    //if (scrollTop2 >= pos || scrollTop1 == scrollTop2 ) {

                    //如果 两次相等(即向下翻页面高度不变 也没有懒加载了) 则 终止下翻
                    if (scrollTop1 == scrollTop2 ) {
                        clearInterval(timer)
                        resolve()
                    }
                },
                    500
                )
            })
        }
        )


    } catch (err) {
        console.log(`An error occured.`);
    } finally {
        //await page.close();
    }


    //-------------------------提取内容

    //在浏览器console调试
    // 获取漏洞标题
    // 筛选1 document.querySelectorAll('div.spec-hacktivity-content>a')[0].innerText
    // 说明 因为未公开的漏洞标题 没有a标签 所以这个筛选只能找到不被隐藏的标题。  无法找到隐藏的标题

    // 筛选2 document.querySelectorAll('div.spec-hacktivity-content')[16].outerText
    // 如果 隐藏 不能被展示 爬到的内容为 "closed 2 hrs agoBy batee5a to InnoGames$300.00"


    // 获取漏洞链接
    // 筛选1 document.querySelectorAll('div.spec-hacktivity-content>a')[0].href


    let eleCount = await page.evaluate((sel) => {
        return document.querySelectorAll('div.spec-hacktivity-content>a').length;
    });

    //输出爬取的元素数量
    //console.log(eleCount);

    var result;//声明变量
    if (eleCount != 0) {
        result = await page.evaluate((sel, eleCount) => {
            let element = document.querySelectorAll(sel);//获取文档中所有 'div.react-flex-view>a' 元素的NodeList

            let tempArray1 = [];//定义空数组htmlArray1
            for (let i = 0; i <= eleCount - 1; i++) {

                tempArray1[i] = [element[i].innerText, element[i].href]
                //htmlArray1[i] = element[i].innerText+'\n'+element[i].href;//取出某个元素 的innerText

            }
            return tempArray1
        }, 'div.spec-hacktivity-content>a', eleCount);

        //console.log(result)

    }

    await browser.close();
    return result;

}


//暴露函数 让index.js调用
module.exports.crawl = crawl;