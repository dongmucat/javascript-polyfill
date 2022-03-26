Function.prototype.myBind = function (target) {
    if (typeof this !== 'function') {
        throw TypeError('error');
    }
    // 缓存this
    const self = this;
    const args = [...arguments].slice(1);
    //返回一个函数
    return function fn() {
        // 判断调用方式
        // 因为返回了一个函数，我们可以 new F()，所以需要判断
        // 对于 new 的情况来说，不会被任何方式改变 this
        //闭包
        
        if (this instanceof fn) {
            return new self(...args, ...arguments);
        } else {
            return self.apply(target, args.concat([...arguments]));
        }

    };
};
// 普通函数
function test() {
    // new 的方式调用 bind 参数输出换做 [...arguments]
    console.log(this.name);
}
// 自定义对象
var obj = {
    name: 'PJ'
}
// 调用函数的 call 方法
let F = test.myBind(obj);
// 返回对象
F()
let obj1 = new F();
