"use strict";
var assert = require("assert");
var lib_1 = require("../lib");
describe("OverflowInt", function () {
    it("plus and minus should overflow", function () {
        var v = lib_1.Overflow.Max();
        v.minus(25);
        for (var i = 0; i < 50; i++) {
            v.plus(1);
        }
        assert.equal(+v < 0, true);
        for (var i = 0; i < 50; i++) {
            v.minus(1);
        }
        assert.equal(+v > 0, true);
    });
    it("times and plus should offset", function () {
        var v = lib_1.Overflow.int(31);
        v.times(31).times(31).times(31).times(31).times(31).times(31);
        v.divide(31);
        var result = +v;
        v.times(2).divide(2);
        assert.equal(result, +v);
    });
    it("should throw RangeError", function () {
        assert.throws(function () { lib_1.Overflow.int(Number.MAX_SAFE_INTEGER); });
        assert.throws(function () { lib_1.Overflow.int(Number.MIN_SAFE_INTEGER); });
    });
    it("should exercise helpers", function () {
        assert.equal(lib_1.Overflow.Min().value, -2147483648);
        assert.equal(lib_1.Overflow.Zero().value, 0);
    });
    it("should exercise custom", function () {
        var v = lib_1.Overflow.custom(0, -100, 100);
        v.plus(61).plus(61).plus(61);
        assert.equal(+v < 0, true);
        v.minus(50).minus(50).minus(50);
        assert.equal(+v > 0, true);
    });
});
