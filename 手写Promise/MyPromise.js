const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
	constructor(executor) {
		// 初始化
		this.init();
		// 防止 executor 有throw语句
		try {
			executor(this.resolve, this.reject);
		} catch (error) {
			this.reject(error);
		}
	}

	init = () => {
		this.PromiseState = PENDING; // promise状态
		this.PromiseResult = null; // 结果
		this.onFulfilledCallbacks = []; // 专门存放成功的回调函数
		this.onRejectedCallbacks = []; // 专门存放失败的回调函数
	};

	resolve = (value) => {
		if (this.PromiseState !== PENDING) {
			return;
		}
		// change
		this.PromiseResult = value;
		this.PromiseState = FULFILLED;
		// 执行失败的回调函数
		while (this.onFulfilledCallbacks.length) {
			const cb = this.onFulfilledCallbacks.shift();
			cb(this.PromiseResult);
		}
	};

	static resolve(params) {
		if (params instanceof MyPromise) {
			return params;
		}

		return new MyPromise((resolve) => resolve(params));
	}

	reject = (reason) => {
		if (this.PromiseState !== PENDING) {
			return;
		}
		// change
		this.PromiseResult = reason;
		this.PromiseState = REJECTED;
		// 执行成功的回调函数
		while (this.onRejectedCallbacks.length) {
			const cb = this.onRejectedCallbacks.shift();
			cb(this.PromiseResult);
		}
	};

	static reject(reason) {
		return new MyPromise((resolve, reject) => reject(reason));
	}

	then = (onFulfilled, onRejected) => {
		const realOnFulfilled =
			typeof onFulfilled === "function" ? onFulfilled : (value) => value;
		const realOnRejected =
			typeof onRejected === "function"
				? onRejected
				: (reason) => {
						throw reason;
				  };

		// 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
		const promise2 = new MyPromise((resolve, reject) => {
			const fulfilledMicrotask = () => {
				// 创建一个微任务等待 promise2 完成初始化
				queueMicrotask(() => {
					try {
						// 获取成功回调函数的执行结果
						const x = realOnFulfilled(this.PromiseResult);
						// 传入 resolvePromise 集中处理
						resolvePromise(promise2, x, resolve, reject);
					} catch (error) {
						reject(error);
					}
				});
			};

			const rejectedMicrotask = () => {
				// 创建一个微任务等待 promise2 完成初始化
				queueMicrotask(() => {
					try {
						// 调用失败回调，并且把原因返回
						const x = realOnRejected(this.PromiseResult);
						// 传入 resolvePromise 集中处理
						resolvePromise(promise2, x, resolve, reject);
					} catch (error) {
						reject(error);
					}
				});
			};
			// 判断状态
			if (this.PromiseState === FULFILLED) {
				fulfilledMicrotask();
			} else if (this.PromiseState === REJECTED) {
				rejectedMicrotask();
			} else if (this.PromiseState === PENDING) {
				// 等待
				// 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
				// 等到执行成功失败函数的时候再传递
				this.onFulfilledCallbacks.push(fulfilledMicrotask);
				this.onRejectedCallbacks.push(rejectedMicrotask);
			}
		});

		return promise2;
	};
}

function resolvePromise(promise2, x, resolve, reject) {
	// 如果相等了，说明return的是自己，抛出类型错误并返回
	if (promise2 === x) {
		return reject(
			new TypeError("Chaining cycle detected for promise #<Promise>")
		);
	}
	if (x instanceof MyPromise) {
		// 如果返回值是MyPromise
		// 如果返回值是promise对象，返回值为成功，新promise就是成功
		// 如果返回值是promise对象，返回值为失败，新promise就是失败
		// 谁知道返回的promise是失败成功？只有then知道
		x.then(resolve, reject);
	} else {
		resolve(x);
	}
}

module.exports = MyPromise;
