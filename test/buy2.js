/**
 * Created by lilong on 2017/04/04.
 */
const MoldCoin = artifacts.require("./MoldCoin.sol");
const utils = require("./utils");
const logger = utils.logger;
const toWei = utils.toWei;
const tokens = utils.tokens;


contract('Get Token of MoldCoin', function (accounts) {
  console.log(accounts)
  let founder = accounts[1];

  //Fetch deployed contracts
  before("fetch deployed instances", function () {
  });

  it("get token case 1", function () {
    let now = new Date();
    let dateTime = Math.floor((now.setHours(now.getHours() - 1)) / 1000);
    let coin = null;
    let owner = accounts[0];

    return MoldCoin.new(dateTime, founder).then(function (instance) {
      coin = instance;
      return coin.sendTransaction({value: toWei(1)});
    }).then(function (result) {
      logger.log(result);
      assert.equal(result.logs[0].args.mold, tokens(500));
      return coin.balanceOf(owner);
    }).then(function (result) {
      logger.log(result);
      assert.equal(result, tokens(500));
    });
  });
  it("get token case 2", function () {
    let now = new Date();
    let dateTime = Math.floor((now.setHours(now.getHours() - 119)) / 1000);
    let coin = null;
    let owner = accounts[0];

    return MoldCoin.new(dateTime, founder).then(function (instance) {
      coin = instance;
      return coin.sendTransaction({value: toWei(1)});
    }).then(function (result) {
      logger.log(result);
      let log = result.logs[0].args;
      logger.log(log);
      assert.equal(log.mold, tokens(500));
      return coin.balanceOf(owner);
    }).then(function (result) {
      logger.log(result);
      assert.equal(result, tokens(500));
    });
  });
  it("get token case 3", function () {
    let now = new Date();
    let dateTime = Math.floor((now.setHours(now.getHours() - 121)) / 1000);
    let coin = null;
    let owner = accounts[0];

    return MoldCoin.new(dateTime, founder).then(function (instance) {
      coin = instance;
      return coin.sendTransaction({value: toWei(1)});
    }).then(function (result) {
      logger.log(result);
      let log = result.logs[0].args;
      assert.equal(log.mold, tokens(333));
      return coin.balanceOf(owner);
    }).then(function (result) {
      logger.log(result);
      assert.equal(result, tokens(333));
    });
  });
  it("get token case 4", function () {
    let now = new Date();
    let dateTime = Math.floor((now.setHours(now.getHours() - 359)) / 1000);
    let coin = null;
    let owner = accounts[0];

    return MoldCoin.new(dateTime, founder).then(function (instance) {
      coin = instance;
      return coin.sendTransaction({value: toWei(1)});
    }).then(function (result) {
      logger.log(result);
      let log = result.logs[0].args;
      logger.log(log.mold);
      assert.equal(log.mold, tokens(333));
      return coin.balanceOf(owner);
    }).then(function (result) {
      logger.log(result);
      assert.equal(result, tokens(333));
    });
  });
  it("get token case 5", function () {
    let now = new Date();
    let dateTime = Math.floor((now.setHours(now.getHours() - 361)) / 1000);
    let coin = null;
    let owner = accounts[0];

    return MoldCoin.new(dateTime, founder).then(function (instance) {
      coin = instance;
      return coin.sendTransaction({value: toWei(1)});
    }).then(function (result) {
      logger.log(result);
      let log = result.logs[0].args;
      assert.equal(log.mold, tokens(250));
      return coin.balanceOf(owner);
    }).then(function (result) {
      logger.log(result);
      assert.equal(result, tokens(250));
    });
  });
  it("get token case 6", function () {
    let now = new Date();
    let dateTime = Math.floor((now.setHours(now.getHours() - 2400 + 1)) / 1000);
    let coin = null;
    let owner = accounts[0];

    return MoldCoin.new(dateTime, founder).then(function (instance) {
      coin = instance;
      return coin.sendTransaction({value: toWei(1)});
    }).then(function (result) {
      logger.log(result);

      let log = result.logs[0].args;
      logger.log(log);
      assert.equal(log.mold, tokens(250));
      return coin.balanceOf(owner);
    }).then(function (result) {
      logger.log(result);
      assert.equal(result, tokens(250));
    });
  });
  it("get token case 7", function () {
    let now = new Date();
    let dateTime = Math.floor((now.setHours(now.getHours() - 2401)) / 1000);
    let coin = null;
    let owner = accounts[0];

    return MoldCoin.new(dateTime, founder).then(function (instance) {
      coin = instance;
      return coin.sendTransaction({value: toWei(1)});
    }).catch(function (e) {
      logger.log(e);
      assert.instanceOf(e, Error);
    });
  });
  it("get token amount case 1", function () {
    let dateTime = Math.floor(Date.now() / 1000);
    let coin = null;
    let owner = accounts[0];

    return MoldCoin.new(dateTime, founder).then(function (instance) {
      coin = instance;
      return coin.sendTransaction({value: toWei(0)});
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

    return MoldCoin.new(dateTime, founder).then(function (instance) {
      coin = instance;
      return coin.sendTransaction({value: toWei(20 * 10 ** 8 / 500)});
    }).then(function (result) {
      logger.log(result);
      let log = result.logs[0].args;
      assert.equal(log.mold, tokens(20 * 10 ** 8));
      return coin.balanceOf(owner);
    }).then(function (result) {
      logger.log(result);
      assert.equal(result, tokens(20 * 10 ** 8));
    });
  });
  it("get token amount case 3", function () {
    let dateTime = Math.floor(Date.now() / 1000);
    let coin = null;

    return MoldCoin.new(dateTime, founder).then(function (instance) {
      coin = instance;
      return coin.sendTransaction({value: toWei((20 * 10 ** 8 + 1) / 500)});
    }).catch(function (e) {
      logger.log(e);
      assert.instanceOf(e, Error);
    });
  });
  it("get token amount case 4", function () {
    let dateTime = Math.floor(Date.now() / 1000);
    let coin = null;

    return MoldCoin.new(dateTime, founder).then(function (instance) {
      coin = instance;
      return coin.sendTransaction({value: toWei((20 * 10 ** 8 - 500) / 500)});
    }).then(function (result) {
      logger.log(result);
      let log = result.logs[0].args;
      assert.equal(log.mold, tokens(20 * 10 ** 8 - 500));
      return coin.saleTokenSupply.call();
    }).then(function (result) {
      logger.log(result);
      return coin.sendTransaction({value: toWei(1)});
    }).then(function (result) {
      logger.log(result);
      return coin.saleTokenSupply.call();
    }).then(function (result) {
      logger.log(result);
      return coin.sendTransaction({value: toWei(1)});
    }).then(function (result) {
      logger.log(result);
      let log = result.logs[0].args;
      assert.equal(log.mold, tokens(500));
      return coin.sendTransaction({value: toWei(1)});
    }).catch(function (e) {
      logger.log(e);
      assert.instanceOf(e, Error);
    });
  });
});
