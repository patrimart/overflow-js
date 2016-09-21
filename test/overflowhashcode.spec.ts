
import assert = require("assert");

import { Overflow } from "../lib";
import { OverflowHashCode } from "../lib/OverflowHashCode";


describe ("OverflowHashCode", function () {

    it ("int should hash", function () {

        const hashCode = Overflow.HashCode();
        hashCode.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"])
        assert.equal(+hashCode, Overflow.HashCode().of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value);
    });

    it ("long should hash", function () {

        const hashCode = Overflow.HashCodeLong();
        assert.equal(+hashCode, new OverflowHashCode());

        hashCode.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"])
        assert.equal(+hashCode, Overflow.HashCodeLong().of(12, "Hello there", 1, 2, 3, 4, "abc", "def", "ghi").value);
    });
});
