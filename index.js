const module_array = require('./module_array');
const module_mail = require('./module_mail');
const module_pu_hackerone = require('./module_pu_hackerone');


var oldarray = [];
var res = [];
var diffarray = [];
var crawl_count = 0;


//定义sleep函数
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms || 1000));
}

// 输出当前时间
function print_current_time() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    console.log(year + '.' + month + '.' + day + ' ' + hour + ':' + minute + ':' + second);
}



//发送邮件 逐条发送
async function sendmail(arr) {

    for (var [key, value] of arr) {
        console.log("-----sending")
        console.log(key);
        console.log(value);
        await module_mail.send(key, value);// 漏洞标题 漏洞url
        await sleep(10 * 1000);//等待10秒 意思是10秒发一封邮件 避免ban
        console.log("-----done")
    }
}


async function mainlogic() {

    //爬取 计时开始
    const startDate = new Date().getTime();

    //爬取次数 第几次爬取
    crawl_count += 1;

    console.log('-----------------------------------');


    console.log(`[crawl]times: ${crawl_count}`);//爬取次数

    res = await module_pu_hackerone.crawl();

    //爬取 计时结束
    console.log(`[crawl] Time elapsed ${Math.round((new Date().getTime() - startDate) / 1000)} s`);

    console.log(res)
    if (res != null) {//res不为空
        console.log('items count: ', res.length);

        if (crawl_count == 1) {//首次爬取
            //console.log("first")
            sendmail(res);

            oldarray = res.concat()//深拷贝 数组

        }
        else {
            console.log('#1res:')
            console.log(res)
            diffarray = module_array.getdifference(res.concat(), oldarray)

            if (diffarray.length > 0) {//如果有新增内容
                console.log('diff:', diffarray);//比上次新增的内容
                sendmail(diffarray);
                oldarray = res.concat()//深拷贝 数组
            }
            else {//没有新增内容
                console.log("diff: 0")
            }

        }


    }


    console.log('-----------------------------------');

}


async function app() {

    while (1) {
        await mainlogic();
        print_current_time()
        console.log("waiting...")
        await sleep(20 * 60 * 1000);//等待20分钟 然后继续爬
    }

}

app()