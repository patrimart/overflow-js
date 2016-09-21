
import { IOverflow }    from "./index";
import { OverflowInt }  from "./OverflowInt";
import { OverflowLong } from "./OverflowLong";

/**
 * The OveflowHashCode class.
 */
export class OverflowHashCode {

    private overflow: IOverflow;

    /**
     * Initializes the class.
     * @param {number} [seed=1] - the initial value.
     * @param {number} [PRIME=31] - the prime multiplier.
     * @param {number} [isInt=true] - If true, 32-bit; else 64-bit.
     */
    constructor (
        seed = 1,
        private PRIME = 31,
        isInt = true
    ) {
        this.overflow = isInt ? new OverflowInt(seed) : new OverflowLong(seed);
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

        for (let j = 0; j < args.length; j++) {
            
            const a = args[j];

            if (Array.isArray(a)) {
                for (let i = 0; i < a.length; i++) this.of(a[i]);
            } else if (typeof a === "string") {
                for (let i = 0; i < a.length; i++) this.of(a.charCodeAt(i));
            } else {
                this.overflow.times(this.PRIME);
                this.overflow.plus(+a);
            }
        }

        return this;
    }
}
