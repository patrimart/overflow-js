
import { IOverflow } from "./index";

/**
 * The OverflowInt class implements the IOverflow interface.
 */
export class OverflowInt implements IOverflow {

    constructor (
        private _value = 0,
        private MIN_SAFE_VALUE = -2147483648,
        private MAX_SAFE_VALUE = 2147483647
    ) {
        this._value = this.valCheck(this._value);
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
        this._value = (this._value + v) | 0;
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
            this._value = (this._value + v2) | 0;
        }
        return this;
    }

    /**
     * Divides the given value.
     * @param {number} v - the value to divide.
     * @returns {this}
     */
    public divide (v: number) {
        this._value = (this._value / this.valCheck(v)) | 0;
        return this;
    }


    private valCheck (v: number) {
        if (v > this.MAX_SAFE_VALUE) throw new RangeError("The given integer is greater than the MAX_SAFE_VALUE.");
        if (v < this.MIN_SAFE_VALUE) throw new RangeError("The given integer is less than the MIN_SAFE_VALUE.");
        return v | 0;
    }
}
