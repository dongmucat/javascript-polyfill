Array.prototype.myFilter = function (callback, thisArg) {
    if (this == undefined) {
        throw new TypeError('this is null or not defined');
    }
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
        throw new TypeError(callback + ' is not a function');
    }
    //创建新数组
    const res = [];
    //让arr成为回调函数的对象传递（强制转换对象）
    const arr = Object(this);
    // >>>0 保证len为number类型，且为正整数
    const len = arr.length || 0;
    for (let i = 0; i < arr.length; i++) {
        if (callback.call(thisArg,arr[i],i,this)) {
            res.push(arr[i]);
        }
        
    }
    return res;
}

//test
const arr = [1, 2, 3, 4, 5];
const x = arr.myFilter((item) => {
    return item > 3;
});
console.log(x);