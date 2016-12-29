import * as console from 'console';

import { IOverflow } from "./interfaces";

const toArrayFn = Symbol("toArray");

export const MIN_MAX_VALUES: { [bit: number]: { min: Int8Array | number; max: Int8Array | number; umin: Int8Array | number; umax: Int8Array | number; } } = {
    [Infinity]: {
        min: Infinity,
        max: Infinity,
        umin: Infinity,
        umax: Infinity,
    }
};
[64, 128, 256, 512, 1024, 2048].reduce((multi, bit: 64 | 128 | 256 | 512 | 1024 | 2048) => {

        multi = times(multi, multi);

        MIN_MAX_VALUES[bit] = {
            min  : negate(multi),
            max  : plus(multi, new Int8Array([-1])),
            umin : new Int8Array(0),
            umax : plus(times(multi, multi), new Int8Array([-1])),
        };

        return multi;

}, new Int8Array([6, 9, 2, 7, 6, 9, 4, 9, 2, 4])); // "4294967296"); // 32-bit uMax + 1


/**
 * The OverflowBig class implements the IOverflow<string> interface.
 * This class is immutable.
 */
export class OverflowBig implements IOverflow<string> {

    private _words: Int8Array;
    private _isNegative: boolean;
    private _minValue: this | Int8Array;
    private _maxValue: this | Int8Array;

    constructor (
        private _value: Int8Array | string | number = 0,
        private _byteLength: 64 | 128 | 256 | 512 | 1024 | 2048 = 64,
        private _isSigned = true,
    ) {
        this._minValue = (_isSigned ? MIN_MAX_VALUES[_byteLength].min : MIN_MAX_VALUES[_byteLength].umin) as Int8Array;
        this._maxValue = (_isSigned ? MIN_MAX_VALUES[_byteLength].max : MIN_MAX_VALUES[_byteLength].umax) as Int8Array;

        if (this._value instanceof Int8Array) {
            this._words = new Int8Array(this._value);
        } else {
            let v = String(this._value);
            this._words = new Int8Array(String(v).length);
            let multi = 1;
            if (v[0] === '-') {
                multi = -1;
                v = v.slice(1);
            }
            let i = v.length;
            let ii = 0;
            while (--i >= 0) {
                this._words[ii++] = (parseInt(v[i]) * multi) | 0;
            }
        }

        this._words = trim(this._words);
        this._value = toString(this._words);
        this._isNegative = this._value[0] === "-";

        if (_byteLength !== Infinity) {
           [this._value, this._words] = checkOverflow(this._words, this._minValue as Int8Array, this._maxValue as Int8Array);
        }
    }


    public get byteLength (): (64 | 128 | 256 | 512 | 1024 | 2048) & number {
        return this._byteLength;
    }


    public get isSigned (): boolean {
        return this._isSigned;
    }


    public get isNegative (): boolean {
        return this._isNegative;
    }

    /**
     * Returns the current value.
     */
    public get value (): string {
        return String(this._value);
    }

    /**
     * Overrides Object.prototype.valueOf().
     * @returns {string}
     */
    public valueOf (): string {
        return this.value;
    }

    public get minValue (): this {
        if (this._minValue instanceof Int8Array) {
            this._minValue = new OverflowBig(this._minValue, this.byteLength, this.isSigned) as this;
        }
        return this._minValue as this;
    }

    public get maxValue (): this {
        if (this._maxValue instanceof Int8Array) {
            this._maxValue = new OverflowBig(this._maxValue, this.byteLength, this.isSigned) as this;
        }
        return this._maxValue as this;
    }

    /**
     * Adds the given value.
     * @param {this | number | string} v - the value to add.
     * @returns {this}
     */
    public plus (v: this | number | string): this {
        
        if (typeof v === "number" || typeof v === "string") {
            v = new OverflowBig(String(v), this.byteLength, this.isSigned) as this;
        }

        return new OverflowBig(
            plus( this._words, (v as any)[toArrayFn]() ),
            this.byteLength,
            this.isSigned
        ) as this;
    }

