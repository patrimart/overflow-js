
import { IOverflow, IOverflowHashCode } from "./interfaces";

import { OverflowLong }  from "./OverflowLong";
import { OverflowTyped } from "./OverflowTyped";

/**
 * The OveflowHashCode class.
 */
export class OverflowHashCode implements IOverflowHashCode<number> {

    private overflow: IOverflow<number>;

    /**
     * Initializes the class.
     * @param {number} [seed=1] - the initial value.
     * @param {number} [PRIME=31] - the prime multiplier.
     * @param {number} [byteLength=32] - If true, 32-bit; else 53-bit (JS).
     */
    constructor (
        private _seed = 1,
        private _PRIME = 31,
        private _byteLength: 32 | 53 = 32,
    ) {
        this.overflow = _byteLength === 32 ? new OverflowTyped(_seed) : new OverflowLong(_seed);
    }

    public get seed () {
        return this._seed;
    }

    public get prime () {
        return this._PRIME;
    }

    public get byteLength () {
        return this._byteLength;
    }

    /**
     * Returns the current value.
     */
    public get value () {
        return this.overflow.value;
    }

    /**
     * Overrides Object.prototype.valueOf().
     * @returns {number}
     */
    public valueOf () {
        return this.overflow.value;
    }

    /**
     * Accepts primitives used to calculate the hash code.
     * @params {string | number | string[] | number[])[]} ...args - values to calculate the hash code.
     * @returns {this}
     */
    public of (...args: (string | number | string[] | number[])[]) {

        return new OverflowHashCode(hash(this.overflow, this.prime, ...args).value, this.prime, this.byteLength) as this;
    }
}


function hash (overflow: IOverflow<number>, prime: number, ...args: (string | number | string[] | number[])[]) {

    for (let j = 0; j < args.length; j++) {
        
        const a = args[j];

        if (Array.isArray(a)) {
            for (let i = 0; i < a.length; i++) overflow = hash(overflow, prime, a[i]);
        } else if (typeof a === "string") {
            for (let i = 0; i < a.length; i++) overflow = hash(overflow, prime, a.charCodeAt(i));
        } else if (typeof a === "object" || typeof a === "function") {
            overflow = hash(overflow, prime, String(a));
        } else {
            overflow = overflow.times(prime).plus(a);
        }
    }

    return overflow;
}
