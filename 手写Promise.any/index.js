/* 
    参数：promise数组
    说明：只要其中的一个 promise 成功，就返回那个已经成功的 promise
         如果没有一个成功，则返回rejected回调函数处理的结果数组
*/

function PromiseAny(promiseArr) {
	return new Promise((resovle, reject) => {
		// 如果数组为空，则返回rejected状态的空数组
		if (promiseArr.length === 0) {
			return Promise.reject([]);
		}
		// 获取数组长度
		const len = promiseArr.length;
		// 保存结果
		const res = [];
		// 计数器
		let count = 0;
		// 循环遍历
		for (let i = 0; i < len; i++) {
			Promise.resolve(promiseArr[i])
				.then((data) => {
					resovle(data);
				})
				.catch((err) => {
					//保存错误结果
					res[i] = err;
					// 计数器加1
					count++;
					// 如果全都是rejected状态,则返回 res
					if (count === len) {
						reject(res);
					}
				});
		}
	});
}

let p1 = new Promise((res, rej) => {
	setTimeout(() => {
		res("p1调用成功");
	}, 500);
});

//p2: 直接转化为res状态
let p2 = new Promise((res, rej) => {
	res("p2调用成功");
});

//p3: 直接转化为rej状态
let p3 = new Promise((res, rej) => {
	rej("p3调用失败....");
});

//p4: 1s后转化为rej状态
let p4 = new Promise((res, rej) => {
	setTimeout(() => {
		rej("p4调用失败...");
	}, 1000);
});

PromiseAny([p1, p2])
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
	});

PromiseAny([p3, p4])
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
	});
