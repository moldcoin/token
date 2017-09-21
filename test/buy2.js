/**
 * Created by lilong on 2017/04/04.
 */
const MoldCoin = artifacts.require('./MoldCoin.sol')
const utils = require('./utils')
const logger = utils.logger
const toWei = utils.toWei
const tokens = utils.tokens

contract('Buy MoldCoin 2', function (accounts) {
  console.log(accounts)
  let founder = accounts[1]

  //Fetch deployed contracts
  before('fetch deployed instances', function () {
  })

  it('get token case 1', async function () {
    let now = new Date()
    let dateTime = Math.floor((now.setHours(now.getHours() - 1)) / 1000)
    let coin = null
    let owner = accounts[0]

    let instance = await MoldCoin.new(dateTime, founder)

    {
      let result = await instance.sendTransaction({value: toWei(1)})
      logger.log(result)
      assert.equal(result.logs[0].args.tokens, tokens(15000))
    }
    {
      let result = await instance.balanceOf(owner)
      logger.log(result)
      assert.equal(result, tokens(15000))
    }
  })
  it('get token case 2', async function () {
    let now = new Date()
    let dateTime = Math.floor((now.setHours(now.getHours() - 119)) / 1000)
    let coin = null
    let owner = accounts[0]

    let instance = await MoldCoin.new(dateTime, founder)

    {
      let result = await instance.sendTransaction({value: toWei(1)})
      logger.log(result)
      assert.equal(result.logs[0].args.tokens, tokens(15000))
    }
    {
      let result = await instance.balanceOf(owner)
      logger.log(result)
      assert.equal(result, tokens(15000))
    }

  })
  it('get token case 3', async function () {
    let now = new Date()
    let dateTime = Math.floor((now.setHours(now.getHours() - 121)) / 1000)
    let coin = null
    let owner = accounts[0]

    let instance = await MoldCoin.new(dateTime, founder)

    {
      let result = await instance.sendTransaction({value: toWei(1)})
      logger.log(result)
      assert.equal(result.logs[0].args.tokens, tokens(12000))
    }
    {
      let result = await instance.balanceOf(owner)
      logger.log(result)
      assert.equal(result, tokens(12000))
    }

  })
  it('get token case 4', async function () {
    let now = new Date()
    let dateTime = Math.floor((now.setHours(now.getHours() - 359)) / 1000)
    let coin = null
    let owner = accounts[0]

    let instance = await MoldCoin.new(dateTime, founder)

    {
      let result = await instance.sendTransaction({value: toWei(1)})
      logger.log(result)
      assert.equal(result.logs[0].args.tokens, tokens(12000))
    }
    {
      let result = await instance.balanceOf(owner)
      logger.log(result)
      assert.equal(result, tokens(12000))
    }

  })
  it('get token case 5', async function () {
    let now = new Date()
    let dateTime = Math.floor((now.setHours(now.getHours() - 361)) / 1000)
    let coin = null
    let owner = accounts[0]

    let instance = await MoldCoin.new(dateTime, founder)

    {
      let result = await instance.sendTransaction({value: toWei(1)})
      logger.log(result)
      assert.equal(result.logs[0].args.tokens, tokens(10000))
    }
    {
      let result = await instance.balanceOf(owner)
      logger.log(result)
      assert.equal(result, tokens(10000))
    }
  })
  it('get token case 6', async function () {
    let now = new Date()
    let dateTime = Math.floor((now.setHours(now.getHours() - 2400 + 1)) / 1000)
    let coin = null
    let owner = accounts[0]

    let instance = await MoldCoin.new(dateTime, founder)

    {
      let result = await instance.sendTransaction({value: toWei(1)})
      logger.log(result)
      assert.equal(result.logs[0].args.tokens, tokens(10000))
    }
    {
      let result = await instance.balanceOf(owner)
      logger.log(result)
      assert.equal(result, tokens(10000))
    }
  })
  it('get token case 7', async function () {
    let now = new Date()
    let dateTime = Math.floor((now.setHours(now.getHours() - 2401)) / 1000)
    let coin = null
    let owner = accounts[0]
    let sendTo = accounts[1]

    let instance = await MoldCoin.new(dateTime, founder)

    try {
      let result = await instance.buyRecipient(sendTo, {value: toWei(10)})
      logger.log(result)
    } catch (e) {
      logger.log(e)
      assert.instanceOf(e, Error)

    }
  })
  it('get token amount case 1', async function () {
    let dateTime = Math.floor(Date.now() / 1000)
    let coin = null
    let owner = accounts[0]

    let instance = await MoldCoin.new(dateTime, founder)

    {
      let result = await instance.sendTransaction({value: toWei(0)})
      logger.log(result)
      assert.equal(result.logs[0].args.tokens, tokens(0))
    }
    {
      let result = await instance.balanceOf(owner)
      logger.log(result)
      assert.equal(result, tokens(0))
    }
  })

  it('get token amount case 2', async function () {
    let dateTime = Math.floor(Date.now() / 1000) - (120 + 240) * 60 * 60 - 1
    let coin = null
    let owner = accounts[0]

    let instance = await MoldCoin.new(dateTime, founder)

    {
      let result = await instance.sendTransaction({value: toWei(20 * 10 ** 8 / 10000)})
      logger.log(result)
      assert.equal(result.logs[0].args.tokens, tokens(20 * 10 ** 8))
    }
    {
      let result = await instance.balanceOf(owner)
      logger.log(result)
      assert.equal(result, tokens(20 * 10 ** 8))
    }

  })

  it('get token amount case 3', async function () {
    let dateTime = Math.floor(Date.now() / 1000)
    let coin = null
    let sendTo = accounts[1]

    let instance = await MoldCoin.new(dateTime, founder)

    try {
      let result = await instance.buyRecipient(sendTo, {value: toWei((20 * 10 ** 8 + 1) / 15000)})
      logger.log(result)
    } catch (e) {
      logger.log(e)
      assert.instanceOf(e, Error)

    }

  })
  it('get token amount case 4', async function () {
    let dateTime = Math.floor(Date.now() / 1000) - (120 + 240) * 60 * 60 - 1
    let coin = null

    let instance = await MoldCoin.new(dateTime, founder)

    {
      let result = await instance.sendTransaction({value: toWei((20 * 10 ** 8 - 10000) / 10000)})
      logger.log(result)
      assert.equal(result.logs[0].args.tokens, tokens(20 * 10 ** 8 - 10000))
    }
    {
      let result = await instance.salesVolume.call()
      logger.log(result)
      assert.equal(result.toString(10), toWei((20 * 10 ** 8 - 10000) / 10000))
    }

    {
      let result = await instance.saleTokenSupply.call()
      logger.log(result)
      assert.equal(result.toString(10), tokens(20 * 10 ** 8 - 10000))
    }
    {
      let result = await instance.sendTransaction({value: toWei(1)})
      logger.log(result)
      assert.equal(result.logs[0].args.tokens, tokens(10000))
    }
    {
      let result = await instance.saleTokenSupply.call()
      logger.log(result)
      assert.equal(result.toString(10), tokens(20 * 10 ** 8))
    }

    try {
      {
        let result = await instance.sendTransaction({value: toWei(1)})
        logger.info(result)
        assert.equal(result.tokens, tokens(15000))
      }
      // {
      //   let result = await instance.saleTokenSupply.call();
      //   logger.log(result);
      //   assert.equal(result.toString(10), tokens(20 * 10 ** 8));
      // }
    } catch (e) {
      logger.log(e)
      assert.instanceOf(e, Error)

    }

  })
})
