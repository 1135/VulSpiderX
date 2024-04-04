const module_array = require('./module_array');
const module_mail = require('./module_mail');
const module_pu_hackerone = require('./module_pu_hackerone');
const moudule_random = require('./module_random')

var oldarray = [];
var result_array = [];
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
    console.log("-----[mail]sending")

    arr.reverse();//数组逆序 以便发送后邮件显示顺序为由新到旧 第一条最新

    for (var index = 0; index < arr.length; index++) {

        let one_title = arr[index][0];
        let one_content = arr[index][1];
        await module_mail.send_a_mail(one_title, one_content);// 漏洞标题 漏洞url
        await sleep(20 * 1000);//20秒后继续发送下一封邮件 避免ban
    }

    console.log("-----[mail]done")
}


async function mainlogic() {

    //爬取 计时开始
    const startDate = new Date().getTime();

    //爬取次数 第几次爬取
    crawl_count += 1;

    console.log('-----------------------------------');


    console.log(`[crawl]times: ${crawl_count}`);//爬取次数

    result_array = await module_pu_hackerone.crawl();

    //爬取 计时结束
    console.log(`[crawl] Time elapsed ${Math.round((new Date().getTime() - startDate) / 1000)} s`);

    //console.log(result_array)
    if (result_array != null) {//res不为空
        console.log('items count: ', result_array.length);
        //console.log(`\n[crawl]data: ${res}`);//本次爬取的数据


        if (crawl_count == 1) {//首次爬取
            // console.log("first")
            console.log(result_array)

            //逐条发送 可能因为一次性发送多封邮件被ban
            //sendmail(res);

            var result = "The program runs successfully.\nHere are the results of the first crawl.\nThe email address will receive the latest information in the future.\n\n-----\n\n";

            for (var index = 0; index < result_array.length; index++) {
                let one_title = result_array[index][0];
                let one_content = result_array[index][1];
                result += one_title + "\n" + one_content + "\n\n========\n\n" // 换行
            }



            sendmail([["Running...", result]]);

            oldarray = result_array.concat()//深拷贝 数组

        }
        else {

            //求差集
            //result_array  - oldarray
            diffarray = module_array.getdifference(result_array.concat(), oldarray)

            if (diffarray.length > 0) {//如果有新增内容
                console.log('diff:', diffarray);//新增的数量

                console.log("\nall:")
                console.log(result_array)
                if (diffarray.length < 9){
                    sendmail(diffarray);
                }
                else{
                    console.log('skip')
                }
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


async function app() {

    while (1) {
        await mainlogic();
        print_current_time()
        let wait_time = moudule_random.randomIntInc(10, 20) * 60 * 1000;
        console.log("Wait " + wait_time / (60 * 1000) + " minutes for the next crawl.");
        await sleep(wait_time);//每两次爬取之间的时间间隔为10-20分钟
    }

}

app()
