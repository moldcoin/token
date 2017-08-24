const MoldCoin = artifacts.require("./MoldCoin.sol");
const utils = require("./utils");
const logger = utils.logger;
const toWei = utils.toWei;
const tokens = utils.tokens;

contract('Date Range of MoldCoin', function (accounts) {
  logger.log(accounts);
  let founder = accounts[1];

  it("start time case 1", async function () {
    let wantDate = new Date('2017-09-01T00:00:00Z')

    let instance = await MoldCoin.deployed();
    let startDatetime = await instance.startDatetime();
    logger.log(startDatetime)
    {
      let timestamp = Math.floor(wantDate.valueOf() / 1000);
      logger.log(timestamp)
      assert.equal(startDatetime, timestamp);
    }

    let firstStageDatetime = await instance.firstStageDatetime();
    {
      let timestamp = parseFloat(startDatetime) + 120*60*60;
      assert.equal(firstStageDatetime, timestamp);
    }

    let secondStageDatetime = await instance.secondStageDatetime();
    {
      let timestamp = parseFloat(firstStageDatetime) + 240*60*60;
      assert.equal(secondStageDatetime, timestamp);
    }

    let endDatetime = await instance.endDatetime();
    {
      let timestamp = parseFloat(secondStageDatetime) + 2040*60*60;
      assert.equal(endDatetime, timestamp);
    }

    let lastReleaseDatetime = await instance.endDatetime();
    {
      let timestamp = parseFloat(secondStageDatetime) + 2040*60*60;
      assert.equal(lastReleaseDatetime, timestamp);
    }

  });

  it("start time case 2", async function () {
    let dateTime = Math.floor(Date.now() / 1000);

    let instance = await MoldCoin.new(dateTime, founder);
    let startDatetime = await instance.startDatetime();
    logger.log(startDatetime)
    {
      let timestamp = dateTime;
      assert.equal(startDatetime, timestamp);
    }

    let firstStageDatetime = await instance.firstStageDatetime();
    {
      let timestamp = parseFloat(startDatetime) + 120*60*60;
      assert.equal(firstStageDatetime, timestamp);
    }

    let secondStageDatetime = await instance.secondStageDatetime();
    {
      let timestamp = parseFloat(firstStageDatetime) + 240*60*60;
      assert.equal(secondStageDatetime, timestamp);
    }

    let endDatetime = await instance.endDatetime();
    {
      let timestamp = parseFloat(secondStageDatetime) + 2040*60*60;
      assert.equal(endDatetime, timestamp);
    }

    let lastReleaseDatetime = await instance.endDatetime();
    {
      let timestamp = parseFloat(secondStageDatetime) + 2040*60*60;
      assert.equal(lastReleaseDatetime, timestamp);
    }
  });
});
