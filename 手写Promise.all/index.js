/* 
    参数：promise数组
    说明：传入的所有Promise最终都转化为fulfilled态时，
        则会执行resolve回调，并将返回值是的所有的Promise的resolve的回调的value的数组。
        其中一个任何Promise为reject状态时，
        则返回的Promise的状态更改为rejected
*/

function PromiseAll(promiseArr) {
	return new Promise((resovle, reject) => {
		// 空数组判断
		if (promiseArr.length === 0) {
			// 返回一个为fulfilled状态的promise
			return new Promise.resolve([]);
		}
		// 获取长度
		const len = promiseArr.length;
		// 保存结果数组
		const res = [];
		// 计数器
		let count = 0;
		for (let i = 0; i < len; i++) {
			Promise.resolve(promiseArr[i])
				.then((data) => {
					// 保存结果
					res[i] = data;
					// 计数+1
					count++;
					if (count === len) {
						resovle(res);
					}
				})
				.catch((err) => {
					reject(err);
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

//p3: 1s后转化为rejected状态
let p3 = new Promise((res, rej) => {
	setTimeout(() => {
		rej("p3失败了...");
	}, 1000);
});

Promise.all([p1, p2])
	.then((res) => {
		console.log(res); // ['p1调用成功','p2调用成功']
	})
	.catch((rej) => {
		console.log(rej);
	});

Promise.all([p1, p2, p3])
	.then((res) => {
		console.log(res);
	})
	.catch((rej) => {
		console.log(rej); // p3失败了
	});
