const curry = fn =>
    judge = (...args) =>
        /* 需要到达原函数fn所需要的参数长度才执行 */
        args.length >= fn.length
            ? fn(...args)
            /* 如果参数不够，则返回函数然后看看下一个 */
            : (...arg) => judge(...args, ...arg)

// Test
const add = (a, b, c) => {
    const sum = a + b + c;
    console.log(sum);
    return sum;
}

const addCurry = curry(add)
addCurry(1, 2, 3) // 6
addCurry(1, 2)(3) // 6
addCurry(1)(2)(3) // 6
addCurry(1)(2, 3) // 6

const log = (a, b, c) => {
    console.log(a, b, c);
}

const logCurry = curry(log)

logCurry(1, 2, 3) // 1 2 3 
logCurry(1, 2)(3) // 1 2 3
logCurry(1)(2)(3) // 1 2 3
logCurry(1)(2, 3) // 1 2 3