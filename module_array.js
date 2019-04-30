
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}


//求两个数组的差集（特殊的是 这两个数组中的元素 也是数组）
//res1 - res2
function getdifference(res1, res2) {
  for (i = 0; i < res1.length; i++) {
    for (j = 0; j < res2.length; j++) {
      if (arraysEqual(res1[i], res2[j])) {
        res1.splice(i, 1);//删除1个 索引为i 的数组元素
      }
    }
  }
  return res1
}


//暴露函数 让index.js调用
module.exports.getdifference = getdifference;