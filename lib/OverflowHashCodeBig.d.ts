import { IOverflowHashCode } from "./interfaces";
export declare class OverflowHashCodeBig implements IOverflowHashCode<string> {
    private _seed;
    private _PRIME;
    private _byteLength;
    private overflow;
    constructor(_seed?: number | string, _PRIME?: number, _byteLength?: 64 | 128 | 256 | 512 | 1024 | 2048);
    readonly seed: string;
    readonly prime: number;
    readonly byteLength: 64 | 128 | 256 | 512 | 1024 | 2048;
    readonly value: string;
    valueOf(): string;
    of(...args: (string | number | string[] | number[])[]): this;
}
