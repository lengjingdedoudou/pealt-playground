/**
 *  用defineProperty模拟响应式编程
 *  但是当我们删除obj的count属性的时候，set函数就不会执行，double还是
 *  之前的值，也是为什么在vue2中，我们需要$delete一个专门的函数去删除数据
 */
let getDouble = (n) => n * 2;

let obj = {};
let count = 1;
let double = getDouble(count);

// Object.defineProperty(obj, 'count', {
//     get() {
//         return count;
//     },
//     set(val) {
//         count = val;
//         double = getDouble(val);
//     },
// });

// console.log(double);
// obj.count = 2;
// console.log(double);

/**
 * Proxy是v3实现响应式编程所使用的，他解决了删除的时候不能响应的问题
 */

let proxy = new Proxy(obj, {
    get: function (target, prop) {
        return target[prop];
    },
    set: function (target, prop, value) {
        target[prop] = value;
        if (prop === 'count') {
            double = getDouble(value);
        }
    },
    deleteProperty: function (target, prop) {
        delete target[prop];
        if (prop === 'count') {
            double = NaN;
        }
    },
});

console.log(obj.count, double);
proxy.count = 2;
console.log(obj.count, double);
delete proxy.count;
console.log(obj.count, double);
