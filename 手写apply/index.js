Function.prototype.myApply = function (target) {
    if (typeof this !== "function") {
        throw new Error("not a function");
    }
    if (!Array.isArray(arguments[1])) {
        throw new Error('arg not a array');
    }
    // 当target为空的时候给值为window
    target = target || window;
    target.fn = this;
    /* 取得数组 */
    const args = arguments[1];
    /* 执行fn */
    const result = target.fn(args);
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