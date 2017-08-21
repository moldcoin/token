const MoldCoin = artifacts.require("./MoldCoin.sol");
const utils = require("./utils");
const logger = utils.logger;
const toWei = utils.toWei;
const tokens = utils.tokens;

contract('Administrator of Mold', function (accounts) {
  logger.log(accounts);
  let founder = accounts[1];

  it("alloc founder token ", async function () {
    let dateTime = Math.floor(Date.now() / 1000);

    let instance = await MoldCoin.new(dateTime, founder);
    try {
      let result = await instance.allocateFounderTokens();
      console.log(result);
      let holdCoin = await  instance.balanceOf(founder)
      console.log(holdCoin)
      assert.equal(parseFloat(holdCoin), 4 * 10**8 * 10**18);
    } catch (e) {
      logger.log(e);
    }
  });
  it("alloc angle tokens ", async function () {
    let dateTime = Math.floor(Date.now() / 1000);

    let instance = await MoldCoin.new(dateTime, founder);
    try {
      let result = await instance.allocateFounderTokens();
      console.log(result);
      let holdCoin = await  instance.balanceOf(founder)
      console.log(holdCoin)
      assert.equal(parseFloat(holdCoin), 4 * 10**8 * 10**18);
    } catch (e) {
      logger.log(e);
    }
  });
});
