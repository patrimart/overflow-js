
/**
 * IOverflow interface.
 */
export interface IOverflow<T extends string | number> {

    value: T;
    valueOf (): T;

    byteLength: number;
    isSigned: boolean;
    isNegative: boolean;
    minValue: this;
    maxValue: this;

    equals (v: this | number | T): boolean;
    lessThan (v: this | number | T): boolean;
    greaterThan (v: this | number | T): boolean;

    plus (v: this | number | T): this;
    minus (v: this | number | T): this;
    times (v: this | number | T): this;
    divide (v: this | number | T): this;
    negate (): this;
}


/**
 * IOverflowBig interface.
 */
export interface IOverflowBig extends IOverflow<string> {}


/**
 * IOverflowHashCode interface.
 */
export interface IOverflowHashCode<T extends string | number> {
    value: T;
    seed: T;
    prime: number;
    byteLength: number;
    valueOf (): T;
    of (...args: (string | number | string[] | number[])[]): this;
}
