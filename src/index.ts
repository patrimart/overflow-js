import * as console from 'console';

import { IOverflow, IOverflowHashCode } from "./interfaces";

import { OverflowTyped }               from "./OverflowTyped";
import { OverflowBig, MIN_MAX_VALUES } from "./OverflowBig";
import { OverflowLong }                from "./OverflowLong";
import { OverflowHashCode }            from "./OverflowHashCode";
import { OverflowHashCodeBig }         from "./OverflowHashCodeBig";


/**
 * The Overflow namespace.
 */
export namespace Overflow {

    export const Zero8    = byte(0);
    export const Min8     = byte(-128);
    export const Max8     = byte(127);
    export const MaxU8    = ubyte(255);

    export const Zero16    = short(0);
    export const Min16     = short(-32768);
    export const Max16     = short(32767);
    export const MaxU16    = ushort(65535);

    export const Zero     = new OverflowTyped(0, Int32Array) as IOverflow<number>;
    export const Min      = new OverflowTyped(-2147483648, Int32Array) as IOverflow<number>;
    export const Max      = new OverflowTyped(2147483647, Int32Array) as IOverflow<number>;
    export const MaxU     = new OverflowTyped(4294967295, Uint32Array) as IOverflow<number>;
    export const HashCode = new OverflowHashCode(1, 31, 32) as IOverflowHashCode<number>;

    export const ZeroLong     = new OverflowLong(0) as IOverflow<number>;
    export const MinLong      = new OverflowLong(-9007199254740991) as IOverflow<number>;
    export const MaxLong      = new OverflowLong(9007199254740991) as IOverflow<number>;
    export const HashCodeLong = new OverflowHashCode(1, 31, 53) as IOverflowHashCode<number>;

    export const Zero64     = new OverflowBig("0", 64, true) as IOverflow<string>;
    export const Min64      = new OverflowBig(MIN_MAX_VALUES[64].min, 64, true) as IOverflow<string>;
    export const Max64      = new OverflowBig(MIN_MAX_VALUES[64].max, 64, true) as IOverflow<string>;
    export const MaxU64     = new OverflowBig(MIN_MAX_VALUES[64].umax, 64, false) as IOverflow<string>;
    export const HashCode64 = new OverflowHashCodeBig(1, 31, 64) as IOverflowHashCode<string>;

    export const Zero128    = new OverflowBig("0", 128, true) as IOverflow<string>;
    export const Min128     = new OverflowBig(MIN_MAX_VALUES[128].min, 128, true) as IOverflow<string>;
    export const Max128     = new OverflowBig(MIN_MAX_VALUES[128].max, 128, true) as IOverflow<string>;
    export const MaxU128    = new OverflowBig(MIN_MAX_VALUES[128].umax, 128, false) as IOverflow<string>;
    export const HashCode128 = new OverflowHashCodeBig(1, 31, 128) as IOverflowHashCode<string>;

    export const Zero256    = new OverflowBig("0", 256, true) as IOverflow<string>;
    export const Min256     = new OverflowBig(MIN_MAX_VALUES[256].min, 256, true) as IOverflow<string>;
    export const Max256     = new OverflowBig(MIN_MAX_VALUES[256].max, 256, true) as IOverflow<string>;
    export const MaxU256    = new OverflowBig(MIN_MAX_VALUES[256].umax, 256, false) as IOverflow<string>;
    export const HashCode256 = new OverflowHashCodeBig(1, 31, 256) as IOverflowHashCode<string>;

    export const Zero512    = new OverflowBig("0", 512, true) as IOverflow<string>;
    export const Min512     = new OverflowBig(MIN_MAX_VALUES[512].min, 512, true) as IOverflow<string>;
    export const Max512     = new OverflowBig(MIN_MAX_VALUES[512].max, 512, true) as IOverflow<string>;
    export const MaxU512    = new OverflowBig(MIN_MAX_VALUES[512].umax, 512, false) as IOverflow<string>;
    export const HashCode512 = new OverflowHashCodeBig(1, 31, 512) as IOverflowHashCode<string>;

