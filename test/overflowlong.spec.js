"use strict";
var assert = require("assert");
var lib_1 = require("../lib");
describe("OverflowLong", function () {
    it("basic plus/minus math", function () {
        var v1 = lib_1.Overflow.long(256);
        var v1u = lib_1.Overflow.ulong(256);
        var v2 = 256;
        for (var i = 0; i < 50; i++) {
            v1 = v1.minus(3);
            v1u = v1u.minus(1);
            //console.log(v1u.value);
            v2 = v2 - 3;
            assert.equal(+v1, v2);
        }
        for (var i = 0; i < 50; i++) {
            v1 = v1.plus(3);
            v1u = v1u.plus(1);
            //console.log(v1u.value);
            v2 = v2 + 3;
            assert.equal(+v1, v2);
        }
        assert.equal(256, +v1);
        assert.equal(256, +v1u);
    });
    it("basic multiplication/division math", function () {
        var v1 = lib_1.Overflow.long(1);
        var v2 = 1;
        for (var i = 0; i < 10; i++) {
            v1 = v1.times(3);
            v2 = v2 * 3;
            assert.equal(+v1, v2);
        }
        for (var i = 0; i < 10; i++) {
            v1 = v1.divide(3);
            v2 = v2 / 3 | 0;
            assert.equal(+v1, v2);
        }
        for (var i = 0; i < 10; i++) {
            v1 = v1.times(-3);
            v2 = v2 * -3;
            assert.equal(+v1, v2);
        }
        for (var i = 0; i < 10; i++) {
            v1 = v1.divide(-3);
            v2 = v2 / -3 | 0;
            assert.equal(+v1, v2);
        }
        assert.equal(1, +v1);
    });
    it("plus and minus should overflow", function () {
        var v = lib_1.Overflow.MaxLong;
        v = v.minus(25);
        for (var i = 0; i < 50; i++) {
            v = v.plus(1);
        }
        assert.equal(+v < 0, true);
        for (var i = 0; i < 50; i++) {
            v = v.minus(1);
        }
        assert.equal(+v > 0, true);
    });
    it("times and plus should offset", function () {
        var v = lib_1.Overflow.long(31);
        var result = +v;
        v = v.times(2).divide(2);
        assert.equal(result, +v);
    });
    it("helper methods", function () {
        var a = lib_1.Overflow.long(256);
        var b = lib_1.Overflow.long(64);
        var c = lib_1.Overflow.long(-256);
        var d = lib_1.Overflow.long(-64);
        assert.equal(a.byteLength, 53);
        assert.equal(a.isSigned, true);
        assert.equal(a.isNegative, false);
        assert.equal(c.isNegative, true);
        assert.equal(a.minValue.value, Number.MIN_SAFE_INTEGER);
        assert.equal(a.maxValue.value, Number.MAX_SAFE_INTEGER);
        assert.equal(a.equals(b), false, "A");
        assert.equal(a.equals(c), false, "B");
        assert.equal(a.equals(lib_1.Overflow.long(256)), true, "C");
        assert.equal(c.equals(lib_1.Overflow.long(-256)), true, "D");
        assert.equal(a.lessThan(lib_1.Overflow.long(256)), false, "E");
        assert.equal(c.lessThan(lib_1.Overflow.long(-256)), false, "F");
        assert.equal(a.lessThan(b), false, "G");
        assert.equal(a.lessThan(c), false, "H");
        assert.equal(a.lessThan(d), false, "I");
        assert.equal(a.greaterThan(lib_1.Overflow.long(256)), false, "J");
        assert.equal(c.greaterThan(lib_1.Overflow.long(-256)), false, "K");
        assert.equal(a.greaterThan(b), true, "L");
        assert.equal(a.greaterThan(c), true, "M");
        assert.equal(a.greaterThan(d), true, "N");
        assert.equal(c.negate().equals(lib_1.Overflow.long(-256)), false, "O");
    });
    it("should throw RangeError", function () {
        assert.throws(function () { lib_1.Overflow.long(Number.MAX_SAFE_INTEGER + 10); });
        assert.throws(function () { lib_1.Overflow.long(Number.MIN_SAFE_INTEGER - 10); });
    });
    it("should exercise helpers", function () {
        assert.equal(lib_1.Overflow.MinLong.value, Number.MIN_SAFE_INTEGER);
        assert.equal(lib_1.Overflow.ZeroLong.value, 0);
    });
    it("should exercise custom", function () {
        var v = lib_1.Overflow.custom(0, -100, 100);
        v = v.plus(61).plus(61).plus(61);
        assert.equal(+v < 0, true, "A " + +v);
        v = v.minus(50).minus(50).minus(50);
        assert.equal(+v > 0, true, "B " + +v);
    });
});
