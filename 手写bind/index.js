Function.prototype.myBind = function (target) {
	if (typeof this !== "function") {
		throw new Error("not a function");
	}
	// 缓存this
	const self = this;
	const args = [...arguments].slice(1);
	//返回一个函数
	function fn() {
		// 判断调用方式
		// 因为返回了一个函数，我们可以 new F()，所以需要判断
		// 对于 new 的情况来说，不会被任何方式改变 this
		//闭包

		//new的方式，实例会在fn的原型链上
		if (this instanceof fn) {
			return new self(...args, ...arguments);
		}
		// 直接调用的方式
		return self.apply(target, args.concat([...arguments]));
	};
	// fn继承self上的其他方法，并且深拷贝
	fn.prototype = Object.create(self.prototype);
	return fn;
};
// 普通函数
function test() {
	// new 的方式调用 bind 参数输出换做 [...arguments]
	this.age = 18;
	if (this.name) {
		console.log(this.name);
	}
}
// 自定义对象
var obj = {
	name: "PJ",
};
// 调用函数的 call 方法
const F = test.myBind(obj);
F();
// new方式
const obj1 = new F();
console.log(obj1.age);
