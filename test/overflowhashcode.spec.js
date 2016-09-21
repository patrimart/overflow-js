"use strict";
var assert = require("assert");
var lib_1 = require("../lib");
var OverflowHashCode_1 = require("../lib/OverflowHashCode");
describe("OverflowHashCode", function () {
    it("int should hash", function () {
        var hashCode = lib_1.Overflow.HashCode();
        hashCode.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"]);
        assert.equal(+hashCode, lib_1.Overflow.HashCode().of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value);
    });
    it("long should hash", function () {
        var hashCode = lib_1.Overflow.HashCodeLong();
        assert.equal(+hashCode, new OverflowHashCode_1.OverflowHashCode());
        hashCode.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"]);
        assert.equal(+hashCode, lib_1.Overflow.HashCodeLong().of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value);
    });
});
