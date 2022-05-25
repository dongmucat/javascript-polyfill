Function.prototype.myCall = function(target){
    // this 指向调用 myCall函数的对象
    if (typeof this !== "function") {
        throw new Error("not a function");
    }
    target = target || window;
    target.fn = this; // 隐式绑定，间接改变 this 指向
    /* 执行 */
    const args = [...arguments].slice(1);
    // 这样的话fn中的this就会指向target
    const result = target.fn(...args);
    /* 删除fn */
    delete target.fn;
    /* 返回结果 */
    return result;
}

/* test */
function foo() {
    console.log(this.name);
    console.log([...arguments]);
}
let obj = {
    name:'jack'
}

foo.myCall(obj,'1','2','3');