    export const Zero1024   = new OverflowBig("0", 1024, true) as IOverflow<string>;
    export const Min1024    = new OverflowBig(MIN_MAX_VALUES[1024].min, 1024, true) as IOverflow<string>;
    export const Max1024    = new OverflowBig(MIN_MAX_VALUES[1024].max, 1024, true) as IOverflow<string>;
    export const MaxU1024   = new OverflowBig(MIN_MAX_VALUES[1024].umax, 1024, false) as IOverflow<string>;
    export const HashCode1024 = new OverflowHashCodeBig(1, 31, 1024) as IOverflowHashCode<string>;

    export const Zero2048   = new OverflowBig("0", 2048, true) as IOverflow<string>;
    export const Min2048    = new OverflowBig(MIN_MAX_VALUES[2048].min, 2048, true) as IOverflow<string>;
    export const Max2048    = new OverflowBig(MIN_MAX_VALUES[2048].max, 2048, true) as IOverflow<string>;
    export const MaxU2048   = new OverflowBig(MIN_MAX_VALUES[2048].umax, 2048, false) as IOverflow<string>;
    export const HashCode2048 = new OverflowHashCodeBig(1, 31, 2048) as IOverflowHashCode<string>;

    export const ZeroInfinity   = new OverflowBig(0, Infinity as any) as IOverflow<string>;

    /**
     * Helper to initialize an OverflowLong() with custom min/max limits. Very poor performance.
     * @param {number} value - The initial value.
     * @param {number} MIN_SAFE_VALUE - The min value before overflow.
     * @param {number} MAX_SAFE_VALUE - The max value before overflow.
     * @returns {IOverflow<number>}
     */
    export function custom (value: number, MIN_SAFE_VALUE: number, MAX_SAFE_VALUE: number): IOverflow<number> {
        return new OverflowLong(value, MIN_SAFE_VALUE, MAX_SAFE_VALUE);
    }

    /**
     * Helper to initialize an OverflowTyped().
     * @param {number} [value=0] - The initial value (must be within min/max limits).
     * @returns {IOverflow<number>}
     */
    export function byte (value = 0): IOverflow<number> {
        return new OverflowTyped(value, Int8Array);
    }

    /**
     * Helper to initialize an OverflowTyped().
     * @param {number} [value=0] - The initial value (must be within min/max limits).
     * @returns {IOverflow<number>}
     */
    export function ubyte (value = 0): IOverflow<number> {
        return new OverflowTyped(value, Uint8Array);
    }

    /**
     * Helper to initialize an OverflowTyped().
     * @param {number} [value=0] - The initial value (must be within min/max limits).
     * @returns {IOverflow<number>}
     */
    export function short (value = 0): IOverflow<number> {
        return new OverflowTyped(value, Int16Array);
    }

    /**
     * Helper to initialize an OverflowTyped().
     * @param {number} [value=0] - The initial value (must be within min/max limits).
     * @returns {IOverflow<number>}
     */
    export function ushort (value = 0): IOverflow<number> {
        return new OverflowTyped(value, Uint16Array);
    }

    /**
     * Helper to initialize an OverflowTyped().
     * @param {number} [value=0] - The initial value (must be within min/max limits).
     * @returns {IOverflow<number>}
     */
    export function int (value = 0): IOverflow<number> {
        return new OverflowTyped(value, Int32Array);
    }

    /**
     * Helper to initialize an OverflowTyped().
     * @param {number} [value=0] - The initial value (must be within min/max limits).
     * @returns {IOverflow<number>}
     */
    export function uint (value = 0): IOverflow<number> {
        return new OverflowTyped(value, Uint32Array);
    }

    /**
     * Helper to initialize an OverflowLong(). Stays within JS safe int limits.
     * @param {number} [value=0] - The initial value (must be within min/max limits).
     * @returns {IOverflow<number>}
     */
    export function long (value = 0): IOverflow<number> {
        return new OverflowLong(value);
    }

    /**
     * Helper to initialize an OverflowLong(). Stays within JS safe int limits.
     * @param {number} [value=0] - The initial value (must be within min/max limits).
     * @returns {IOverflow<number>}
     */
    export function ulong (value = 0): IOverflow<number> {
        return new OverflowLong(value, 0);
    }

