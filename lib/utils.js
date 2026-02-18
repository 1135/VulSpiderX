
// lib/utils.js

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms || 1000));
}

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

module.exports = {
    sleep,
    print_current_time
};
