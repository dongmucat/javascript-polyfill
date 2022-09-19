/**
 * Object.create其实就是原型式继承
 */

Object.prototype.myCreate = function (o) {
    function f(){};
    f.prototype = o;
    return new f();
}

// test
const Person = {
    name:"xixixi",
    age:18
}

const p = Object.myCreate(Person);
console.log(p.name)//xixixi
console.log(Person.isPrototypeOf(p))//true
