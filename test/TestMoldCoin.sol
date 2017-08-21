pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MoldCoin.sol";


contract TestMoldCoin {
    function testStartDateTime() {
        MoldCoin mold = MoldCoin(DeployedAddresses.MoldCoin());

        uint startDatetime = mold.startDatetime();

//        > Date.parse('2017-09-01T00:00:00Z')/1000
//        1504224000
        Assert.equal(startDatetime, 1504224000, "ico will start on '2017-09-01T00:00:00Z'");
    }

    function testPrice() {
        uint startDatetime = 1000;
        MoldCoin mold = new MoldCoin(startDatetime,0x0);
        Assert.equal(mold.price(startDatetime), 500, "first stage should return 500");
        Assert.equal(mold.price(startDatetime + 1 hours), 500, "first stage should return 500");
        Assert.equal(mold.price(startDatetime + 120 hours), 500, "first stage should return 500");
        Assert.equal(mold.price(startDatetime + 121 hours), 333, "second stage should return 333");
        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours), 333, "second stage should return 333");
        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours + 1 hours), 250, "other time should return 250");
    }
    function testPrice2() {
        uint startDatetime = 123456;
        MoldCoin mold = new MoldCoin(startDatetime,0x0);
        Assert.equal(mold.price(startDatetime), 500, "first stage should return 500");
        Assert.equal(mold.price(startDatetime - 1 seconds), 0, "should return 0");
        Assert.equal(mold.price(startDatetime + 120 hours - 1 seconds), 500, "first stage should return 500");
        Assert.equal(mold.price(startDatetime + 120 hours + 1 seconds), 333, "second stage should return 500");
        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours - 1 seconds), 333, "second stage should return 333");
        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours + 1 seconds), 250, "other time should return 250");
    }
    function testPrice3() {
        MoldCoin mold = MoldCoin(DeployedAddresses.MoldCoin());

        uint startDatetime = mold.startDatetime();
        Assert.equal(mold.price(startDatetime), 500, "first stage should return 500");
        Assert.equal(mold.price(startDatetime - 1 seconds), 0, "should return 0");
        Assert.equal(mold.price(startDatetime + 120 hours - 1 seconds), 500, "first stage should return 500");
        Assert.equal(mold.price(startDatetime + 120 hours + 1 seconds), 333, "second stage should return 500");
        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours - 1 seconds), 333, "second stage should return 333");
        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours + 1 seconds), 250, "other time should return 250");
    }
//    function testBuy() {
//        uint startDatetime = now;
//        MoldCoin mold = new MoldCoin(startDatetime);
//        bool r = mold.buy.gas(200000)();
//        Assert.isFalse(r, "Should be false, as it should throw");

//        Assert.equal(mold.price(startDatetime), 500, "first stage should return 500");
//        Assert.equal(mold.price(startDatetime + 1 hours), 500, "first stage should return 500");
//        Assert.equal(mold.price(startDatetime + 120 hours), 500, "first stage should return 500");
//        Assert.equal(mold.price(startDatetime + 121 hours), 333, "second stage should return 333");
//        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours), 333, "second stage should return 333");
//        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours + 1 hours), 250, "other time should return 250");
//    }
}
