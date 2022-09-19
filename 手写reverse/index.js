/**
 * 反转数组，此方法会改变原数组
 */

Array.prototype.myReverse = function () {
	const arr = Object(this);
	const len = arr.length;
	for (let left = 0, right = len - 1; left < right; left++, right--) {
		const temp = arr[left];
		arr[left] = arr[right];
		arr[right] = temp;
	}

	return arr;
};

// test

const arr = [1, 2, 3, 4, 5];
arr.myReverse();
console.log(arr);
