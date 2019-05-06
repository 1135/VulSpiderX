var nodemailer = require('nodemailer');

var user = 'xxxx@aliyun.com';//发件 账号
var pass = 'xxxx';//发件 密码
var recipients = "1@sohu.com, 2@126.com";//收件地址 列表

function send(sub, content) {

    var transporter = nodemailer.createTransport({
        host: "smtp.aliyun.com",
        //port: 25, // SMTP
        port: 465, // SMTPS（SMTP-over-SSL）
        secureConnection: true, // SSL
        auth: {
            user: user,
            pass: pass,
        }
    });

    var mailOptions = {
        from: "VulSpiderX <" + user + ">", // 发件人
        //to: recipients,
        bcc: recipients,//密送
        subject: sub, // 标题
        text: content, // 内容
    };


    function callbackit(error, info) {
        if (error) {
            console.log(error)
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, callbackit);

}


//暴露函数 让index.js调用
module.exports.send = send;