    /**
     * Subtracts the given value.
     * @param {this | number | string} v - the value to subtract.
     * @returns {this}
     */
    public minus (v: this | number | string): this {

        if (typeof v === "number" || typeof v === "string") {
            v = new OverflowBig(String(v), this.byteLength, this.isSigned) as this;
        }

        return new OverflowBig(
            minus( this._words, (v as any)[toArrayFn]() as Int8Array ),
            this.byteLength,
            this.isSigned
        ) as this;
    }

    /**
     * Multiplies the given value.
     * @param {this | number | string} v - the value to multiply.
     * @returns {this}
     */
    public times (v: this | number | string): this {
        
        if (typeof v === "number" || typeof v === "string") {
            v = new OverflowBig(String(v), this.byteLength, this.isSigned) as this;
        }

        return new OverflowBig(
            times( this._words, (v as any)[toArrayFn]() as Int8Array ),
            this.byteLength,
            this.isSigned
        ) as this;
    }

    /**
     * Divides the given value.
     * @param {this | number | string} v - the value to divide.
     * @returns {this}
     */
    public divide (v: this | number | string): this {

        if (typeof v === "number" || typeof v === "string") {
            v = new OverflowBig(String(v), this.byteLength, this.isSigned) as this;
        }
        
        return new OverflowBig(divide(this._words, (v as any)[toArrayFn]()), this.byteLength, this.isSigned) as this;
    }

    public negate (): this {
        return new OverflowBig(negate(this._words), this.byteLength, true) as this;
    }


    public equals (v: this | number | string): boolean {

        if (typeof v === "number" || typeof v === "string") {
            v = new OverflowBig(String(v), this.byteLength, this.isSigned) as this;
        }
        return equals(this._words, (v as any)[toArrayFn]() as Int8Array);
    }


    public lessThan (v: this | number | string): boolean {
        
        if (typeof v === "number" || typeof v === "string") {
            v = new OverflowBig(String(v), this.byteLength, this.isSigned) as this;
        }
        return lessThan(this._words, (v as any)[toArrayFn]() as Int8Array);
    }


    public greaterThan (v: this | number | string): boolean {
        
        if (typeof v === "number" || typeof v === "string") {
            v = new OverflowBig(String(v), this.byteLength, this.isSigned) as this;
        }
        return greaterThan(this._words, (v as any)[toArrayFn]() as Int8Array);
    }


    public [toArrayFn] (): Int8Array {
        return this._words;
    }

    public toString () {
        return this.value;
    }

    public toJSON() {
        return this.value;
    }
}


function checkOverflow(target: Int8Array, minValue: Int8Array, maxValue: Int8Array): [string, Int8Array] {

    const posOne = new Int8Array([1]);
    const negOne = new Int8Array([-1]);

    while (true) {
        if (greaterThan(target, maxValue)) {
            const diff = minus(target, maxValue);
            const overflow = plus(minValue, diff);
            const overflowAdjust = plus(overflow, negOne);
            target = overflowAdjust;
        } else if (lessThan(target, minValue)) {
            const diff = minus(target, minValue);
            const overflow = plus(maxValue, diff);
            const overflowAdjust = plus(overflow, posOne);
            target = overflowAdjust;
        } else {
            break;
        }
    }
    return [toString(target), target];
}


function plus (a: Int8Array, b: Int8Array) {

    const result = new Int8Array(Math.max(a.length, b.length) + 1);
// console.log("PLUS =>", toString(a), "+", toString(b));
    let i = 0;
    while (a[i] !== undefined || b[i] !== undefined) {
        
        result[i] = (a[i] | 0) + (b[i] | 0) + result[i];
        if (result[i] > 9) {
            result[i] = result[i] % 10;
            result[i+1] = 1;
        } else if (result[i] < 0) {
            result[i] += 10;
            result[i+1]--;
        }
        // console.log(result.join());
        // console.log(trim(normalize(result)).join());
        i++;
    }
// console.log(result);
// console.log("PLUS ==", toString(trim(normalize(result))));
    return trim(normalize(result));
}


function minus (a: Int8Array, b: Int8Array) {
    // console.log("NEGATE <", toString(b), toString(negate(b)));
    return plus(a, negate(b));
}


