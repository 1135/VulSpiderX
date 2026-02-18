
// lib/bot.js
const module_pu_hackerone = require('../module_pu_hackerone');
const module_mail = require('../module_mail');
const module_array = require('../module_array');
const state = require('./state');
const utils = require('./utils');

let crawl_count = 0;
let oldarray = [];

// Initialize state on module load
oldarray = state.loadState();

async function runOnce() {
    //爬取 计时开始
    const startDate = new Date().getTime();

    //爬取次数 第几次爬取
    crawl_count += 1;

    console.log('-----------------------------------');
    console.log(`[crawl]times: ${crawl_count}`);//爬取次数

    let result_array = await module_pu_hackerone.crawl();

    //爬取 计时结束
    console.log(`[crawl] Time elapsed ${Math.round((new Date().getTime() - startDate) / 1000)} s`);

    if (result_array != null) {//res不为空
        // Save valid result to file
        state.saveState(result_array);

        console.log('items count: ', result_array.length);

        if (crawl_count == 1 && oldarray.length === 0) {//首次爬取且没有历史数据
            console.log(result_array)

            var result = "The program runs successfully.\nHere are the results of the first crawl.\nThe email address will receive the latest information in the future.\n\n-----\n\n";

            for (var index = 0; index < result_array.length; index++) {
                let one_title = result_array[index][0];
                let one_content = result_array[index][1];
                result += one_title + "\n" + one_content + "\n\n========\n\n" // 换行
            }

            await module_mail.send_a_mail("Running...", result, -1);
            oldarray = result_array.concat()//深拷贝 数组
        }
        else {
            //求差集
            //result_array  - oldarray
            let diffarray = module_array.getdifference(result_array.concat(), oldarray)

            if (diffarray.length > 0) {//如果有新增内容
                console.log('diff:', diffarray.length);//新增的数量
                console.log("\nall:")

                // detailed implementation of sendmail in index.js handles array looping
                await sendmail_batch(diffarray);

                oldarray = result_array.concat()//深拷贝 数组
            }
            else {//没有新增内容
                console.log("diff: 0")
            }
        }
    }
    else {
        console.log("it is null.")
    }
    console.log('-----------------------------------');
}

//发送邮件 逐条发送
async function sendmail_batch(arr) {
    console.log("-----[mail]sending")

    arr.reverse();//数组逆序 以便发送后邮件显示顺序为由新到旧 第一条最新

    for (var index = 0; index < arr.length; index++) {
        let one_title = arr[index][0];
        let one_content = arr[index][1];
        await module_mail.send_a_mail(one_title, one_content, -1);// 漏洞标题 漏洞url
        await utils.sleep(20 * 1000);//20秒后继续发送下一封邮件 避免ban
    }

    console.log("-----[mail]done")
}

module.exports = {
    runOnce
};
