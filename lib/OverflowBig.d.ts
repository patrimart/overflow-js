import { IOverflow } from "./interfaces";
export declare const MIN_MAX_VALUES: {
    [bit: number]: {
        min: Int8Array | number;
        max: Int8Array | number;
        umin: Int8Array | number;
        umax: Int8Array | number;
    };
};
export declare class OverflowBig implements IOverflow<string> {
    private _value;
    private _byteLength;
    private _isSigned;
    private _words;
    private _isNegative;
    private _minValue;
    private _maxValue;
    constructor(_value?: Int8Array | string | number, _byteLength?: 64 | 128 | 256 | 512 | 1024 | 2048, _isSigned?: boolean);
    readonly byteLength: (64 | 128 | 256 | 512 | 1024 | 2048) & number;
    readonly isSigned: boolean;
    readonly isNegative: boolean;
    readonly value: string;
    valueOf(): string;
    readonly minValue: this;
    readonly maxValue: this;
    plus(v: this | number | string): this;
    minus(v: this | number | string): this;
    times(v: this | number | string): this;
    divide(v: this | number | string): this;
    negate(): this;
    equals(v: this | number | string): boolean;
    lessThan(v: this | number | string): boolean;
    greaterThan(v: this | number | string): boolean;
    toString(): string;
    toJSON(): string;
}
