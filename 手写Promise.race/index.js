/* 
    参数：promise数组
    说明：当传入的所有的promise其中有任何一个状态变成fulfilled
    或者rejected，则执行相应的回调
    返回值：promise
*/

function PromiseRace(promiseArr) {
	return new Promise((resolve, reject) => {
		// 获取数据的长度
		const len = promiseArr.length;
		for (let i = 0; i < len; i++) {
			Promise.resolve(promiseArr[i])
				.then((data) => {
					resolve(data);
				})
				.catch((err) => {
					reject(err);
				});
		}
	});
}

//p1: 0.5s后直接转化为res状态
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

//p4: 2s后转化为rejected状态
let p4 = new Promise((res, rej) => {
	setTimeout(() => {
		rej("p4失败了...");
	}, 2000);
});

Promise.race([p1, p3, p4])
	.then((res) => {
		console.log(res); //p1调用成功
	})
	.catch((rej) => {
		console.log(rej);
	});
