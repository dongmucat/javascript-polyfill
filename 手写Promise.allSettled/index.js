/*
    1.返回一个Promise数组中包含所有promise的处理后的结果
    2.期待每个promise的结果，彼此不依赖，其中任何一个被 reject ，对其它都没有影响的时候，就用它吧
*/

function PromiseAllSettled(promiseArr) {
    return new Promise((resolve, reject) => {
        // 维护结果数组
        const res = [];
        // 计数器
        let count = 0;
        // promiseArr数组长度
        const len = promiseArr.length;
        for (let i = 0; i < len; i++) {
            // 使用Promise.resolve()包装，防止非Pormise的情况
            // 如果promiseArr[i]是promise，则直接返回这个promise，如果是其他，则进行包装成promise
            Promise.resolve(promiseArr[i]).then((data) => {
                res.push({status: 'fufilled',value: data
                })
            }).catch((err) => {
                res.push({status: 'rejected',value: err
                })
            }).finally(() => {
                // finally语句必定执行
                if (++count === len) {
                    resolve(res);
                }
            })
        }
    })
}

// test
const p1 = Promise.resolve('one')
const p2 = Promise.resolve('two')
const p3 = new Promise((resolve, reject) => {
    setTimeout(reject, 1000, 'three');
});

PromiseAllSettled([p1, p2, p3]).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})