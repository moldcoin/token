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
        Assert.equal(mold.price(startDatetime), 15000, "first stage should return 15000");
        Assert.equal(mold.price(startDatetime + 1 hours), 15000, "first stage should return 15000");
        Assert.equal(mold.price(startDatetime + 120 hours), 15000, "first stage should return 15000");
        Assert.equal(mold.price(startDatetime + 121 hours), 12000, "second stage should return 12000");
        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours), 12000, "second stage should return 10000");
        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours + 1 hours), 10000, "until end time should return 10000");
        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours + 2040 hours), 10000, "until end should return 10000");
        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours + 2040 hours +  1 seconds), 0, "until end should return 10000");
    }

    function testPrice2() {
        uint startDatetime = 123456;
        MoldCoin mold = new MoldCoin(startDatetime,0x0);
        Assert.equal(mold.price(startDatetime - 1 seconds), 0, "should return 0");
        Assert.equal(mold.price(startDatetime), 15000, "first stage should return 500");
        Assert.equal(mold.price(startDatetime + 120 hours - 1 seconds), 15000, "first stage should return 15000");
        Assert.equal(mold.price(startDatetime + 120 hours + 1 seconds), 12000, "second stage should return 12000");
        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours - 1 seconds), 12000, "second stage should return 333");
        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours +  1 seconds), 10000, "until end should return 10000");
        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours  + 2040 hours), 10000, "until end should return 10000");
        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours  + 2040 hours +  1 seconds), 0, "other should return 10000");
    }
    function testPrice3() {
        MoldCoin mold = MoldCoin(DeployedAddresses.MoldCoin());

        uint startDatetime = mold.startDatetime();
        Assert.equal(mold.price(startDatetime - 1 seconds), 0, "should return 0");
        Assert.equal(mold.price(startDatetime), 15000, "first stage should return 500");
        Assert.equal(mold.price(startDatetime + 120 hours - 1 seconds), 15000, "first stage should return 500");
        Assert.equal(mold.price(startDatetime + 120 hours + 1 seconds), 12000, "second stage should return 500");
        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours - 1 seconds), 12000, "second stage should return 333");
        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours +  1 seconds), 10000, "until end should return 10000");
        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours  + 2040 hours), 10000, "until end should return 10000");
        Assert.equal(mold.price(startDatetime + 120 hours + 240 hours  + 2040 hours +  1 seconds), 0, "other should return 10000");
    }

}
