"use strict";
var OverflowInt = (function () {
    function OverflowInt(_value, MIN_SAFE_VALUE, MAX_SAFE_VALUE) {
        if (_value === void 0) { _value = 0; }
        if (MIN_SAFE_VALUE === void 0) { MIN_SAFE_VALUE = -2147483648; }
        if (MAX_SAFE_VALUE === void 0) { MAX_SAFE_VALUE = 2147483647; }
        this._value = _value;
        this.MIN_SAFE_VALUE = MIN_SAFE_VALUE;
        this.MAX_SAFE_VALUE = MAX_SAFE_VALUE;
        this._value = this.valCheck(this._value);
    }
    Object.defineProperty(OverflowInt.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    OverflowInt.prototype.valueOf = function () {
        return this._value;
    };
    OverflowInt.prototype.plus = function (v) {
        v = this.valCheck(v);
        this._value = (this._value + v) | 0;
        return this;
    };
    OverflowInt.prototype.minus = function (v) {
        return this.plus(v * -1);
    };
    OverflowInt.prototype.times = function (v) {
        v = this.valCheck(v);
        var v2 = this._value;
        for (var i = 1; i < v; i++) {
            this._value = (this._value + v2) | 0;
        }
        return this;
    };
    OverflowInt.prototype.divide = function (v) {
        this._value = (this._value / this.valCheck(v)) | 0;
        return this;
    };
    OverflowInt.prototype.valCheck = function (v) {
        if (v > this.MAX_SAFE_VALUE)
            throw new RangeError("The given integer is greater than the MAX_SAFE_VALUE.");
        if (v < this.MIN_SAFE_VALUE)
            throw new RangeError("The given integer is less than the MIN_SAFE_VALUE.");
        return v | 0;
    };
    return OverflowInt;
}());
exports.OverflowInt = OverflowInt;
//# sourceMappingURL=OverflowInt.js.map