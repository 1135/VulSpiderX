
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
//res1 - res2 (in res1 but not in res2)
function getdifference(res1, res2) {
  // Use filter to create a new array containing only items from res1 that remain
  // after checking against all items in res2
  return res1.filter(item1 => {
    // If item1 is found in res2, return false (exclude it)
    // If item1 is NOT found in res2, return true (include it)
    for (let j = 0; j < res2.length; j++) {
      if (arraysEqual(item1, res2[j])) {
        return false; // Found in res2, so it's not a difference
      }
    }
    return true; // Not found in res2, so it is a difference
  });
}


//暴露函数 让index.js调用
module.exports.getdifference = getdifference;