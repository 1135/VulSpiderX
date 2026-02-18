var nodemailer = require('nodemailer');
const config = require('./config');

var user = config.mail.user;//发件 账号
var pass = config.mail.pass;//发件 密码
var recipients = config.mail.recipients;//收件地址 列表


async function send_a_mail(title_of_mail, content_of_mail, one_pdf_file) {

    var transporter = nodemailer.createTransport({
        host: config.mail.host,
        //port: 25, // SMTP
        port: config.mail.port, // SMTPS（SMTP-over-SSL）
        secureConnection: config.mail.secureConnection, // SSL
        auth: {
            user: user,
            pass: pass,
        }
    });

    // 发送邮件的配置信息 - 不带附件
    var mailOptions = {
        from: "VulX <" + user + ">", // 发件人
        //to: recipients,
        bcc: recipients,//bcc是密送
        subject: title_of_mail, // 标题
        //text和html两者只支持一种
        text: content_of_mail, // 内容
        //html: '<b>Hello world ?</b>' // html 内容
    };


    // 发送邮件的配置信息 - 带附件
    var mailOptions_with_attachment = {
        from: "VulX <" + user + ">", // 发件人
        //to: recipients,
        bcc: recipients,
        subject: title_of_mail, // 标题
        //text和html两者只支持一种
        text: content_of_mail, // 内容
        //html: '<b>Hello world ?</b>' // html 内容
        attachments: [
            //     {   // utf-8 string as an attachment
            //         filename: 'text1.txt',
            //         content: 'hello world!'
            //     },

            {   // binary buffer as an attachment
                filename: title_of_mail + '.pdf',
                content: one_pdf_file
            }]
    };



    function callbackit(error, info) {
        if (error) {
            console.log(error)
            return console.log(error);
            // console.log(error)
            // transporter.sendMail(mailOptions,callbackit)//重新发送
            // return console.log("[mail]fail!  retry..."+ mailOptions.subject + mailOptions.text)
        }
        console.log('Message sent: ' + info.response);

    }

    if (one_pdf_file == -1) {
        //无需附件
        // send mail with defined transport object
        await transporter.sendMail(mailOptions, callbackit);

    }
    else {   //需要附件
        // send mail with defined transport object
        await transporter.sendMail(mailOptions_with_attachment, callbackit);
    }

}


//暴露函数 让index.js调用
module.exports.send_a_mail = send_a_mail;