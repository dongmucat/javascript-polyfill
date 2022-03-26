Function.prototype.myCall = function(target,...args){
    // this 指向调用 myCall函数的对象
    if (typeof this !== "function") {
        throw new TypeError("not a function");
    }
    target = target || window;
    target.fn = this; // 隐式绑定，改变构造函数的调用者间接改变 this 指向
    /* 执行 */
    let result = target.fn(...args);
    /* 删除fn */
    delete target.fn;
    return result;
}

/* test */
function foo(...args) {
    console.log(this.name);
    console.log(args);
}
let obj = {
    name:'jack'
}

foo.myCall(obj,'1','2',3);