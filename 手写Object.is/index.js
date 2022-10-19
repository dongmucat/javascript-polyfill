/*Object.is解决的主要是这两个问题：
+0 === -0  // true
NaN === NaN // false
*/

Object.prototype.myIs = function (x, y) {
	if (x === y) {
		//运行到1/x === 1/y的时候x和y都为0，但是1/+0 = +Infinity， 1/-0 = -Infinity, 是不一样的
		return x !== 0 || y !== 0 || 1 / x === 1 / y;
	}
	//x和y为NaN情况
	return x !== x && y !== y;
};

//test
console.log("+0,+0", Object.myIs(+0, +0));
console.log("-0,+0", Object.myIs(-0, +0));
console.log("0,0", Object.myIs(0, 0));
