"use strict";
var OverflowInt_1 = require("./OverflowInt");
var OverflowLong_1 = require("./OverflowLong");
var OverflowHashCode = (function () {
    function OverflowHashCode(seed, PRIME, isInt) {
        if (seed === void 0) { seed = 1; }
        if (PRIME === void 0) { PRIME = 31; }
        if (isInt === void 0) { isInt = true; }
        this.PRIME = PRIME;
        this.overflow = isInt ? new OverflowInt_1.OverflowInt(seed) : new OverflowLong_1.OverflowLong(seed);
    }
    Object.defineProperty(OverflowHashCode.prototype, "value", {
        get: function () {
            return this.overflow.value;
        },
        enumerable: true,
        configurable: true
    });
    OverflowHashCode.prototype.valueOf = function () {
        return this.overflow.value;
    };
    OverflowHashCode.prototype.of = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        for (var j = 0; j < args.length; j++) {
            var a = args[j];
            if (Array.isArray(a)) {
                for (var i = 0; i < a.length; i++)
                    this.of(a[i]);
            }
            else if (typeof a === "string") {
                for (var i = 0; i < a.length; i++)
                    this.of(a.charCodeAt(i));
            }
            else if (typeof a === "object" || typeof a === "function") {
                this.of(String(a));
            }
            else {
                this.overflow.times(this.PRIME);
                this.overflow.plus(+a);
            }
        }
        return this;
    };
    return OverflowHashCode;
}());
exports.OverflowHashCode = OverflowHashCode;
//# sourceMappingURL=OverflowHashCode.js.map