    /**
     * Initialized a 64-bit overflow class.
     * @param {string|number} [value=0] - The initial value. Will overflow if out-of-bounds.
     * @returns {IOverflow<string>}
     */
    export function big64 (value: string | number = 0): IOverflow<string> {
        return new OverflowBig(value, 64, true);
    }

    /**
     * Initialized an unsigned 64-bit overflow class.
     * @param {string|number} [value=0] - The initial value. Will overflow if out-of-bounds.
     * @returns {IOverflow<string>}
     */
    export function ubig64 (value: string | number = 0): IOverflow<string> {
        return new OverflowBig(value, 64, false);
    }

    /**
     * Initialized a 128-bit overflow class.
     * @param {string|number} [value=0] - The initial value. Will overflow if out-of-bounds.
     * @returns {IOverflow<string>}
     */
    export function big128 (value: string | number = 0): IOverflow<string> {
        return new OverflowBig(value, 128, true);
    }

    /**
     * Initialized an unsigned 128-bit overflow class.
     * @param {string|number} [value=0] - The initial value. Will overflow if out-of-bounds.
     * @returns {IOverflow<string>}
     */
    export function ubig128 (value: string | number = 0): IOverflow<string> {
        return new OverflowBig(value, 128, false);
    }

    /**
     * Initialized a 256-bit overflow class.
     * @param {string|number} [value=0] - The initial value. Will overflow if out-of-bounds.
     * @returns {IOverflow<string>}
     */
    export function big256 (value: string | number = 0): IOverflow<string> {
        return new OverflowBig(value, 256, true);
    }

    /**
     * Initialized an unsigned 256-bit overflow class.
     * @param {string|number} [value=0] - The initial value. Will overflow if out-of-bounds.
     * @returns {IOverflow<string>}
     */
    export function ubig256 (value: string | number = 0): IOverflow<string> {
        return new OverflowBig(value, 256, false);
    }

    /**
     * Initialized a 512-bit overflow class.
     * @param {string|number} [value=0] - The initial value. Will overflow if out-of-bounds.
     * @returns {IOverflow<string>}
     */
    export function big512 (value: string | number = 0): IOverflow<string> {
        return new OverflowBig(value, 512, true);
    }

    /**
     * Initialized an unsigned 512-bit overflow class.
     * @param {string|number} [value=0] - The initial value. Will overflow if out-of-bounds.
     * @returns {IOverflow<string>}
     */
    export function ubig512 (value: string | number = 0): IOverflow<string> {
        return new OverflowBig(value, 512, false);
    }

    /**
     * Initialized a 1024-bit overflow class.
     * @param {string|number} [value=0] - The initial value. Will overflow if out-of-bounds.
     * @returns {IOverflow<string>}
     */
    export function big1024 (value: string | number = 0): IOverflow<string> {
        return new OverflowBig(value, 1024, true);
    }

    /**
     * Initialized an unsigned 1024-bit overflow class.
     * @param {string|number} [value=0] - The initial value. Will overflow if out-of-bounds.
     * @returns {IOverflow<string>}
     */
    export function ubig1024 (value: string | number = 0): IOverflow<string> {
        return new OverflowBig(value, 1024, false);
    }

    /**
     * Initialized a 2048-bit overflow class.
     * @param {string|number} [value=0] - The initial value. Will overflow if out-of-bounds.
     * @returns {IOverflow<string>}
     */
    export function big2048 (value: string | number = 0): IOverflow<string> {
        return new OverflowBig(value, 2048, true);
    }

    /**
     * Initialized an unsigned 2048-bit overflow class.
     * @param {string|number} [value=0] - The initial value. Will overflow if out-of-bounds.
     * @returns {IOverflow<string>}
     */
    export function ubig2048 (value: string | number = 0): IOverflow<string> {
        return new OverflowBig(value, 2048, false);
    }

    /**
     * Initialized a signed overflow class with infinite capacity.
     * @param {string|number} [value=0] - The initial value.
     * @returns {IOverflow<string>}
     */
    export function bigInfinity (value: string | number = 0): IOverflow<string> {
        return new OverflowBig(value, Infinity as any);
    }
}
