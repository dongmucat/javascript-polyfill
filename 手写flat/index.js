//reduce + concat + isArray + 递归
function flatDeep(arr) {
    return arr.reduce((acc,next)=>{
        return acc.concat(Array.isArray(next)?flatDeep(next):next);
    },[])
}
/* 使用stack */
function flatten(input) {
    const stack = [...input]; //保证不会破坏原数组
    const result = [];
    while (stack.length) {
        /* 从前面处理到后面 */
        const first = stack.shift();
        if (Array.isArray(first)) {
            /* 去掉一层皮后，重新放到stack前面 */
            stack.unshift(...first);
        } else {
            result.push(first);
        }
    }
    return result;
}