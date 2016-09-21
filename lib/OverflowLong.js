"use strict";
var OverflowLong = (function () {
    function OverflowLong(_value, MIN_SAFE_VALUE, MAX_SAFE_VALUE) {
        if (_value === void 0) { _value = 0; }
        if (MIN_SAFE_VALUE === void 0) { MIN_SAFE_VALUE = Number.MIN_SAFE_INTEGER; }
        if (MAX_SAFE_VALUE === void 0) { MAX_SAFE_VALUE = Number.MAX_SAFE_INTEGER; }
        this._value = _value;
        this.MIN_SAFE_VALUE = MIN_SAFE_VALUE;
        this.MAX_SAFE_VALUE = MAX_SAFE_VALUE;
        this._value = this.valCheck(_value);
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
    OverflowLong.prototype.plus = function (v) {
        v = this.valCheck(v);
        if ((this._value >= 0 && v <= 0) || (this._value <= 0 && v >= 0)) {
            this._value = this._value + v;
            return this;
        }
        if (v >= 0) {
            var diffToMax = this.MAX_SAFE_VALUE - this._value;
            if (diffToMax >= v) {
                this._value = this._value + v;
            }
            else {
                this._value = this.MIN_SAFE_VALUE;
                this.plus(v - diffToMax - 1);
            }
        }
        else {
            var diffToMin = this.MIN_SAFE_VALUE - this._value;
            if (diffToMin <= v) {
                this._value = this._value + v;
            }
            else {
                this._value = this.MAX_SAFE_VALUE;
                this.plus(v - diffToMin + 1);
            }
        }
        return this;
    };
    OverflowLong.prototype.minus = function (v) {
        return this.plus(v * -1);
    };
    OverflowLong.prototype.times = function (v) {
        v = this.valCheck(v);
        var v2 = this._value;
        for (var i = 1; i < v; i++) {
            this.plus(v2);
        }
        return this;
    };
    OverflowLong.prototype.divide = function (v) {
        this._value = this.valCheck((this._value / this.valCheck(v)));
        return this;
    };
    OverflowLong.prototype.valCheck = function (v) {
        if (v > this.MAX_SAFE_VALUE)
            throw new RangeError("The given long greater than the MAX_SAFE_VALUE.");
        if (v < this.MIN_SAFE_VALUE)
            throw new RangeError("The given long less than the MIN_SAFE_VALUE.");
        return parseInt(v);
    };
    return OverflowLong;
}());
exports.OverflowLong = OverflowLong;
//# sourceMappingURL=OverflowLong.js.map