"use strict";
var OverflowLong = (function () {
    function OverflowLong(_value, MIN_SAFE_VALUE, MAX_SAFE_VALUE) {
        if (_value === void 0) { _value = 0; }
        if (MIN_SAFE_VALUE === void 0) { MIN_SAFE_VALUE = -9007199254740991; }
        if (MAX_SAFE_VALUE === void 0) { MAX_SAFE_VALUE = 9007199254740991; }
        this._value = _value;
        this.MIN_SAFE_VALUE = MIN_SAFE_VALUE;
        this.MAX_SAFE_VALUE = MAX_SAFE_VALUE;
        this._value = this.valCheck(this._value);
    }
    Object.defineProperty(OverflowLong.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    OverflowLong.prototype.valueOf = function () {
        return this._value;
    };
    Object.defineProperty(OverflowLong.prototype, "minValue", {
        get: function () {
            if (this._minValue === undefined) {
                this._minValue = new OverflowLong(this.MIN_SAFE_VALUE, this.MIN_SAFE_VALUE, this.MAX_SAFE_VALUE);
            }
            return this._minValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverflowLong.prototype, "maxValue", {
        get: function () {
            if (this._maxValue === undefined) {
                this._maxValue = new OverflowLong(this.MAX_SAFE_VALUE, this.MIN_SAFE_VALUE, this.MAX_SAFE_VALUE);
            }
            return this._maxValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverflowLong.prototype, "byteLength", {
        get: function () {
            return 53;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverflowLong.prototype, "isSigned", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverflowLong.prototype, "isNegative", {
        get: function () {
            return this._value < 0;
        },
        enumerable: true,
        configurable: true
    });
    OverflowLong.prototype.equals = function (v) {
        return this._value === +v;
    };
    OverflowLong.prototype.lessThan = function (v) {
        return this._value < +v;
    };
    OverflowLong.prototype.greaterThan = function (v) {
        return this._value > +v;
    };
    OverflowLong.prototype.negate = function () {
        return new OverflowLong(this._value * -1, this.MIN_SAFE_VALUE, this.MAX_SAFE_VALUE);
    };
    OverflowLong.prototype.plus = function (v) {
        return new OverflowLong(plus(this._value, v, this.MIN_SAFE_VALUE, this.MAX_SAFE_VALUE), this.MIN_SAFE_VALUE, this.MAX_SAFE_VALUE);
    };
    OverflowLong.prototype.minus = function (v) {
        return this.plus(+v * -1);
    };
    OverflowLong.prototype.times = function (v) {
        var iterations = this.valCheck(Math.abs(v));
        var val = Math.abs(this._value);
        var total = 0;
        while (--iterations >= 0) {
            total = plus(val, total, this.MIN_SAFE_VALUE, this.MAX_SAFE_VALUE);
        }
        var multi = (v < 0 && this._value >= 0) || (v >= 0 && this._value < 0) ? -1 : 1;
        return new OverflowLong(total * multi, this.MIN_SAFE_VALUE, this.MAX_SAFE_VALUE);
    };
    OverflowLong.prototype.divide = function (v) {
        return new OverflowLong(this.valCheck(this._value / this.valCheck(v)), this.MIN_SAFE_VALUE, this.MAX_SAFE_VALUE);
    };
    OverflowLong.prototype.toJSON = function () {
        return this.value;
    };
    OverflowLong.prototype.valCheck = function (v) {
        if (v > this.MAX_SAFE_VALUE)
            throw new RangeError("The given long (" + v + ") is greater than the MAX_SAFE_VALUE (" + this.MAX_SAFE_VALUE + ").");
        if (v < this.MIN_SAFE_VALUE)
            throw new RangeError("The given long (" + v + ") is less than the MIN_SAFE_VALUE (" + this.MIN_SAFE_VALUE + ").");
        return parseInt(v);
    };
    return OverflowLong;
}());
exports.OverflowLong = OverflowLong;
function plus(val, v, MIN_SAFE_VALUE, MAX_SAFE_VALUE) {
    if ((val >= 0 && v <= 0) || (val <= 0 && v >= 0)) {
        val += v;
        return val;
    }
    if (v >= 0) {
        var diffToMax = MAX_SAFE_VALUE - val;
        if (diffToMax >= v) {
            val += v;
        }
        else {
            val = MIN_SAFE_VALUE;
            val = plus(val, v - diffToMax - 1, MIN_SAFE_VALUE, MAX_SAFE_VALUE);
        }
    }
    else {
        var diffToMin = MIN_SAFE_VALUE - val;
        if (diffToMin <= v) {
            val += v;
        }
        else {
            val = MAX_SAFE_VALUE;
            val = plus(val, v - diffToMin + 1, MIN_SAFE_VALUE, MAX_SAFE_VALUE);
        }
    }
    return val;
}
//# sourceMappingURL=OverflowLong.js.map