/* new干了什么？
1.新定义一个 空 对象
2.新的空对象 继承 构造函数的原型链
3.将构造函数的 this 指向这个对象
4.根据构造函数的返回值类型返回结果，

*/

function myNew(fn, ...rest) {
    /* 判断fn是否是个函数 */
    if (typeof fn !== "function") {
        throw "fn must be a function";
    }
    /* 创建一个空bject对象此处等价为  let obj  = new Object() */
    const obj = {};
    //返回一个新对象，带着指定的原型对象和属性。
    /* 也可以写成 obj = Object.create(fn.prototype); */
    /* obj指向fn.prototype */
    obj.__proto__ = fn.prototype;
    //执行构造函数中的代码(为这个新对象添加属性和方法);  此处[...rest]为结构赋值
    const res = fn.apply(obj, [...rest]);
    /* 返回结果:如果return引用类型（数组，函数，对象），那么实例化对象就会返回该引用类型;否则直接返回obj对象 */
    /* return typeof res === 'object'||res instanceof Function &&  res !== null? res : obj; */
    return typeof res === "object" ? res : obj;
}

function foo() {
    this.name = "jack";
    this.arg0 = arguments[0];
}

foo.prototype.callName = function () {
    console.log(this.name);
};

//test
let test = myNew(foo, "nima", "123");
test.callName();
console.log(test.arg0);