
import assert = require("assert");

import { Overflow } from "../lib/";
import { OverflowHashCode } from "../lib/OverflowHashCode";


describe ("OverflowHashCode", function () {

    it ("int should hash", function () {

        let hashCode = Overflow.HashCode;
        assert.equal(hashCode.seed, 1);
        hashCode = hashCode.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"])
        assert.equal(hashCode.valueOf(), Overflow.HashCode.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value);
    });

    it ("long should hash", function () {

        let hashCode = Overflow.HashCodeLong;
        hashCode = hashCode.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"])
        assert.equal(hashCode.valueOf(), Overflow.HashCodeLong.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value);
    });

    it ("big64 should hash", function () {

        let hashCode = Overflow.HashCode64;
        assert.equal(hashCode.seed, 1);
        hashCode = hashCode.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"])
        assert.equal(hashCode.valueOf(), Overflow.HashCode64.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value);
    });

    it ("bign should hash", function () {

        assert.equal(
            Overflow.HashCode128.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"]).valueOf(),
            Overflow.HashCode128.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value,
            "Overflow.HashCode128",
        );

        assert.equal(
            Overflow.HashCode256.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"]).value,
            Overflow.HashCode256.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value,
            "Overflow.HashCode256",
        );

        assert.equal(
            Overflow.HashCode512.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"]).value,
            Overflow.HashCode512.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value,
            "Overflow.HashCode512",
        );

        assert.equal(
            Overflow.HashCode1024.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"]).value,
            Overflow.HashCode1024.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value,
            "Overflow.HashCode1024",
        );

        assert.equal(
            Overflow.HashCode2048.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"]).value,
            Overflow.HashCode2048.of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value,
            "Overflow.HashCode2048",
        );

    });
});
