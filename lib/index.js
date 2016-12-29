"use strict";
var OverflowTyped_1 = require("./OverflowTyped");
var OverflowBig_1 = require("./OverflowBig");
var OverflowLong_1 = require("./OverflowLong");
var OverflowHashCode_1 = require("./OverflowHashCode");
var OverflowHashCodeBig_1 = require("./OverflowHashCodeBig");
var Overflow;
(function (Overflow) {
    Overflow.Zero8 = byte(0);
    Overflow.Min8 = byte(-128);
    Overflow.Max8 = byte(127);
    Overflow.MaxU8 = ubyte(255);
    Overflow.Zero16 = short(0);
    Overflow.Min16 = short(-32768);
    Overflow.Max16 = short(32767);
    Overflow.MaxU16 = ushort(65535);
    Overflow.Zero = new OverflowTyped_1.OverflowTyped(0, Int32Array);
    Overflow.Min = new OverflowTyped_1.OverflowTyped(-2147483648, Int32Array);
    Overflow.Max = new OverflowTyped_1.OverflowTyped(2147483647, Int32Array);
    Overflow.MaxU = new OverflowTyped_1.OverflowTyped(4294967295, Uint32Array);
    Overflow.HashCode = new OverflowHashCode_1.OverflowHashCode(1, 31, 32);
    Overflow.ZeroLong = new OverflowLong_1.OverflowLong(0);
    Overflow.MinLong = new OverflowLong_1.OverflowLong(-9007199254740991);
    Overflow.MaxLong = new OverflowLong_1.OverflowLong(9007199254740991);
    Overflow.HashCodeLong = new OverflowHashCode_1.OverflowHashCode(1, 31, 53);
    Overflow.Zero64 = new OverflowBig_1.OverflowBig("0", 64, true);
    Overflow.Min64 = new OverflowBig_1.OverflowBig(OverflowBig_1.MIN_MAX_VALUES[64].min, 64, true);
    Overflow.Max64 = new OverflowBig_1.OverflowBig(OverflowBig_1.MIN_MAX_VALUES[64].max, 64, true);
    Overflow.MaxU64 = new OverflowBig_1.OverflowBig(OverflowBig_1.MIN_MAX_VALUES[64].umax, 64, false);
    Overflow.HashCode64 = new OverflowHashCodeBig_1.OverflowHashCodeBig(1, 31, 64);
    Overflow.Zero128 = new OverflowBig_1.OverflowBig("0", 128, true);
    Overflow.Min128 = new OverflowBig_1.OverflowBig(OverflowBig_1.MIN_MAX_VALUES[128].min, 128, true);
    Overflow.Max128 = new OverflowBig_1.OverflowBig(OverflowBig_1.MIN_MAX_VALUES[128].max, 128, true);
    Overflow.MaxU128 = new OverflowBig_1.OverflowBig(OverflowBig_1.MIN_MAX_VALUES[128].umax, 128, false);
    Overflow.HashCode128 = new OverflowHashCodeBig_1.OverflowHashCodeBig(1, 31, 128);
    Overflow.Zero256 = new OverflowBig_1.OverflowBig("0", 256, true);
    Overflow.Min256 = new OverflowBig_1.OverflowBig(OverflowBig_1.MIN_MAX_VALUES[256].min, 256, true);
    Overflow.Max256 = new OverflowBig_1.OverflowBig(OverflowBig_1.MIN_MAX_VALUES[256].max, 256, true);
    Overflow.MaxU256 = new OverflowBig_1.OverflowBig(OverflowBig_1.MIN_MAX_VALUES[256].umax, 256, false);
    Overflow.HashCode256 = new OverflowHashCodeBig_1.OverflowHashCodeBig(1, 31, 256);
    Overflow.Zero512 = new OverflowBig_1.OverflowBig("0", 512, true);
    Overflow.Min512 = new OverflowBig_1.OverflowBig(OverflowBig_1.MIN_MAX_VALUES[512].min, 512, true);
    Overflow.Max512 = new OverflowBig_1.OverflowBig(OverflowBig_1.MIN_MAX_VALUES[512].max, 512, true);
    Overflow.MaxU512 = new OverflowBig_1.OverflowBig(OverflowBig_1.MIN_MAX_VALUES[512].umax, 512, false);
    Overflow.HashCode512 = new OverflowHashCodeBig_1.OverflowHashCodeBig(1, 31, 512);
    Overflow.Zero1024 = new OverflowBig_1.OverflowBig("0", 1024, true);
    Overflow.Min1024 = new OverflowBig_1.OverflowBig(OverflowBig_1.MIN_MAX_VALUES[1024].min, 1024, true);
    Overflow.Max1024 = new OverflowBig_1.OverflowBig(OverflowBig_1.MIN_MAX_VALUES[1024].max, 1024, true);
    Overflow.MaxU1024 = new OverflowBig_1.OverflowBig(OverflowBig_1.MIN_MAX_VALUES[1024].umax, 1024, false);
    Overflow.HashCode1024 = new OverflowHashCodeBig_1.OverflowHashCodeBig(1, 31, 1024);
    Overflow.Zero2048 = new OverflowBig_1.OverflowBig("0", 2048, true);
    Overflow.Min2048 = new OverflowBig_1.OverflowBig(OverflowBig_1.MIN_MAX_VALUES[2048].min, 2048, true);
    Overflow.Max2048 = new OverflowBig_1.OverflowBig(OverflowBig_1.MIN_MAX_VALUES[2048].max, 2048, true);
    Overflow.MaxU2048 = new OverflowBig_1.OverflowBig(OverflowBig_1.MIN_MAX_VALUES[2048].umax, 2048, false);
    Overflow.HashCode2048 = new OverflowHashCodeBig_1.OverflowHashCodeBig(1, 31, 2048);
    Overflow.ZeroInfinity = new OverflowBig_1.OverflowBig(0, Infinity);
    function custom(value, MIN_SAFE_VALUE, MAX_SAFE_VALUE) {
        return new OverflowLong_1.OverflowLong(value, MIN_SAFE_VALUE, MAX_SAFE_VALUE);
    }
    Overflow.custom = custom;
    function byte(value) {
        if (value === void 0) { value = 0; }
        return new OverflowTyped_1.OverflowTyped(value, Int8Array);
    }
    Overflow.byte = byte;
    function ubyte(value) {
        if (value === void 0) { value = 0; }
        return new OverflowTyped_1.OverflowTyped(value, Uint8Array);
    }
    Overflow.ubyte = ubyte;
    function short(value) {
        if (value === void 0) { value = 0; }
        return new OverflowTyped_1.OverflowTyped(value, Int16Array);
    }
    Overflow.short = short;
    function ushort(value) {
        if (value === void 0) { value = 0; }
        return new OverflowTyped_1.OverflowTyped(value, Uint16Array);
    }
    Overflow.ushort = ushort;
    function int(value) {
        if (value === void 0) { value = 0; }
        return new OverflowTyped_1.OverflowTyped(value, Int32Array);
    }
    Overflow.int = int;
    function uint(value) {
        if (value === void 0) { value = 0; }
        return new OverflowTyped_1.OverflowTyped(value, Uint32Array);
    }
    Overflow.uint = uint;
    function long(value) {
        if (value === void 0) { value = 0; }
        return new OverflowLong_1.OverflowLong(value);
    }
    Overflow.long = long;
    function ulong(value) {
        if (value === void 0) { value = 0; }
        return new OverflowLong_1.OverflowLong(value, 0);
    }
    Overflow.ulong = ulong;
    function big64(value) {
        if (value === void 0) { value = 0; }
        return new OverflowBig_1.OverflowBig(value, 64, true);
    }
    Overflow.big64 = big64;
    function ubig64(value) {
        if (value === void 0) { value = 0; }
        return new OverflowBig_1.OverflowBig(value, 64, false);
    }
    Overflow.ubig64 = ubig64;
    function big128(value) {
        if (value === void 0) { value = 0; }
        return new OverflowBig_1.OverflowBig(value, 128, true);
    }
    Overflow.big128 = big128;
    function ubig128(value) {
        if (value === void 0) { value = 0; }
        return new OverflowBig_1.OverflowBig(value, 128, false);
    }
    Overflow.ubig128 = ubig128;
    function big256(value) {
        if (value === void 0) { value = 0; }
        return new OverflowBig_1.OverflowBig(value, 256, true);
    }
    Overflow.big256 = big256;
    function ubig256(value) {
        if (value === void 0) { value = 0; }
        return new OverflowBig_1.OverflowBig(value, 256, false);
    }
    Overflow.ubig256 = ubig256;
    function big512(value) {
        if (value === void 0) { value = 0; }
        return new OverflowBig_1.OverflowBig(value, 512, true);
    }
    Overflow.big512 = big512;
    function ubig512(value) {
        if (value === void 0) { value = 0; }
        return new OverflowBig_1.OverflowBig(value, 512, false);
    }
    Overflow.ubig512 = ubig512;
    function big1024(value) {
        if (value === void 0) { value = 0; }
        return new OverflowBig_1.OverflowBig(value, 1024, true);
    }
    Overflow.big1024 = big1024;
    function ubig1024(value) {
        if (value === void 0) { value = 0; }
        return new OverflowBig_1.OverflowBig(value, 1024, false);
    }
    Overflow.ubig1024 = ubig1024;
    function big2048(value) {
        if (value === void 0) { value = 0; }
        return new OverflowBig_1.OverflowBig(value, 2048, true);
    }
    Overflow.big2048 = big2048;
    function ubig2048(value) {
        if (value === void 0) { value = 0; }
        return new OverflowBig_1.OverflowBig(value, 2048, false);
    }
    Overflow.ubig2048 = ubig2048;
    function bigInfinity(value) {
        if (value === void 0) { value = 0; }
        return new OverflowBig_1.OverflowBig(value, Infinity);
    }
    Overflow.bigInfinity = bigInfinity;
})(Overflow = exports.Overflow || (exports.Overflow = {}));
//# sourceMappingURL=index.js.map