Array.prototype.mySlice = function (start, end) {
    // 保存结果
    const res = [];
    //
    const arr = Object(this);
    // this指向调用slice方法的数组
    const len = arr.length;

    // 参数默认值
    // 没有传入start，从0开始截取
    // 没有传入end，截取整个数组长度
    start = start === undefined ? 0 : start;
    end = end === undefined ? len : end;

    // 边界处理,小于零情况
    // start小于0，从star+len的位置截取
    // 如果start+len依然小于0,从0开始截取
    start = start < 0 ? start + len : start;
    start = start < 0 ? 0 : start;
    // end小于0，截取到end+len的位置
    // 如果end+len继续小于0，由于start最小位置是0开始，这种情况循环截取条件不会成立
    // 如果end大于数组元素长度len，截取整个数组长度
    end = end < 0 ? end + len : end;
    end = Math.min(end, len)
    
    // 截取[start,end)这个区间的元素
    // 隐含了start>end时循环条件不会成立的情况
    for (let i = start; i < end; i++) {
        res.push(arr[i])
    }
    return res;
}

function test() {
    const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
    console.log(animals.mySlice(1,3));
    console.log(animals.mySlice(-1,3));
    console.log(animals.mySlice(7));
    console.log(animals.mySlice(-12));
}
test();