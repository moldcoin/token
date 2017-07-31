const MoldCoin = artifacts.require("./MoldCoin.sol");
const utils = require("./utils");
const logger = utils.logger;
const toWei = utils.toWei;
const tokens = utils.tokens;

contract('Date Range of MoldCoin', function (accounts) {
    logger.log(accounts);

    it("start time case 1", function () {
        return MoldCoin.deployed().then(function (instance) {
            return instance.startDatetime();
        }).then(function (startDatetime) {
            let timestamp = Math.floor(Date.parse('2017-09-01T00:00:00Z') / 1000);
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
    it("alloc founder token ", function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;

        return MoldCoin.new(dateTime).then(function (instance) {
            coin = instance;
            return coin.sendTransaction({value: toWei((20 * 10 ** 8 - 500) / 500)});
        }).then(function (result) {
            logger.log(result);
            return coin.allocateFounderTokens();
        }).catch(function (e) {
            logger.log(e);
            assert.instanceOf(e, Error);
        });
    });
});
