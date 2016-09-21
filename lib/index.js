"use strict";
var OverflowInt_1 = require("./OverflowInt");
var OverflowLong_1 = require("./OverflowLong");
var OverflowHashCode_1 = require("./OverflowHashCode");
var Overflow;
(function (Overflow) {
    Overflow.Min = function () { return new OverflowInt_1.OverflowInt(-2147483648); };
    Overflow.Max = function () { return new OverflowInt_1.OverflowInt(2147483647); };
    Overflow.Zero = function () { return new OverflowInt_1.OverflowInt(); };
    Overflow.HashCode = function () { return new OverflowHashCode_1.OverflowHashCode(1, 31, true); };
    Overflow.MinLong = function () { return new OverflowLong_1.OverflowLong(Number.MIN_SAFE_INTEGER); };
    Overflow.MaxLong = function () { return new OverflowLong_1.OverflowLong(Number.MAX_SAFE_INTEGER); };
    Overflow.ZeroLong = function () { return new OverflowLong_1.OverflowLong(); };
    Overflow.HashCodeLong = function () { return new OverflowHashCode_1.OverflowHashCode(1, 31, false); };
    function custom(value, MIN_SAFE_VALUE, MAX_SAFE_VALUE) {
        return new OverflowLong_1.OverflowLong(value, MIN_SAFE_VALUE, MAX_SAFE_VALUE);
    }
    Overflow.custom = custom;
    function int(value) {
        return new OverflowInt_1.OverflowInt(value);
    }
    Overflow.int = int;
    function long(value) {
        return new OverflowLong_1.OverflowLong(value);
    }
    Overflow.long = long;
})(Overflow = exports.Overflow || (exports.Overflow = {}));
//# sourceMappingURL=index.js.map