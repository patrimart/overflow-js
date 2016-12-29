
const oldLog = console.log;
console.log = function () {};

import { Overflow } from "../lib/";

console.log = oldLog;
console.log();
console.log();
console.log();

// let v = Overflow.Max128;

// console.log("A1", v.value);

// v = v.minus(10);

// console.log("B1", v.value);

// for (let i = 0; i < 20; i++) {
//     v = v.plus(1);
//     console.log("B2", v.value);
// }

// console.log("C1", v.value);

// for (let i = 0; i < 15; i++) {
//     v = v.minus(1);
//     console.log("C2", v.value);
// }

// console.log("D1", v.value);

// let v = Overflow.big256(50);

// for (let i=0; i<100; i++) {
//     v = v.minus(3);
//     console.log(v.value);
// }

// for (let i=0; i<100; i++) {
//     v = v.plus(3);
//     console.log(v.value);
// }

// let v1 = Overflow.big512(1);
// let v2 = 1;

// for (let i=0; i<20; i++) {
//     v1 = v1.times(-3);
//     v2 = v2 * -3;
//     console.log(v1.value, v2);
// }

// for (let i=0; i<20; i++) {
//     v1 = v1.divide(-3);
//     v2 = v2 / -3;
//     console.log(v1.value, v2);
// }

// console.log(Overflow.HashCode.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value);
// console.log(Overflow.HashCodeLong.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value);
// console.log(Overflow.HashCode64.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value);
// console.log(Overflow.HashCode128.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value);
// console.log(Overflow.HashCode256.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value);
// console.log(Overflow.HashCode512.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value);
// console.log(Overflow.HashCode1024.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value);
// console.log(Overflow.HashCode2048.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value);

// let v = Overflow.long(50);

// for (let i=0; i<100; i++) {
//     v = v.minus(3);
//     console.log(v.value);
// }

// for (let i=0; i<100; i++) {
//     v = v.plus(3);
//     console.log(v.value);
// }

// let v1 = Overflow.long(1);
// let v2 = 1;

// for (let i=0; i<25; i++) {
//     v1 = v1.times(-3);
//     v2 = v2 * -3;
//     console.log("X", v1.value, v2);
// }

// for (let i=0; i<25; i++) {
//     v1 = v1.divide(-3);
//     v2 = parseInt(String(v2 / -3));
//     console.log("/", v1.value, v2);
// }
