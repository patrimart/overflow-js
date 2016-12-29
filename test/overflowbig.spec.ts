
import assert = require("assert");

import { Overflow } from "../lib";


describe ("OverflowBig", function () {

    it ("basic plus/minus math", function () {

        let v1 = Overflow.big256(256);
        let v2 = 256;

        for (let i=0; i<50; i++) {
            v1 = v1.minus(3);
            v2 = v2 - 3;
            assert.equal(v1.value, String(v2));
        }

        for (let i=0; i<50; i++) {
            v1 = v1.plus(3);
            v2 = v2 + 3;
            assert.equal(v1.value, String(v2));
        }

        assert.equal("256", v1.value);
    })

    it ("basic multiplication/division math", function () {

        let v1 = Overflow.big256(1);
        let v2 = 1;

        for (let i=0; i<20; i++) {
            v1 = v1.times(3);
            v2 = v2 * 3;
            assert.equal(v1.value, String(v2));
        }

        for (let i=0; i<20; i++) {
            v1 = v1.divide(3);
            v2 = v2 / 3 | 0;
            assert.equal(v1.value, String(v2));
        }

        for (let i=0; i<20; i++) {
            v1 = v1.times(-3);
            v2 = v2 * -3;
            assert.equal(v1.value, String(v2));
        }

        for (let i=0; i<20; i++) {
            v1 = v1.divide(-3);
            v2 = v2 / -3 | 0;
            assert.equal(v1.value, String(v2));
        }

        assert.equal("1", v1.value);
    })

    it ("helper methods", function () {
        
        const a = Overflow.big128(256);
        const b = Overflow.big128(64);
        const c = Overflow.big128(-256);
        const d = Overflow.big128(-64);

        assert.equal(a.isSigned, true);
        assert.equal(a.isNegative, false);
        assert.equal(c.isSigned, true);
        assert.equal(c.isNegative, true);
        assert.equal(Overflow.ubig128(0).isSigned, false);

        assert.equal(a.equals(b), false, "A");
        assert.equal(a.equals(c), false, "B");
        assert.equal(a.equals(Overflow.big256(256)), true, "C");
        assert.equal(c.equals(Overflow.big256(-256)), true, "C2");

        assert.equal(a.lessThan(Overflow.big256(256)), false, "D");
        assert.equal(c.lessThan(Overflow.big256(-256)), false, "D2");
        assert.equal(a.lessThan(b), false, "E");
        assert.equal(a.lessThan(c), false, "F");
        assert.equal(a.lessThan(d), false, "G");

        assert.equal(a.greaterThan(Overflow.big256(256)), false, "H");
        assert.equal(c.greaterThan(Overflow.big256(-256)), false, "H2");
        assert.equal(a.greaterThan(b), true, "I");
        assert.equal(a.greaterThan(c), true, "J");
        assert.equal(a.greaterThan(d), true, "K");

        assert.equal(a.equals(Overflow.big64(256)), true, "L");
        assert.equal(a.equals(Overflow.ubig64(256)), true, "M");
        assert.equal(a.equals(Overflow.ubig128(256)), true, "N");
        assert.equal(a.equals(Overflow.ubig256(256)), true, "O");
        assert.equal(a.equals(Overflow.big512(256)), true, "P");
        assert.equal(a.equals(Overflow.ubig512(256)), true, "Q");
        assert.equal(a.equals(Overflow.big1024(256)), true, "R");
        assert.equal(a.equals(Overflow.ubig1024(256)), true, "S");
        assert.equal(a.equals(Overflow.big2048(256)), true, "T");
        assert.equal(a.equals(Overflow.ubig2048(256)), true, "U");
        assert.equal(a.equals(Overflow.bigInfinity(256)), true, "U2");

        assert.equal(c.equals(Overflow.big64(-256)), true, "V");
        assert.equal(c.equals(Overflow.ubig64(-256)), false, "W");
        assert.equal(c.equals(Overflow.ubig128(-256)), false, "X");
        assert.equal(c.equals(Overflow.ubig256(-256)), false, "Y");
        assert.equal(c.equals(Overflow.big512(-256)), true, "Z");
        assert.equal(c.equals(Overflow.ubig512(-256)), false, "AA");
        assert.equal(c.equals(Overflow.big1024(-256)), true, "BB");
        assert.equal(c.equals(Overflow.ubig1024(-256)), false, "CC");
        assert.equal(c.equals(Overflow.big2048(-256)), true, "DD");
        assert.equal(c.equals(Overflow.ubig2048(-256)), false, "EE");
        assert.equal(c.equals(Overflow.bigInfinity(-256)), true, "FF");

        assert.equal(a.negate().equals(Overflow.big256(-256)), true, "GG");
    });

    it ("plus and minus should overflow" , function () {

        let v = Overflow.Max128;
        v = v.minus(25);

        for (let i = 0; i < 50; i++) {
            v = v.plus(1);
        }

        assert.equal(v.lessThan(0), true);

        for (let i = 0; i < 50; i++) {
            v = v.minus(1);
        }

        assert.equal(v.greaterThan(0), true);
    });

});
