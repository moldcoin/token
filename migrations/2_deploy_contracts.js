const MoldCoin = artifacts.require("./MoldCoin.sol");

module.exports = function (deployer, network, accounts) {
  //console.log(arguments)
  if (network === "live") {

    //We are planning to start crowdsale on 'Thu Jun 01 2017 09:00:00 GMT+0900 (JST)'
    let startDatetime = Math.floor(Date.parse('2017-09-01T00:00:00Z') / 1000);
    let founder = '0xb851d6be278c1967e488ab95e7b83a32962dd7a1';

    deployer.deploy(MoldCoin, startDatetime, founder);
  } else if (network === "testnet") {

    //We are planning to start crowdsale on 'Thu Jun 01 2017 09:00:00 GMT+0900 (JST)'
    let startDatetime = Math.floor(Date.parse('2017-09-01T00:00:00Z') / 1000);
    let founder = '0xff4ed6947b40b982543c017be3d438627d6a9565';

    deployer.deploy(MoldCoin, startDatetime);
  } else {
    let founder = accounts[1];
    //We are planning to start crowdsale on 'Thu Jun 01 2017 09:00:00 GMT+0900 (JST)'
    let startDatetime = Math.floor(Date.parse('2017-09-01T00:00:00Z') / 1000);
    // var startDatetime = Math.floor(Date.now() / 1000);

    deployer.deploy(MoldCoin, startDatetime, founder);
  }

};
