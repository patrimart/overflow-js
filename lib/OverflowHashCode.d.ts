import { IOverflowHashCode } from "./interfaces";
export declare class OverflowHashCode implements IOverflowHashCode<number> {
    private _seed;
    private _PRIME;
    private _byteLength;
    private overflow;
    constructor(_seed?: number, _PRIME?: number, _byteLength?: 32 | 53);
    readonly seed: number;
    readonly prime: number;
    readonly byteLength: 32 | 53;
    readonly value: number;
    valueOf(): number;
    of(...args: (string | number | string[] | number[])[]): this;
}
