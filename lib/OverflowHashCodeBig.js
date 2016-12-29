"use strict";
var OverflowBig_1 = require("./OverflowBig");
var OverflowHashCodeBig = (function () {
    function OverflowHashCodeBig(_seed, _PRIME, _byteLength) {
        if (_seed === void 0) { _seed = 1; }
        if (_PRIME === void 0) { _PRIME = 31; }
        if (_byteLength === void 0) { _byteLength = 64; }
        this._seed = _seed;
        this._PRIME = _PRIME;
        this._byteLength = _byteLength;
        this.overflow = new OverflowBig_1.OverflowBig(_seed, _byteLength);
    }
    Object.defineProperty(OverflowHashCodeBig.prototype, "seed", {
        get: function () {
            return String(this._seed);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverflowHashCodeBig.prototype, "prime", {
        get: function () {
            return this._PRIME;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverflowHashCodeBig.prototype, "byteLength", {
        get: function () {
            return this._byteLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverflowHashCodeBig.prototype, "value", {
        get: function () {
            return this.overflow.value;
        },
        enumerable: true,
        configurable: true
    });
    OverflowHashCodeBig.prototype.valueOf = function () {
        return this.overflow.value;
    };
    OverflowHashCodeBig.prototype.of = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new OverflowHashCodeBig(hash.apply(void 0, [this.overflow, this.prime].concat(args)).value, this.prime, this.byteLength);
    };
    return OverflowHashCodeBig;
}());
exports.OverflowHashCodeBig = OverflowHashCodeBig;
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
//# sourceMappingURL=OverflowHashCodeBig.js.map