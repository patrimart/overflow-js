"use strict";
var OverflowLong_1 = require("./OverflowLong");
var OverflowTyped_1 = require("./OverflowTyped");
var OverflowHashCode = (function () {
    function OverflowHashCode(_seed, _PRIME, _byteLength) {
        if (_seed === void 0) { _seed = 1; }
        if (_PRIME === void 0) { _PRIME = 31; }
        if (_byteLength === void 0) { _byteLength = 32; }
        this._seed = _seed;
        this._PRIME = _PRIME;
        this._byteLength = _byteLength;
        this.overflow = _byteLength === 32 ? new OverflowTyped_1.OverflowTyped(_seed) : new OverflowLong_1.OverflowLong(_seed);
    }
    Object.defineProperty(OverflowHashCode.prototype, "seed", {
        get: function () {
            return this._seed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverflowHashCode.prototype, "prime", {
        get: function () {
            return this._PRIME;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverflowHashCode.prototype, "byteLength", {
        get: function () {
            return this._byteLength;
        },
        enumerable: true,
        configurable: true
    });
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
            args[_i] = arguments[_i];
        }
        return new OverflowHashCode(hash.apply(void 0, [this.overflow, this.prime].concat(args)).value, this.prime, this.byteLength);
    };
    return OverflowHashCode;
}());
exports.OverflowHashCode = OverflowHashCode;
function hash(overflow, prime) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    for (var j = 0; j < args.length; j++) {
        var a = args[j];
        if (Array.isArray(a)) {
            for (var i = 0; i < a.length; i++)
                overflow = hash(overflow, prime, a[i]);
        }
        else if (typeof a === "string") {
            for (var i = 0; i < a.length; i++)
                overflow = hash(overflow, prime, a.charCodeAt(i));
        }
        else if (typeof a === "object" || typeof a === "function") {
            overflow = hash(overflow, prime, String(a));
        }
        else {
            overflow = overflow.times(prime).plus(a);
        }
    }
    return overflow;
}
//# sourceMappingURL=OverflowHashCode.js.map