/**
 * 参考：https://es6.ruanyifeng.com/#docs/promise#Promise-prototype-finally
 * finally会返回一个Promise本质上是then方法，它接收一个callback，无论成功还是失败都会去执行它
 *
 */
Promise.prototype.myFinally = function (callback) {
	return this.then(
		(value) => Promise.resolve(callback()).then(() => value),
		(reason) =>
			Promise.resolve(callback()).then(() => {
				throw reason;
			})
	);
};

const p = new Promise((resolve, reject) => {
	resolve("成功了");
})
	.then((data) => data)
	.myFinally(() => console.log("this is myFinally"))
	.then((data) => console.log(data));
