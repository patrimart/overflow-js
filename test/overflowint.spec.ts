
import assert = require("assert");

import { Overflow } from "../lib";


describe ("OverflowInt", function () {

    it ("plus and minus should overflow" , function () {

        const v = Overflow.Max();
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

        const v = Overflow.int(31);
        v.times(31).times(31).times(31).times(31).times(31).times(31);
        v.divide(31);
        
        const result = +v;
        v.times(2).divide(2);
       assert.equal(result, +v);
    });

    it ("should throw RangeError", function () {

        assert.throws(function () { Overflow.int(Number.MAX_SAFE_INTEGER); });
        assert.throws(function () { Overflow.int(Number.MIN_SAFE_INTEGER); });
    });

    it ("should exercise helpers", function () {

        assert.equal(Overflow.Min().value, -2147483648);
        assert.equal(Overflow.Zero().value, 0);
    });

    it ("should exercise custom", function () {

        const v = Overflow.custom(0, -100, 100);
        v.plus(61).plus(61).plus(61);
        assert.equal(+v < 0, true);

        v.minus(50).minus(50).minus(50);
        assert.equal(+v > 0, true);
    });
});
