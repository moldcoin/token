const MoldCoin = artifacts.require("./MoldCoin.sol");
const utils = require("./utils");
const logger = utils.logger;
const toWei = utils.toWei;
const tokens = utils.tokens;

contract('Test Buy MoldCoin', function (accounts) {

    //Fetch deployed contracts
    before("fetch deployed instances",function(){
    });

    it("buy method", function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;
        let owner = accounts[0];

        logger.log(owner);
        return MoldCoin.new(dateTime).then(function (instance) {
            //logger.log(instance);
            coin = instance;
            return coin.buy({value: toWei(1)});
        }).then(function (result) {
            logger.log(result);
            assert.equal(result.logs[0].args.mold, tokens(500*1));
            return coin.balanceOf(owner);
        }).then(function (result) {
            logger.log(result);
            assert.equal(result, tokens(500*1));
        });
    });

    it("buy method with decimal", function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;
        let owner = accounts[0];

        logger.log(owner);
        return MoldCoin.new(dateTime).then(function (instance) {
            //logger.log(instance);
            coin = instance;
            return coin.buy({value: toWei(1.23)});
        }).then(function (result) {
            logger.log(result);
            assert.equal(result.logs[0].args.mold, tokens(500*1.23));
            return coin.balanceOf(owner);
        }).then(function (result) {
            logger.log(result);
            assert.equal(result, tokens(500*1.23));
        });
    });

    it("default function", function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;
        let owner = accounts[0];
        logger.log(owner);
        return MoldCoin.new(dateTime).then(function (instance) {
            coin = instance;
            return coin.sendTransaction({value: toWei(1)});
        }).then(function (result) {
            logger.log(result);
            assert.equal(result.logs[0].args.mold, tokens(500*1));
            return coin.balanceOf(owner);
        }).then(function (result) {
            logger.log(result);
            assert.equal(result, tokens(500*1));
        });
    });
    it("buyRecipient case 1", function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;
        let owner = accounts[0];
        logger.log(owner);
        return MoldCoin.new(dateTime).then(function (instance) {
            coin = instance;
            return coin.buyRecipient(owner, {value: toWei(1)});
        }).then(function (result) {
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.sender, owner);
            assert.equal(log.mold, tokens(500*1));
            return coin.balanceOf(owner);
        }).then(function (result) {
            logger.log(result);
            assert.equal(result, tokens(500*1));
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
            return coin.buyRecipient(sendTo, {value: toWei(1)});
        }).then(function (result) {
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.sender, sendTo);
            assert.equal(log.mold, tokens(500*1));
            return coin.balanceOf(sendTo);
        }).then(function (result) {
            logger.log(result);
            assert.equal(result, tokens(500*1));
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
            return coin.buyRecipient(sendTo, {value: toWei(100)});
        }).then(function (result) {
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.sender, sendTo);
            logger.log(log);
            assert.equal(log.mold, tokens(500*100));
            return coin.balanceOf(sendTo);
        }).then(function (result) {
            logger.log(result);
            assert.equal(result, tokens(500*100));
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
            return coin.buyRecipient(sendTo, {value: toWei(10)});
        }).catch(function (e) {
            logger.log(e);
        });
    });

});
