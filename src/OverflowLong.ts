
import { IOverflow } from "./index";

/**
 * The OverflowLong class implements IOverflow.
 */
export class OverflowLong implements IOverflow {

    constructor (
        private _value = 0,
        private MIN_SAFE_VALUE = Number.MIN_SAFE_INTEGER,
        private MAX_SAFE_VALUE = Number.MAX_SAFE_INTEGER
    ) {
        this._value = this.valCheck(_value);
    }

    /**
     * Returns the current value.
     */
    public get value () {
        return this._value;
    }

    /**
     * Overrides Object.prototype.valueOf().
     * @returns {number}
     */
    public valueOf () {
        return this._value;
    }

    /**
     * Adds the given value.
     * @param {number} v - the value to add.
     * @returns {this}
     */
    public plus (v: number) {

        v = this.valCheck(v);

        // Neg + Pos OR Pos + Neg cannot overflow.
        if ((this._value >= 0 && v <= 0) || (this._value <= 0 && v >= 0)) {
            this._value = this._value + v;
            return this;
        }

        if (v >= 0) {

            const diffToMax = this.MAX_SAFE_VALUE - this._value;

            if (diffToMax >= v) {
                this._value = this._value + v;
            } else {
                this._value = this.MIN_SAFE_VALUE;
                this.plus(v - diffToMax - 1);
            }

        } else {

            const diffToMin = this.MIN_SAFE_VALUE - this._value;

            if (diffToMin <= v) {
                this._value = this._value + v;
            } else {
                this._value = this.MAX_SAFE_VALUE;
                this.plus(v - diffToMin + 1);
            }
        }

        return this;
    }

    /**
     * Subtracts the given value.
     * @param {number} v - the value to subtract.
     * @returns {this}
     */
    public minus (v: number) {
        return this.plus(v * -1);
    }

    /**
     * Multiplies the given value.
     * @param {number} v - the value to multiply.
     * @returns {this}
     */
    public times (v: number) {
        v = this.valCheck(v);
        const v2 = this._value;
        for (let i = 1; i < v; i++) {
            this.plus(v2);
        }
        return this;
    }

    /**
     * Divides the given value.
     * @param {number} v - the value to divide.
     * @returns {this}
     */
    public divide (v: number) {
        this._value = this.valCheck((this._value / this.valCheck(v)));
        return this;
    }

    private valCheck (v: number) {
        if (v > this.MAX_SAFE_VALUE) throw new RangeError("The given long greater than the MAX_SAFE_VALUE.");
        if (v < this.MIN_SAFE_VALUE) throw new RangeError("The given long less than the MIN_SAFE_VALUE.");
        return parseInt(v as any);
    }
}
