import { IOverflow } from "./interfaces";
export declare type TypedArrayConstructor = Int8ArrayConstructor | Uint8ArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor;
export declare class OverflowTyped implements IOverflow<number> {
    private arrayConstructor;
    private _value;
    private _byteLength;
    private _isSigned;
    private _minValue;
    private _maxValue;
    constructor(value?: number, arrayConstructor?: TypedArrayConstructor);
    readonly value: any;
    valueOf(): any;
    readonly minValue: this;
    readonly maxValue: this;
    readonly byteLength: number;
    readonly isSigned: boolean;
    readonly isNegative: boolean;
    equals(v: number | this): boolean;
    lessThan(v: number | this): boolean;
    greaterThan(v: number | this): boolean;
    negate(): this;
    plus(v: number | this): this;
    minus(v: number | this): this;
    times(v: number | this): this;
    divide(v: number | this): this;
    toString(): string;
    toJSON(): any;
}
