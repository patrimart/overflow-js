
import assert = require("assert");

import { Overflow } from "../lib";

describe ("OverflowLong", function () {

    const v = Overflow.MaxLong();

    it ("plus and minus should overflow" , function () {

        v.minus(25);

        for (let i = 0; i < 50; i++) {
            v.plus(1);
        }

        assert.equal(+v < 0, true);

        for (let i = 0; i < 50; i++) {
            v.minus(1);
        }

        assert.equal(+v > 0, true);
    });

    it ("times and plus should offset", function () {

        const v = Overflow.long(31);
        // v.times(31).times(31).times(31).times(31);
        // v.divide(31).divide(31).divide(31).divide(31);
        
        const result = +v;
        v.times(2).divide(2);
        assert.equal(result, +v);
    });

    it ("should throw RangeError", function () {

        assert.throws(function () { Overflow.long(Number.MAX_SAFE_INTEGER + 10); });
        assert.throws(function () { Overflow.long(Number.MIN_SAFE_INTEGER - 10); });
    });

    it ("should exercise helpers", function () {

        assert.equal(Overflow.MinLong().value, Number.MIN_SAFE_INTEGER);
        assert.equal(Overflow.ZeroLong().value, 0);
    });
});
