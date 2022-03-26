Function.prototype.myApply = function (target) {
    if (typeof this !== "function") {
        throw new TypeError("not a function");
    }
    if (!Array.isArray(arguments[1])) {
        throw new Error('arg not a array');
    }
    target = target || window;
    target.fn = this;
    /* 取得数组 */
    let args = arguments[1];
    /* 执行fn */
    let result = target.fn(args);
    /* 删除fn */
    delete target.fn;
    return result;
}
const obj = { name: 123 };
function foo() {
    console.log(this.name);
    console.log(arguments[0]);
}

foo.myApply(obj,[1,2,3])