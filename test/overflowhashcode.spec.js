"use strict";
var assert = require("assert");
var _1 = require("../lib/");
describe("OverflowHashCode", function () {
    it("int should hash", function () {
        var hashCode = _1.Overflow.HashCode;
        assert.equal(hashCode.seed, 1);
        hashCode = hashCode.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"]);
        assert.equal(hashCode.valueOf(), _1.Overflow.HashCode.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value);
    });
    it("long should hash", function () {
        var hashCode = _1.Overflow.HashCodeLong;
        hashCode = hashCode.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"]);
        assert.equal(hashCode.valueOf(), _1.Overflow.HashCodeLong.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value);
    });
    it("big64 should hash", function () {
        var hashCode = _1.Overflow.HashCode64;
        assert.equal(hashCode.seed, 1);
        hashCode = hashCode.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"]);
        assert.equal(hashCode.valueOf(), _1.Overflow.HashCode64.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value);
    });
    it("bign should hash", function () {
        assert.equal(_1.Overflow.HashCode128.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"]).valueOf(), _1.Overflow.HashCode128.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value, "Overflow.HashCode128");
        assert.equal(_1.Overflow.HashCode256.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"]).value, _1.Overflow.HashCode256.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value, "Overflow.HashCode256");
        assert.equal(_1.Overflow.HashCode512.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"]).value, _1.Overflow.HashCode512.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value, "Overflow.HashCode512");
        assert.equal(_1.Overflow.HashCode1024.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"]).value, _1.Overflow.HashCode1024.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value, "Overflow.HashCode1024");
        assert.equal(_1.Overflow.HashCode2048.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"]).value, _1.Overflow.HashCode2048.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value, "Overflow.HashCode2048");
    });
});
