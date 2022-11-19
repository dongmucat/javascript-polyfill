function myInstanceOf(L, R) {
    //取得右边表达式的原型
    let O = R.prototype;
    //取得左边的下一个原型
    //实例对象可以通过__proto__访问原型对象
    //函数对象可以通过prototype访问原型对象；
    L = L.__proto__
    //死循环
    while (1) {
        //需要严格等于
        if (L === O) {
            return true;
        }
        //注意此处， Object.prototype.proto 属性在未修改的情况下为 null 值
        if (L === null) {
            return false;
        }
        //取得左边的下一个原型
        L = L.__proto__
    }
}