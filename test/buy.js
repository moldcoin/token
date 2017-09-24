const MoldCoin = artifacts.require("./MoldCoin.sol");
const utils = require("./utils");
const logger = utils.logger;
const toWei = utils.toWei;
const tokens = utils.tokens;

contract('Test Buy MoldCoin', function (accounts) {

  console.log(accounts)

  let founder = accounts[1];

  //Fetch deployed contracts
  before("fetch deployed instances", function () {
  });

  it("buy method", async function () {
    let dateTime = Math.floor(Date.now() / 1000);
    let owner = accounts[0];

    logger.log(owner);

    let ethBalance;
    {
      ethBalance = web3.eth.getBalance(founder);
      logger.info(ethBalance);

    }

    let instance = await MoldCoin.new(dateTime, founder);

    let tokenBalance;
    {
      tokenBalance = await instance.salesVolume();
      logger.info(tokenBalance);

    }

    {
      try{
        let result = await instance.buy({value: toWei(1), gas: 180000});
        logger.info(result);
        assert.equal(result.logs[0].args.tokens, tokens(15000 * 1));
        {
          let balance = web3.eth.getBalance(founder);
          console.info(balance);
          console.info(ethBalance.plus(toWei(1)), balance)
          assert.equal(ethBalance.plus(toWei(1)).toString(), balance.toString());

        }
      }catch(e){
        logger.info(e);
        {
          let balance = web3.eth.getBalance(founder);
          logger.info(balance);
          assert.equal(ethBalance.toString(), balance.toString());

        }

      }

    }
    {
      let balance = await instance.salesVolume();
      logger.info(balance);
      assert.equal(tokenBalance.plus(toWei(1)).toString(), balance.toString());

    }
    {
      let balance = await instance.balanceOf(owner);
      logger.log(balance);
      assert.equal(balance, tokens(15000 * 1));

    }
  });

  it("buy method with decimal", async function () {
    let dateTime = Math.floor(Date.now() / 1000);
    let coin = null;
    let owner = accounts[0];
    logger.log(owner);

    let instance = await MoldCoin.new(dateTime, founder);

    {
      let result = await instance.buy({value: toWei(1.23)});
      logger.log(result);
      assert.equal(result.logs[0].args.tokens, tokens(15000 * 1.23));
    }
    {
      let result = await instance.balanceOf(owner);
      logger.log(result);
      assert.equal(result, tokens(15000 * 1.23));
    }
  });

  it("default function", async function () {
    let dateTime = Math.floor(Date.now() / 1000);
    let coin = null;
    let owner = accounts[0];
    logger.log(owner);
    let instance = await MoldCoin.new(dateTime, founder);

    {
      let result = await instance.sendTransaction({value: toWei(1)});
      logger.log(result);
      assert.equal(result.logs[0].args.tokens, tokens(15000 * 1));
    }
    {
      let result = await instance.balanceOf(owner);
      logger.log(result);
      assert.equal(result, tokens(15000 * 1));
    }
  });
  it("buyRecipient case 1", async function () {
    let dateTime = Math.floor(Date.now() / 1000);
    let coin = null;
    let owner = accounts[0];
    logger.log(owner);
    let instance = await MoldCoin.new(dateTime, founder);

    {
      let result = await instance.buyRecipient(owner, {value: toWei(1)});
      logger.log(result);
      let log = result.logs[0].args;
      assert.equal(log.sender, owner);
      assert.equal(log.tokens, tokens(15000 * 1));
    }

    {
      let result = await instance.balanceOf(owner);
      logger.log(result);
      assert.equal(result, tokens(15000 * 1));
    }
  });
  it("buyRecipient case 2", async function () {
    let dateTime = Math.floor(Date.now() / 1000);
    let coin = null;
    let owner = accounts[0];
    let sendTo = accounts[1];

    logger.log(owner);
    let instance = await MoldCoin.new(dateTime, founder);

    {
      let result = await
      instance.buyRecipient(sendTo, {value: toWei(1)});
      logger.log(result);
      let log = result.logs[0].args;
      assert.equal(log.sender, sendTo);
      assert.equal(log.tokens, tokens(15000 * 1));
    }

    {
      let result = await instance.balanceOf(sendTo);
      logger.log(result);
      assert.equal(result, tokens(15000 * 1));
    }
  });
  it("buyRecipient case 3", async function () {
    let dateTime = Math.floor(Date.now() / 1000);
    let coin = null;
    let owner = accounts[0];
    let sendTo = accounts[1];

    logger.log(owner);

    let instance = await MoldCoin.new(dateTime, founder);

    {
      let result = await instance.buyRecipient(sendTo, {value: toWei(100)});
      logger.log(result);
      let log = result.logs[0].args;
      assert.equal(log.sender, sendTo);
      assert.equal(log.tokens, tokens(15000 * 100));
    }

    {
      let result = await instance.balanceOf(sendTo);
      logger.log(result);
      assert.equal(result, tokens(15000 * 100));
    }

  });

  it("buyRecipient case 4", async function () {
    let now = new Date();
    let dateTime = Math.floor((now.setHours(now.getHours() + 1)) / 1000);
    let coin = null;
    let owner = accounts[0];
    let sendTo = accounts[1];

    logger.log(owner);
    let instance = await MoldCoin.new(dateTime, founder);

    try {
      let result = await instance.buyRecipient(sendTo, {value: toWei(10)});
      logger.log(result);
    }catch(e){
      logger.log(e);
      assert.instanceOf(e, Error);

    }
  });

});
