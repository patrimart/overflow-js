
import { IOverflow } from "./interfaces";

export type TypedArrayConstructor = Int8ArrayConstructor | Uint8ArrayConstructor |
                                    Int16ArrayConstructor | Uint16ArrayConstructor |
                                    Int32ArrayConstructor | Uint32ArrayConstructor;

/**
 * The immutable OverflowTyped class implements the IOverflow interface.
 */
export class OverflowTyped implements IOverflow<number> {

    private _value: any;
    private _byteLength: number;
    private _isSigned: boolean;
    private _minValue: OverflowTyped;
    private _maxValue: OverflowTyped;

    constructor (
        value = 0,
        private arrayConstructor: TypedArrayConstructor = Int32Array,
    ) {
        this._value = new arrayConstructor(1);
        this._value[0] = value;
        this._isSigned = this._value instanceof Int8Array || this._value instanceof Int16Array || this._value instanceof Int32Array;

        if (this._value instanceof Int8Array || this._value instanceof Uint8Array) {
            this._byteLength = 8;
        } else if (this._value instanceof Int16Array || this._value instanceof Uint16Array) {
            this._byteLength = 16;
        } else {
            this._byteLength = 32;
        }
    }

    /**
     * Returns the current value.
     */
    public get value () {
        return this._value[0];
    }

    /**
     * Overrides Object.prototype.valueOf().
     * @returns {number}
     */
    public valueOf () {
        return this.value;
    }


    public get minValue () {
        if (this._minValue === undefined) {
            this._minValue = this._isSigned ? new OverflowTyped(-Math.pow(2, this._byteLength-1), this.arrayConstructor) : new OverflowTyped(0, this.arrayConstructor);
        }
        return this._minValue as this;
    }

    public get maxValue () {
        if (this._maxValue === undefined) {
            this._maxValue = this._isSigned ? new OverflowTyped(Math.pow(2, this._byteLength-1)-1, this.arrayConstructor) : new OverflowTyped(Math.pow(2, this._byteLength), this.arrayConstructor);
        }
        return this._maxValue as this;
    }


    public get byteLength (): number {
        return this._byteLength;
    }

    public get isSigned (): boolean {
        return this._isSigned;
    }

    public get isNegative (): boolean {
        return this.value < 0;
    }


    public equals (v: number | this): boolean {
        return this.value === +v;
    }

    public lessThan (v: number | this): boolean {
        return this.value < +v;
    }

    public greaterThan (v: number | this): boolean {
        return this.value > +v;
    }

    
    public negate () {
        return new OverflowTyped(+this.value * -1, this.arrayConstructor) as this;
    }

    /**
     * Adds the given value.
     * @param {number} v - the value to add.
     * @returns {this}
     */
    public plus (v: number | this) {
        return new OverflowTyped(this.value + v, this.arrayConstructor) as this;
    }

    /**
     * Subtracts the given value.
     * @param {number} v - the value to subtract.
     * @returns {this}
     */
    public minus (v: number | this) {
        return new OverflowTyped(this.value - +v, this.arrayConstructor) as this;
    }

    /**
     * Multiplies the given value.
     * @param {number} v - the value to multiply.
     * @returns {this}
     */
    public times (v: number | this) {
        return new OverflowTyped(this.value * +v, this.arrayConstructor) as this;
    }

    /**
     * Divides the given value.
     * @param {number} v - the value to divide.
     * @returns {this}
     */
    public divide (v: number | this) {
        return new OverflowTyped(this.value / +v, this.arrayConstructor) as this;
    }

    public toString () {
        return String(this.value);
    }

    public toJSON () {
        return this.value;
    }
}
