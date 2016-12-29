
import { IOverflow, IOverflowHashCode } from "./interfaces";

import { OverflowBig }  from "./OverflowBig";

/**
 * The OveflowHashCode class.
 */
export class OverflowHashCodeBig implements IOverflowHashCode<string> {

    private overflow: IOverflow<string>;

    /**
     * Initializes the class.
     * @param {number} [_seed=1] - the initial value.
     * @param {number} [_PRIME=31] - the prime multiplier.
     * @param {64 | 128 | 256 | 512 | 1024 | 2048} [_byteLength=64] - The byte length.
     */
    constructor (
        private _seed: number | string = 1,
        private _PRIME = 31,
        private _byteLength: 64 | 128 | 256 | 512 | 1024 | 2048 = 64,
    ) {
        this.overflow = new OverflowBig(_seed, _byteLength);
    }

    public get seed () {
        return String(this._seed);
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

        return new OverflowHashCodeBig(hash(this.overflow, this.prime, ...args).value, this.prime, this.byteLength) as this;
    }
}


function hash (overflow: IOverflow<string>, prime: number, ...args: (string | number | string[] | number[])[]) {

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
