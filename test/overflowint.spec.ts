
import assert = require("assert");

import { Overflow } from "../lib";


describe ("OverflowInt", function () {

    it ("basic plus/minus math", function () {

        let v1 = Overflow.int(256);
        let v1u = Overflow.uint(256);
        let v2 = 256;

        for (let i=0; i<50; i++) {
            v1 = v1.minus(3);
            v1u = v1u.minus(3);
            v2 = v2 - 3;
            assert.equal(+v1, v2);
        }

        for (let i=0; i<50; i++) {
            v1 = v1.plus(3);
            v1u = v1u.plus(3);
            v2 = v2 + 3;
            assert.equal(+v1, v2);
        }

        assert.equal(256, +v1);
        assert.equal(256, +v1u);
    });

    it ("basic multiplication/division math", function () {

        let v1 = Overflow.int(1);
        let v2 = 1;

        for (let i=0; i<10; i++) {
            v1 = v1.times(3);
            v2 = v2 * 3;
            assert.equal(+v1, v2);
        }

        for (let i=0; i<10; i++) {
            v1 = v1.divide(3);
            v2 = v2 / 3 | 0;
            assert.equal(+v1, v2);
        }

        for (let i=0; i<10; i++) {
            v1 = v1.times(-3);
            v2 = v2 * -3;
            assert.equal(+v1, v2);
        }

        for (let i=0; i<10; i++) {
            v1 = v1.divide(-3);
            v2 = v2 / -3 | 0;
            assert.equal(+v1, v2);
        }

        assert.equal(1, +v1);
    });

    it ("plus and minus should overflow" , function () {

        let v = Overflow.Max;
        v = v.minus(25);

        for (let i = 0; i < 50; i++) {
            v = v.plus(1);
        }

        assert.equal(+v < 0, true);

        for (let i = 0; i < 50; i++) {
            v = v.minus(1);
        }

        assert.equal(+v > 0, true);
    });

    it ("helper methods", function () {
        
        const a = Overflow.int(256);
        const b = Overflow.int(64);
        const c = Overflow.int(-256);
        const d = Overflow.int(-64);

        assert.equal(a.byteLength, 32);
        assert.equal(a.isSigned, true);
        assert.equal(a.isNegative, false);
        assert.equal(c.isNegative, true);
        assert.equal(a.minValue.value, -2147483648);
        assert.equal(a.maxValue.value, 2147483647);

        assert.equal(a.equals(b), false, "A");
        assert.equal(a.equals(c), false, "B");
        assert.equal(a.equals(Overflow.int(256)), true, "C");
        assert.equal(c.equals(Overflow.int(-256)), true, "D");

        assert.equal(a.lessThan(Overflow.int(256)), false, "E");
        assert.equal(c.lessThan(Overflow.int(-256)), false, "F");
        assert.equal(a.lessThan(b), false, "G");
        assert.equal(a.lessThan(c), false, "H");
        assert.equal(a.lessThan(d), false, "I");

        assert.equal(a.greaterThan(Overflow.int(256)), false, "J");
        assert.equal(c.greaterThan(Overflow.int(-256)), false, "K");
        assert.equal(a.greaterThan(b), true, "L");
        assert.equal(a.greaterThan(c), true, "M");
        assert.equal(a.greaterThan(d), true, "N");

        assert.equal(c.negate().equals(Overflow.int(-256)), false, "O");
    });


    it ("should exercise helpers", function () {

        assert.equal(Overflow.Min.value, -2147483648);
        assert.equal(Overflow.Zero.value, 0);
    });

});
