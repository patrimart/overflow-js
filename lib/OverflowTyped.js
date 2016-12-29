"use strict";
var OverflowTyped = (function () {
    function OverflowTyped(value, arrayConstructor) {
        if (value === void 0) { value = 0; }
        if (arrayConstructor === void 0) { arrayConstructor = Int32Array; }
        this.arrayConstructor = arrayConstructor;
        this._value = new arrayConstructor(1);
        this._value[0] = value;
        this._isSigned = this._value instanceof Int8Array || this._value instanceof Int16Array || this._value instanceof Int32Array;
        if (this._value instanceof Int8Array || this._value instanceof Uint8Array) {
            this._byteLength = 8;
        }
        else if (this._value instanceof Int16Array || this._value instanceof Uint16Array) {
            this._byteLength = 16;
        }
        else {
            this._byteLength = 32;
        }
    }
    Object.defineProperty(OverflowTyped.prototype, "value", {
        get: function () {
            return this._value[0];
        },
        enumerable: true,
        configurable: true
    });
    OverflowTyped.prototype.valueOf = function () {
        return this.value;
    };
    Object.defineProperty(OverflowTyped.prototype, "minValue", {
        get: function () {
            if (this._minValue === undefined) {
                this._minValue = this._isSigned ? new OverflowTyped(-Math.pow(2, this._byteLength - 1), this.arrayConstructor) : new OverflowTyped(0, this.arrayConstructor);
            }
            return this._minValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverflowTyped.prototype, "maxValue", {
        get: function () {
            if (this._maxValue === undefined) {
                this._maxValue = this._isSigned ? new OverflowTyped(Math.pow(2, this._byteLength - 1) - 1, this.arrayConstructor) : new OverflowTyped(Math.pow(2, this._byteLength), this.arrayConstructor);
            }
            return this._maxValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverflowTyped.prototype, "byteLength", {
        get: function () {
            return this._byteLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverflowTyped.prototype, "isSigned", {
        get: function () {
            return this._isSigned;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverflowTyped.prototype, "isNegative", {
        get: function () {
            return this.value < 0;
        },
        enumerable: true,
        configurable: true
    });
    OverflowTyped.prototype.equals = function (v) {
        return this.value === +v;
    };
    OverflowTyped.prototype.lessThan = function (v) {
        return this.value < +v;
    };
    OverflowTyped.prototype.greaterThan = function (v) {
        return this.value > +v;
    };
    OverflowTyped.prototype.negate = function () {
        return new OverflowTyped(+this.value * -1, this.arrayConstructor);
    };
    OverflowTyped.prototype.plus = function (v) {
        return new OverflowTyped(this.value + v, this.arrayConstructor);
    };
    OverflowTyped.prototype.minus = function (v) {
        return new OverflowTyped(this.value - +v, this.arrayConstructor);
    };
    OverflowTyped.prototype.times = function (v) {
        return new OverflowTyped(this.value * +v, this.arrayConstructor);
    };
    OverflowTyped.prototype.divide = function (v) {
        return new OverflowTyped(this.value / +v, this.arrayConstructor);
    };
    OverflowTyped.prototype.toString = function () {
        return String(this.value);
    };
    OverflowTyped.prototype.toJSON = function () {
        return this.value;
    };
    return OverflowTyped;
}());
exports.OverflowTyped = OverflowTyped;
//# sourceMappingURL=OverflowTyped.js.map