/*Object.is解决的主要是这两个问题：
+0 === -0  // true
NaN === NaN // false
*/

Object.prototype.myIs = function (x, y) {
    //x和y为数字情况
    if (x === y) {
        //x!==0用来处理非0数字，1 / x === 1 / y用于处理0
        return x !== 0 || 1 / x === 1 / y;
    }
    //x和y为NaN情况
    return x !== x && y !== y;
}

//test
console.log('+0,+0',Object.myIs(+0, +0));
console.log('-0,+0',Object.myIs(-0, +0));
console.log('0,0',Object.myIs(0, 0));