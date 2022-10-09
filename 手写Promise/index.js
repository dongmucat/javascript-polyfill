const MyPromise = require("./MyPromise");

const p1 = new MyPromise((resolve, reject) => {
	resolve("成功");
})
	.then()
	.then()
	.then()
	.then((value) => console.log(value));

const p2 = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		reject("失败");
	}, 1000);
}).then(
	(res) => console.log(res),
	(err) => console.log(err)
);

const p3 = new MyPromise((resolve, reject) => {
	resolve(100);
})
	.then(
		(res) => 2 * res,
		(err) => console.log(err)
	)
	.then(
		(res) => console.log(res),
		(err) => console.log(err)
	);
