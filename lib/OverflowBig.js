"use strict";
var toArrayFn = Symbol("toArray");
exports.MIN_MAX_VALUES = (_a = {},
    _a[Infinity] = {
        min: Infinity,
        max: Infinity,
        umin: Infinity,
        umax: Infinity,
    },
    _a);
[64, 128, 256, 512, 1024, 2048].reduce(function (multi, bit) {
    multi = times(multi, multi);
    exports.MIN_MAX_VALUES[bit] = {
        min: negate(multi),
        max: plus(multi, new Int8Array([-1])),
        umin: new Int8Array(0),
        umax: plus(times(multi, multi), new Int8Array([-1])),
    };
    return multi;
}, new Int8Array([6, 9, 2, 7, 6, 9, 4, 9, 2, 4]));
var OverflowBig = (function () {
    function OverflowBig(_value, _byteLength, _isSigned) {
        if (_value === void 0) { _value = 0; }
        if (_byteLength === void 0) { _byteLength = 64; }
        if (_isSigned === void 0) { _isSigned = true; }
        this._value = _value;
        this._byteLength = _byteLength;
        this._isSigned = _isSigned;
        this._minValue = (_isSigned ? exports.MIN_MAX_VALUES[_byteLength].min : exports.MIN_MAX_VALUES[_byteLength].umin);
        this._maxValue = (_isSigned ? exports.MIN_MAX_VALUES[_byteLength].max : exports.MIN_MAX_VALUES[_byteLength].umax);
        if (this._value instanceof Int8Array) {
            this._words = new Int8Array(this._value);
        }
        else {
            var v = String(this._value);
            this._words = new Int8Array(String(v).length);
            var multi = 1;
            if (v[0] === '-') {
                multi = -1;
                v = v.slice(1);
            }
            var i = v.length;
            var ii = 0;
            while (--i >= 0) {
                this._words[ii++] = (parseInt(v[i]) * multi) | 0;
            }
        }
        this._words = trim(this._words);
        this._value = toString(this._words);
        this._isNegative = this._value[0] === "-";
        if (_byteLength !== Infinity) {
            _a = checkOverflow(this._words, this._minValue, this._maxValue), this._value = _a[0], this._words = _a[1];
        }
        var _a;
    }
    Object.defineProperty(OverflowBig.prototype, "byteLength", {
        get: function () {
            return this._byteLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverflowBig.prototype, "isSigned", {
        get: function () {
            return this._isSigned;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverflowBig.prototype, "isNegative", {
        get: function () {
            return this._isNegative;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverflowBig.prototype, "value", {
        get: function () {
            return String(this._value);
        },
        enumerable: true,
        configurable: true
    });
    OverflowBig.prototype.valueOf = function () {
        return this.value;
    };
    Object.defineProperty(OverflowBig.prototype, "minValue", {
        get: function () {
            if (this._minValue instanceof Int8Array) {
                this._minValue = new OverflowBig(this._minValue, this.byteLength, this.isSigned);
            }
            return this._minValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverflowBig.prototype, "maxValue", {
        get: function () {
            if (this._maxValue instanceof Int8Array) {
                this._maxValue = new OverflowBig(this._maxValue, this.byteLength, this.isSigned);
            }
            return this._maxValue;
        },
        enumerable: true,
        configurable: true
    });
    OverflowBig.prototype.plus = function (v) {
        if (typeof v === "number" || typeof v === "string") {
            v = new OverflowBig(String(v), this.byteLength, this.isSigned);
        }
        return new OverflowBig(plus(this._words, v[toArrayFn]()), this.byteLength, this.isSigned);
    };
    OverflowBig.prototype.minus = function (v) {
        if (typeof v === "number" || typeof v === "string") {
            v = new OverflowBig(String(v), this.byteLength, this.isSigned);
        }
        return new OverflowBig(minus(this._words, v[toArrayFn]()), this.byteLength, this.isSigned);
    };
    OverflowBig.prototype.times = function (v) {
        if (typeof v === "number" || typeof v === "string") {
            v = new OverflowBig(String(v), this.byteLength, this.isSigned);
        }
        return new OverflowBig(times(this._words, v[toArrayFn]()), this.byteLength, this.isSigned);
    };
    OverflowBig.prototype.divide = function (v) {
        if (typeof v === "number" || typeof v === "string") {
            v = new OverflowBig(String(v), this.byteLength, this.isSigned);
        }
        return new OverflowBig(divide(this._words, v[toArrayFn]()), this.byteLength, this.isSigned);
    };
    OverflowBig.prototype.negate = function () {
        return new OverflowBig(negate(this._words), this.byteLength, true);
    };
    OverflowBig.prototype.equals = function (v) {
        if (typeof v === "number" || typeof v === "string") {
            v = new OverflowBig(String(v), this.byteLength, this.isSigned);
        }
        return equals(this._words, v[toArrayFn]());
    };
    OverflowBig.prototype.lessThan = function (v) {
        if (typeof v === "number" || typeof v === "string") {
            v = new OverflowBig(String(v), this.byteLength, this.isSigned);
        }
        return lessThan(this._words, v[toArrayFn]());
    };
    OverflowBig.prototype.greaterThan = function (v) {
        if (typeof v === "number" || typeof v === "string") {
            v = new OverflowBig(String(v), this.byteLength, this.isSigned);
        }
        return greaterThan(this._words, v[toArrayFn]());
    };
    OverflowBig.prototype[toArrayFn] = function () {
        return this._words;
    };
    OverflowBig.prototype.toString = function () {
        return this.value;
    };
    OverflowBig.prototype.toJSON = function () {
        return this.value;
    };
    return OverflowBig;
}());
exports.OverflowBig = OverflowBig;
function checkOverflow(target, minValue, maxValue) {
    var posOne = new Int8Array([1]);
    var negOne = new Int8Array([-1]);
    while (true) {
        if (greaterThan(target, maxValue)) {
            var diff = minus(target, maxValue);
            var overflow = plus(minValue, diff);
            var overflowAdjust = plus(overflow, negOne);
            target = overflowAdjust;
        }
        else if (lessThan(target, minValue)) {
            var diff = minus(target, minValue);
            var overflow = plus(maxValue, diff);
            var overflowAdjust = plus(overflow, posOne);
            target = overflowAdjust;
        }
        else {
            break;
        }
    }
    return [toString(target), target];
}
function plus(a, b) {
    var result = new Int8Array(Math.max(a.length, b.length) + 1);
    var i = 0;
    while (a[i] !== undefined || b[i] !== undefined) {
        result[i] = (a[i] | 0) + (b[i] | 0) + result[i];
        if (result[i] > 9) {
            result[i] = result[i] % 10;
            result[i + 1] = 1;
        }
        else if (result[i] < 0) {
            result[i] += 10;
            result[i + 1]--;
        }
        i++;
    }
    return trim(normalize(result));
}
function minus(a, b) {
    return plus(a, negate(b));
}
function times(a, b) {
    var isANeg = a[a.length - 1] < 0;
    var isBNeg = b[b.length - 1] < 0;
    var finalResult = new Int8Array(Math.max(a.length, b.length) * 2 + 1);
    var ii = 0;
    while (b[ii] !== undefined) {
        var i = 0;
        var carryOver = 0;
        var result = new Int8Array(Math.max(a.length, b.length) + 2 + ii);
        while (a[i] !== undefined) {
            result[i + ii] = Math.abs(a[i] * b[ii]) + carryOver;
            if (result[i + ii] < 9 && result[i + ii] > -9) {
                carryOver = 0;
            }
            else {
                carryOver = (result[i + ii] / 10) | 0;
                result[i + ii] -= carryOver * 10;
            }
            i++;
        }
        result[i + ii] += carryOver;
        finalResult = plus(result, finalResult);
        ii++;
    }
    return trim(isANeg !== isBNeg ? negate(finalResult) : finalResult);
}
function divide(a, b) {
    var isANeg = a[a.length - 1] < 0;
    var isBNeg = b[b.length - 1] < 0;
    var zero = new Int8Array([0]);
    a = isANeg ? negate(a) : a;
    b = isBNeg ? negate(b) : b;
    var iterations = new OverflowBig(0, Infinity);
    while (greaterThan(a, zero)) {
        var multi = new Int8Array(Math.max(b.length + (a.length - b.length - 1), 1));
        multi[multi.length - 1] = 1;
        iterations = iterations.plus(toString(multi));
        a = minus(a, times(b, multi));
    }
    return trim(isANeg !== isBNeg ? negate(iterations[toArrayFn]()) : iterations[toArrayFn]());
}
function negate(a) {
    return a.map(function (v) { return -v; });
}
function equals(a, b) {
    return a.length === b.length && a.every(function (v, i) { return v === b[i]; });
}
function lessThan(a, b) {
    var isANeg = a[a.length - 1] < 0;
    var isBNeg = b[b.length - 1] < 0;
    if (isANeg && !isBNeg)
        return true;
    if (!isANeg && isBNeg)
        return false;
    if (a.length < b.length)
        return isANeg ? false : true;
    if (a.length > b.length)
        return isANeg ? true : false;
    var i = a.length - 1;
    while (a[i] !== undefined) {
        if (a[i] < b[i])
            return true;
        if (a[i] > b[i])
            return false;
        i--;
    }
    return false;
}
function greaterThan(a, b) {
    var isANeg = a[a.length - 1] < 0;
    var isBNeg = b[b.length - 1] < 0;
    if (isANeg && !isBNeg)
        return false;
    if (!isANeg && isBNeg)
        return true;
    if (a.length > b.length)
        return isANeg ? false : true;
    if (a.length < b.length)
        return isANeg ? true : false;
    var i = a.length - 1;
    while (a[i] !== undefined) {
        if (a[i] > b[i])
            return true;
        if (a[i] < b[i])
            return false;
        i--;
    }
    return false;
}
function trim(arr) {
    var end = arr.length;
    while (--end > 0 && arr[end] === 0)
        ;
    return arr.slice(0, end + 1);
}
function normalize(arr) {
    if (arr[arr.length - 1] !== -1)
        return arr;
    arr[arr.length - 1] = 0;
    arr[0] -= 10;
    if (arr[0] < -9) {
        arr[0] += 10;
        arr[1] -= 1;
    }
    for (var i = 1; i < arr.length - 1; i++) {
        arr[i] -= 9;
        if (arr[i] < -9) {
            arr[i] += 10;
            arr[i + 1] -= 1;
        }
    }
    return arr;
}
function toString(arr) {
    var result = arr[arr.length - 1] < 0 ? "-" : "";
    for (var i = arr.length - 1; i >= 0; i--)
        result += Math.abs(arr[i]);
    return result;
}
var _a;
//# sourceMappingURL=OverflowBig.js.map