import * as console from 'console';

import { IOverflow } from "./interfaces";

/**
 * The OverflowLong class implements IOverflow.
 */
export class OverflowLong implements IOverflow<number> {

    private _minValue: this;
    private _maxValue: this;

    constructor (
        private _value = 0,
        private MIN_SAFE_VALUE = -9007199254740991,
        private MAX_SAFE_VALUE = 9007199254740991,
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
     */
    public valueOf () {
        return this._value;
    }


    public get minValue () {
        if (this._minValue === undefined) {
            this._minValue = new OverflowLong(this.MIN_SAFE_VALUE, this.MIN_SAFE_VALUE, this.MAX_SAFE_VALUE) as this;
        }
        return this._minValue;
    }

    public get maxValue () {
        if (this._maxValue === undefined) {
            this._maxValue = new OverflowLong(this.MAX_SAFE_VALUE, this.MIN_SAFE_VALUE, this.MAX_SAFE_VALUE) as this;
        }
        return this._maxValue;
    }


    public get byteLength (): number {
        return 53;
    }

    public get isSigned (): boolean {
        return true;
    }

    public get isNegative (): boolean {
        return this._value < 0;
    }


    public equals (v: number): boolean {
        return this._value === +v;
    }

    public lessThan (v: number): boolean {
        return this._value < +v;
    }

    public greaterThan (v: number): boolean {
        return this._value > +v;
    }

    
    public negate () {
        return new OverflowLong(this._value * -1, this.MIN_SAFE_VALUE, this.MAX_SAFE_VALUE) as this;
    }


    /**
     * Adds the given value.
     */
    public plus (v: number) {

        return new OverflowLong(plus(this._value, v, this.MIN_SAFE_VALUE, this.MAX_SAFE_VALUE), this.MIN_SAFE_VALUE, this.MAX_SAFE_VALUE) as this;
    }

    /**
     * Subtracts the given value.
     */
    public minus (v: number) {
        return this.plus(+v * -1);
    }

    /**
     * Multiplies the given value.
     */
    public times (v: number) {
        let iterations = this.valCheck(Math.abs(v));
        let val = Math.abs(this._value);
        let total = 0;
        while (--iterations >= 0) {
            total = plus(val, total, this.MIN_SAFE_VALUE, this.MAX_SAFE_VALUE);
        }
        const multi = (v < 0 && this._value >= 0) || (v >= 0 && this._value < 0) ? -1 : 1;
        return new OverflowLong(total * multi, this.MIN_SAFE_VALUE, this.MAX_SAFE_VALUE) as this;
    }

    /**
     * Divides the given value.
     */
    public divide (v: number) {
        return new OverflowLong(this.valCheck(this._value / this.valCheck(v)), this.MIN_SAFE_VALUE, this.MAX_SAFE_VALUE) as this;
    }

    public toJSON () {
        return this.value;
    }

    private valCheck (v: number) {
        if (v > this.MAX_SAFE_VALUE) throw new RangeError(`The given long (${v}) is greater than the MAX_SAFE_VALUE (${this.MAX_SAFE_VALUE}).`);
        if (v < this.MIN_SAFE_VALUE) throw new RangeError(`The given long (${v}) is less than the MIN_SAFE_VALUE (${this.MIN_SAFE_VALUE}).`);
        return parseInt(v as any);
    }
}


function plus (val: number, v: number, MIN_SAFE_VALUE: number, MAX_SAFE_VALUE: number) {

    // Neg + Pos OR Pos + Neg cannot overflow.
    if ((val >= 0 && v <= 0) || (val <= 0 && v >= 0)) {
        val += v;
        return val;
    }

    if (v >= 0) {

        const diffToMax = MAX_SAFE_VALUE - val;

        if (diffToMax >= v) {
            val += v;
        } else {
            val = MIN_SAFE_VALUE;
            val = plus(val, v - diffToMax - 1, MIN_SAFE_VALUE, MAX_SAFE_VALUE);
        }

    } else {

        const diffToMin = MIN_SAFE_VALUE - val;

        if (diffToMin <= v) {
            val += v;
        } else {
            val = MAX_SAFE_VALUE;
            val = plus(val, v - diffToMin + 1, MIN_SAFE_VALUE, MAX_SAFE_VALUE);
        }
    }

    return val;
}