function times (a: Int8Array, b: Int8Array): Int8Array {

  const isANeg = a[a.length-1] < 0;
  const isBNeg = b[b.length-1] < 0;
  let finalResult = new Int8Array(Math.max(a.length, b.length) * 2 + 1);
  
  let ii = 0;
  while (b[ii] !== undefined) {

    let i = 0;
    let carryOver = 0;
    let result = new Int8Array(Math.max(a.length, b.length) + 2 + ii);
    while (a[i] !== undefined) {
      result[i+ii] = Math.abs(a[i] * b[ii]) + carryOver;
      if (result[i+ii] < 9 && result[i+ii] > -9) {
        carryOver = 0;
      } else {
        carryOver = (result[i+ii] / 10) | 0;
        result[i+ii] -= carryOver * 10;
      }
      i++;
    }
    result[i+ii] += carryOver;
    finalResult = plus(result, finalResult);
    ii++;
  }
  
  // Determine if finalResult is negative.
  return trim(isANeg !== isBNeg ? negate(finalResult) : finalResult);
}

function divide (a: Int8Array, b: Int8Array) {

    const isANeg = a[a.length-1] < 0;
    const isBNeg = b[b.length-1] < 0;
    const zero = new Int8Array([0]);

    a = isANeg ? negate(a) : a;
    b = isBNeg ? negate(b) : b;

    let iterations = new OverflowBig(0, Infinity as any);
    while (greaterThan(a, zero)) {
        let multi = new Int8Array(Math.max(b.length + (a.length - b.length - 1), 1));
        multi[multi.length-1] = 1;
        iterations = iterations.plus(toString(multi));
        // console.log("==>", toString(multi), toString(times(b, multi)));
        a = minus(a, times(b, multi));
        // console.log(toString(a));
    }

    return trim(isANeg !== isBNeg ? negate((iterations as any)[toArrayFn]()) : (iterations as any)[toArrayFn]());
}

function negate (a: Int8Array) {
    return a.map(v => -v);
}

function equals (a: Int8Array, b: Int8Array) {

    return a.length === b.length && a.every((v, i) => v === b[i]);
}

function lessThan (a: Int8Array, b: Int8Array): boolean {
// console.log("LT", JSON.stringify(a), JSON.stringify(b));
    const isANeg = a[a.length-1] < 0;
    const isBNeg = b[b.length-1] < 0;

    if (isANeg && ! isBNeg) return true;
    if (! isANeg && isBNeg) return false;
    
    if (a.length < b.length) return isANeg ? false : true;
    if (a.length > b.length) return isANeg ? true : false;

    let i = a.length - 1;
    while (a[i] !== undefined) {
        if (a[i] < b[i]) return true;
        if (a[i] > b[i]) return false;
        i--;
    }

    return false;
}

function greaterThan (a: Int8Array, b: Int8Array): boolean {
// console.log("GT", JSON.stringify(a), JSON.stringify(b));
    const isANeg = a[a.length-1] < 0;
    const isBNeg = b[b.length-1] < 0;

    if (isANeg && ! isBNeg) return false;
    if (! isANeg && isBNeg) return true;
    
    if (a.length > b.length) return isANeg ? false : true;
    if (a.length < b.length) return isANeg ? true : false;

    let i = a.length - 1;
    while (a[i] !== undefined) {
        if (a[i] > b[i]) return true;
        if (a[i] < b[i]) return false;
        i--;
    }

    return false;
}

function trim (arr: Int8Array) {
    let end = arr.length;
    while (--end > 0 && arr[end] === 0);
    return arr.slice(0, end + 1);
}


function normalize (arr: Int8Array): Int8Array {
    if (arr[arr.length-1] !== -1) return arr;
    arr[arr.length-1] = 0;
    arr[0] -= 10;
    if (arr[0] < -9) {
        arr[0] += 10;
        arr[1] -= 1;
    }
    for (let i=1; i < arr.length-1; i++) {
        arr[i] -= 9;
        if (arr[i] < -9) {
            arr[i] += 10;
            arr[i+1] -= 1;
        }
    }
    return arr;
}


function toString (arr: Int8Array): string {
    let result = arr[arr.length-1] < 0 ? "-" : "";
    for (let i = arr.length-1; i >=0; i--) result += Math.abs(arr[i]);
    return result;
}
