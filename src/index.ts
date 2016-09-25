
import { OverflowInt } from "./OverflowInt";
import { OverflowLong } from "./OverflowLong";
import { OverflowHashCode } from "./OverflowHashCode";

/**
 * IOverflow interface.
 */
export interface IOverflow {
    value: number;
    valueOf (): number;
    plus (v: number): this;
    minus (v: number): this;
    times (v: number): this;
    divide (v: number): this;
}

/**
 * IOverflowHashCode interface.
 */
export interface IOverflowHashCode {
    value: number;
    valueOf (): number;
    of (...args: (string | number | string[] | number[])[]): this;
}


/**
 * The Overflow namespace.
 */
export namespace Overflow {

    export const Min      = () => new OverflowInt(-2147483648);
    export const Max      = () => new OverflowInt(2147483647);
    export const Zero     = () => new OverflowInt();
    export const HashCode = () => new OverflowHashCode(1, 31, true);

    export const MinLong      = () => new OverflowLong(Number.MIN_SAFE_INTEGER);
    export const MaxLong      = () => new OverflowLong(Number.MAX_SAFE_INTEGER);
    export const ZeroLong     = () => new OverflowLong();
    export const HashCodeLong = () => new OverflowHashCode(1, 31, false);

    /**
     * Helper to initialize an OverflowLong() with custom min/max limits.
     * @param {number} value - The initial value.
     * @param {number} MIN_SAFE_VALUE - The min value before overflow.
     * @param {number} MAX_SAFE_VALUE - The max value before overflow.
     * @returns {IOverflow}
     */
    export function custom (value: number, MIN_SAFE_VALUE:number, MAX_SAFE_VALUE:number): IOverflow {
        return new OverflowLong(value, MIN_SAFE_VALUE, MAX_SAFE_VALUE);
    }

    /**
     * Helper to initialize an OverflowInt().
     * @param {number} [value=0] - The initial value (must be within min/max limits).
     * @returns {IOverflow}
     */
    export function int (value?: number): IOverflow {
        return new OverflowInt(value);
    }

    /**
     * Helper to initialize an OverflowLong().
     * @param {number} [value=0] - The initial value (must be within min/max limits).
     * @returns {IOverflow}
     */
    export function long (value?: number): IOverflow {
        return new OverflowLong(value);
    }
}
