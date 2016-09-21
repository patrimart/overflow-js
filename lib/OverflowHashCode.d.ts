export declare class OverflowHashCode {
    private PRIME;
    private overflow;
    constructor(seed?: number, PRIME?: number, isInt?: boolean);
    value: number;
    valueOf(): number;
    of(...args: (string | number | string[] | number[])[]): this;
}
