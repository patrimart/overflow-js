import { IOverflow } from "./interfaces";
export declare class OverflowLong implements IOverflow<number> {
    private _value;
    private MIN_SAFE_VALUE;
    private MAX_SAFE_VALUE;
    private _minValue;
    private _maxValue;
    constructor(_value?: number, MIN_SAFE_VALUE?: number, MAX_SAFE_VALUE?: number);
    readonly value: number;
    valueOf(): number;
    readonly minValue: this;
    readonly maxValue: this;
    readonly byteLength: number;
    readonly isSigned: boolean;
    readonly isNegative: boolean;
    equals(v: number): boolean;
    lessThan(v: number): boolean;
    greaterThan(v: number): boolean;
    negate(): this;
    plus(v: number): this;
    minus(v: number): this;
    times(v: number): this;
    divide(v: number): this;
    toJSON(): number;
    private valCheck(v);
}
