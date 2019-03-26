'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./foo');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//
var person = function () {
    function person() {
        _classCallCheck(this, person);

        this.name = 'maomaomao';
    }

    _createClass(person, [{
        key: 'sayName',
        value: function sayName() {
            console.log('my name is' + this.name);
        }
    }]);

    return person;
}();

var p = new Person();
p.sayName();

new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('测试一下babel能不能转新的api Promise');
    }, 1000);
});