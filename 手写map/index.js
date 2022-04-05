Array.prototype.myMap = function (callback, thisArg) {
    if (this == undefined) {
        throw new TypeError('this is null or not defined');
    }
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
        throw new TypeError(callback + ' is not a function');
    }
    //创建一个新的数组
    const res = [];
    // 同理
    const arr = Object(this);
    const len = arr.length || 0;
    for (let i = 0; i < len; i++) {
        // 调用回调函数并传入新数组
        res[i] = callback.call(thisArg, arr[i], i, this);
    }
    return res;
}

//test
const arr = [1, 2, 3]
const x = arr.myMap((item) => {
    return item = item * 2
    }
);
console.log(x);
