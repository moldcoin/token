var MoldCoin = artifacts.require("./MoldCoin.sol");
var logger = require("tracer").console({
    level: 'info',
    inspectOpt: {
        showHidden: true, //the object's non-enumerable properties will be shown too
        depth: null
    }
});

contract('MoldCoin', function (accounts) {
    logger.info(accounts);

    it("start time case 1", function () {
        return MoldCoin.deployed().then(function (instance) {
            return instance.startDatetime();
        }).then(function (startDatetime) {
            let timestamp = Math.floor(Date.parse('2017-06-01T00:00:00') / 1000);
            assert.equal(startDatetime, timestamp);
        });
    });

    it("start time case 2", function () {
        let dateTime = Math.floor(Date.now() / 1000);
        return MoldCoin.new(dateTime).then(function (instance) {
            return instance.startDatetime();
        }).then(function (startDatetime) {
            logger.log(startDatetime);
            assert.equal(startDatetime, dateTime);
        });
    });
    it("buy method", function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;
        let owner = accounts[0];
        logger.log(owner);
        return MoldCoin.new(dateTime).then(function (instance) {
            //logger.log(instance);
            coin = instance;
            return coin.buy({value: 1});
        }).then(function (result) {
            // assert.equal(result.logs[0].args.mold, 500);
            return coin.balanceOf(owner);
        }).then(function (result) {
            logger.log(result);
            assert.equal(result, 500);
        });
    });
    it("default function", function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;
        let owner = accounts[0];
        logger.log(owner);
        return MoldCoin.new(dateTime).then(function (instance) {
            coin = instance;
            return coin.sendTransaction({value: 1});
        }).then(function (result) {
            logger.log(result);
            assert.equal(result.logs[0].args.mold, 500);
            return coin.balanceOf(owner);
        }).then(function (result) {
            logger.log(result);
            assert.equal(result, 500);
        });
    });
    it("buyRecipient case 1", function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;
        let owner = accounts[0];
        logger.log(owner);
        return MoldCoin.new(dateTime).then(function (instance) {
            coin = instance;
            return coin.buyRecipient(owner, {value: 1});
        }).then(function (result) {
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.sender, owner);
            assert.equal(log.mold, 500);
            return coin.balanceOf(owner);
        }).then(function (result) {
            logger.log(result);
            assert.equal(result, 500);
        });
    });
    it("buyRecipient case 2", function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;
        let owner = accounts[0];
        let sendTo = accounts[1];

        logger.log(owner);
        return MoldCoin.new(dateTime).then(function (instance) {
            coin = instance;
            return coin.buyRecipient(sendTo, {value: 1});
        }).then(function (result) {
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.sender, sendTo);
            assert.equal(log.mold, 500);
            return coin.balanceOf(sendTo);
        }).then(function (result) {
            logger.log(result);
            assert.equal(result, 500);
        });
    });
    it("buyRecipient case 3", function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;
        let owner = accounts[0];
        let sendTo = accounts[1];

        logger.log(owner);
        return MoldCoin.new(dateTime).then(function (instance) {
            coin = instance;
            return coin.buyRecipient(sendTo, {value: 10});
        }).then(function (result) {
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.sender, sendTo);
            assert.equal(log.mold, 5000);
            return coin.balanceOf(sendTo);
        }).then(function (result) {
            logger.log(result);
            assert.equal(result, 5000);
        });
    });
    it("buyRecipient case 4", function () {
        let now = new Date();
        let dateTime = Math.floor((now.setHours(now.getHours() + 1)) / 1000);
        let coin = null;
        let owner = accounts[0];
        let sendTo = accounts[1];

        logger.log(owner);
        return MoldCoin.new(dateTime).then(function (instance) {
            coin = instance;
            return coin.buyRecipient(sendTo, {value: 10});
        }).catch(function (e) {
            logger.log(e);
        });
    });
    it("get token case 1", function () {
        let now = new Date();
        let dateTime = Math.floor((now.setHours(now.getHours() - 1)) / 1000);
        let coin = null;
        let owner = accounts[0];

        return MoldCoin.new(dateTime).then(function (instance) {
            coin = instance;
            return coin.sendTransaction({value: 1});
        }).then(function (result) {
            logger.log(result);
            assert.equal(result.logs[0].args.mold, 500);
            return coin.balanceOf(owner);
        }).then(function (result) {
            logger.log(result);
            assert.equal(result, 500);
        });
    });
    it("get token case 2", function () {
        let now = new Date();
        let dateTime = Math.floor((now.setHours(now.getHours() - 120)) / 1000);
        let coin = null;
        let owner = accounts[0];

        return MoldCoin.new(dateTime).then(function (instance) {
            coin = instance;
            return coin.sendTransaction({value: 1});
        }).then(function (result) {
            logger.log(result);
            assert.equal(result.logs[0].args.mold, 500);
            return coin.balanceOf(owner);
        }).then(function (result) {
            logger.log(result);
            assert.equal(result, 500);
        });
    });
    it("get token case 3", function () {
        let now = new Date();
        let dateTime = Math.floor((now.setHours(now.getHours() - 121)) / 1000);
        let coin = null;
        let owner = accounts[0];

        return MoldCoin.new(dateTime).then(function (instance) {
            coin = instance;
            return coin.sendTransaction({value: 1});
        }).then(function (result) {
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.mold, 333);
            return coin.balanceOf(owner);
        }).then(function (result) {
            logger.log(result);
            assert.equal(result, 333);
        });
    });
    it("get token case 4", function () {
        let now = new Date();
        let dateTime = Math.floor((now.setHours(now.getHours() - 360)) / 1000);
        let coin = null;
        let owner = accounts[0];

        return MoldCoin.new(dateTime).then(function (instance) {
            coin = instance;
            return coin.sendTransaction({value: 1});
        }).then(function (result) {
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.mold, 333);
            return coin.balanceOf(owner);
        }).then(function (result) {
            logger.log(result);
            assert.equal(result, 333);
        });
    });
    it("get token case 5", function () {
        let now = new Date();
        let dateTime = Math.floor((now.setHours(now.getHours() - 361)) / 1000);
        let coin = null;
        let owner = accounts[0];

        return MoldCoin.new(dateTime).then(function (instance) {
            coin = instance;
            return coin.sendTransaction({value: 1});
        }).then(function (result) {
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.mold, 250);
            return coin.balanceOf(owner);
        }).then(function (result) {
            logger.log(result);
            assert.equal(result, 250);
        });
    });
    it("get token case 6", function () {
        let now = new Date();
        let dateTime = Math.floor((now.setHours(now.getHours() - 2400)) / 1000);
        let coin = null;
        let owner = accounts[0];

        return MoldCoin.new(dateTime).then(function (instance) {
            coin = instance;
            return coin.sendTransaction({value: 1});
        }).then(function (result) {
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.mold, 250);
            return coin.balanceOf(owner);
        }).then(function (result) {
            logger.log(result);
            assert.equal(result, 250);
        });
    });
    it("get token case 7", function () {
        let now = new Date();
        let dateTime = Math.floor((now.setHours(now.getHours() - 2401)) / 1000);
        let coin = null;
        let owner = accounts[0];

        return MoldCoin.new(dateTime).then(function (instance) {
            coin = instance;
            return coin.sendTransaction({value: 1});
        }).catch(function (e) {
            logger.log(e);
            assert.instanceOf(e, Error);
        });
    });
    it("get token amount case 1", function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;
        let owner = accounts[0];

        return MoldCoin.new(dateTime).then(function (instance) {
            coin = instance;
            return coin.sendTransaction({value: 0});
        }).then(function (result) {
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.mold, 0);
            return coin.balanceOf(owner);
        }).then(function (result) {
            logger.log(result);
            assert.equal(result, 0);
        });
    });
    it("get token amount case 2", function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;
        let owner = accounts[0];

        return MoldCoin.new(dateTime).then(function (instance) {
            coin = instance;
            return coin.sendTransaction({value: 20 * 10**8 / 500});
        }).then(function (result) {
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.mold, 20 * 10**8);
            return coin.balanceOf(owner);
        }).then(function (result) {
            logger.log(result);
            assert.equal(result, 20 * 10**8);
        });
    });
    it("get token amount case 3", function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;

        return MoldCoin.new(dateTime).then(function (instance) {
            coin = instance;
            return coin.sendTransaction({value: (20 * 10**8 + 1) / 500});
        }).catch(function (e) {
            logger.log(e);
            assert.instanceOf(e, Error);
        });
    });
    it("get token amount case 4", function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;

        return MoldCoin.new(dateTime).then(function (instance) {
            coin = instance;
            return coin.sendTransaction({value: (20 * 10**8 - 500) / 500});
        }).then(function (result) {
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.mold, 20 * 10**8-500);
            return coin.saleTokenSupply.call();
        }).then(function (result) {
            logger.log(result);
            return coin.sendTransaction({value: 1});
        }).then(function (result) {
            logger.log(result);
            return coin.saleTokenSupply.call();
        }).then(function (result) {
            logger.log(result);
            return coin.sendTransaction({value: 1});
        }).then(function (result) {
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.mold, 500);
            return coin.sendTransaction({value: 1});
        }).catch(function (e) {
            logger.log(e);
            assert.instanceOf(e, Error);
        });
    });
});
