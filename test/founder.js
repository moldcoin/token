const MoldCoin = artifacts.require('./MoldCoin.sol')
const utils = require('./utils')
const logger = utils.logger
const toWei = utils.toWei
const tokens = utils.tokens

contract('Administrator of Mold', function (accounts) {
  logger.log(accounts)
  let owner = accounts[0]
  let founder = accounts[1]
  let user1 = accounts[2]
  let user2 = accounts[3]

  it('alloc founder token ', async function () {
    let dateTime = Math.floor(Date.now() / 1000)

    let instance = await MoldCoin.new(dateTime, founder)
    try {
      let result = await instance.allocateFounderTokens()
      logger.log(result)
      let holdCoin = await  instance.balanceOf(founder)
      logger.log(holdCoin)
      assert.equal(parseFloat(holdCoin), tokens(3 * 10 ** 8))
    } catch (e) {
      logger.log(e)
      assert.instanceOf(e, Error)
    }
  })

  it('alloc founder token after crowsale ', async function () {
    let dateTime = Math.floor(Date.now() / 1000) - (120 + 240 + 2040) * 60 * 60 - 1

    let instance = await MoldCoin.new(dateTime, founder)
    let result = await instance.allocateFounderTokens()
    logger.log(result)
    let holdCoin = await  instance.balanceOf(founder)
    logger.log(holdCoin)
    assert.equal(parseFloat(holdCoin), tokens(3 * 10 ** 8))

  })

  it('alloc founder token after crowsale by user', async function () {
    let dateTime = Math.floor(Date.now() / 1000) - (120 + 240 + 2040) * 60 * 60 - 1

    try {
      let instance = await MoldCoin.new(dateTime, founder)
      let result = await instance.allocateFounderTokens({from: user1})
      logger.log(result)
      let holdCoin = await  instance.balanceOf(founder)
      logger.log(holdCoin)
      assert.equal(parseFloat(holdCoin), tokens(3 * 10 ** 8))
    } catch (e) {
      logger.log(e)
      assert.instanceOf(e, Error)
    }

  })

  it('alloc angel tokens ', async function () {
    let dateTime = Math.floor(Date.now() / 1000)

    let angel1 = accounts[1]
    let angel2 = accounts[2]
    let angel3 = accounts[3]

    let instance = await MoldCoin.new(dateTime, founder)
    {

      let result = await instance.allocateAngelTokens(angel1, tokens(1000))
      logger.log(result)
      let holdCoin = await  instance.balanceOf(angel1)
      logger.log(holdCoin)
      assert.equal(parseFloat(holdCoin), tokens(1000))
    }

    {

      let result = await instance.allocateAngelTokens(angel2, tokens(1000))
      logger.log(result)
      let holdCoin = await  instance.balanceOf(angel2)
      logger.log(holdCoin)
      assert.equal(parseFloat(holdCoin), tokens(1000))
    }

    {

      let result = await instance.allocateAngelTokens(angel2, tokens(1000))
      logger.log(result)
      let holdCoin = await  instance.balanceOf(angel2)
      logger.log(holdCoin)
      assert.equal(parseFloat(holdCoin), tokens(2000))
    }
  })

  it('alloc angel tokens by user', async function () {
    let dateTime = Math.floor(Date.now() / 1000) - (120 + 240 + 2040) * 60 * 60 - 1

    try {
      let instance = await MoldCoin.new(dateTime, founder)
      let result = await instance.allocateAngelTokens(user1, tokens(1000), {from: user1})
      let holdCoin = await  instance.balanceOf(user1)
      logger.log(holdCoin)
      assert.equal(parseFloat(holdCoin), tokens(3 * 10 ** 8))
    } catch (e) {
      logger.log(e)
      assert.instanceOf(e, Error)
    }

  })

  it('admin halt', async function () {
    let dateTime = Math.floor(Date.now() / 1000) - 1

    let instance = await MoldCoin.new(dateTime, founder)
    let result = await instance.sendTransaction({value: toWei(1), from: user1})
    logger.log(result)
    try {
      {
        let result = await instance.halt();
        logger.log(result)
      }

      let result = await instance.sendTransaction({value: toWei(1), from: user1})
      logger.log(result)

    } catch (e) {
      logger.log(e)
      assert.instanceOf(e, Error)
    }

    {
      let result = await instance.unhalt();
      logger.log(result)
    }

    {
      let result = await instance.sendTransaction({value: toWei(1), from: user1})
      logger.log(result)

    }

  })

})
