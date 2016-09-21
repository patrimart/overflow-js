import { IOverflow } from "./index";
export declare class OverflowInt implements IOverflow {
    private _value;
    private MIN_SAFE_VALUE;
    private MAX_SAFE_VALUE;
    constructor(_value?: number, MIN_SAFE_VALUE?: number, MAX_SAFE_VALUE?: number);
    value: number;
    valueOf(): number;
    plus(v: number): this;
    minus(v: number): this;
    times(v: number): this;
    divide(v: number): this;
    private valCheck(v);
}
