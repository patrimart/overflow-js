"use strict";
var assert = require("assert");
var lib_1 = require("../lib");
describe("OverflowLong", function () {
    var v = lib_1.Overflow.MaxLong();
    it("plus and minus should overflow", function () {
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
        var v = lib_1.Overflow.long(31);
        var result = +v;
        v.times(2).divide(2);
        assert.equal(result, +v);
    });
    it("should throw RangeError", function () {
        assert.throws(function () { lib_1.Overflow.long(Number.MAX_SAFE_INTEGER + 10); });
        assert.throws(function () { lib_1.Overflow.long(Number.MIN_SAFE_INTEGER - 10); });
    });
    it("should exercise helpers", function () {
        assert.equal(lib_1.Overflow.MinLong().value, Number.MIN_SAFE_INTEGER);
        assert.equal(lib_1.Overflow.ZeroLong().value, 0);
    });
});
