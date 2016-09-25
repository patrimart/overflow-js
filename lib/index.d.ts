import { OverflowInt } from "./OverflowInt";
import { OverflowLong } from "./OverflowLong";
import { OverflowHashCode } from "./OverflowHashCode";
export interface IOverflow {
    value: number;
    valueOf(): number;
    plus(v: number): this;
    minus(v: number): this;
    times(v: number): this;
    divide(v: number): this;
}
export interface IOverflowHashCode {
    value: number;
    valueOf(): number;
    of(...args: (string | number | string[] | number[])[]): this;
}
export declare namespace Overflow {
    const Min: () => OverflowInt;
    const Max: () => OverflowInt;
    const Zero: () => OverflowInt;
    const HashCode: () => OverflowHashCode;
    const MinLong: () => OverflowLong;
    const MaxLong: () => OverflowLong;
    const ZeroLong: () => OverflowLong;
    const HashCodeLong: () => OverflowHashCode;
    function custom(value: number, MIN_SAFE_VALUE: number, MAX_SAFE_VALUE: number): IOverflow;
    function int(value?: number): IOverflow;
    function long(value?: number): IOverflow;
}
