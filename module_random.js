// 伪随机数范围 [low, high]
// 中括号表示“包括” 即结果可能为最小和最大值
function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low)
  }

//暴露函数 让index.js调用
module.exports.randomIntInc = randomIntInc;
