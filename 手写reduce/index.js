Array.prototype.myReduce = function (callback,initValue) {
    //如果回调不是函数类型，则报错
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
        throw 'callback not a function';
    }
    const arr = this;
    let acc;//累加器
    let initIndex;//初始值的索引
    //如果没有初始值，则acc初始值为数组的第一个元素，initIndex从一开始
    initIndex = arguments.length === 1?1:0;
    acc = arguments.length === 1?arr[0]:initValue;
    //遍历
    for (let i = initIndex; i < arr.length; i++) {
        acc = callback(acc,arr[i],i,arr);
    }
    //返回
    return acc;
}

//test
const x = [1,2,3,4,5];
const y = x.myReduce((acc,cur)=>{
    return acc + cur;
},5);
console.log(y);//结果为20