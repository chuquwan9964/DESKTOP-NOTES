"use strict";
var MinClass = /** @class */ (function () {
    function MinClass() {
        this.list = [];
    }
    MinClass.prototype.add = function (value) {
        this.list.push(value);
    };
    MinClass.prototype.min = function () {
        var minNum = this.list[0];
        for (var i in this.list) {
            if (minNum > this.list[i]) {
                minNum = this.list[i];
            }
        }
        return minNum;
    };
    return MinClass;
}());
var m = new MinClass(); //实例化类 指定类的T的类型是number
m.add(1);
m.add(3);
m.add(2);
m.add(1);
m.add(5);
var m2 = new MinClass();
m2.add('f');
m2.add('c');
m2.add('d');
m2.add('b');
m2.add('a');
console.log(m.min(), m2.min());
