var MoldCoin = artifacts.require("./MoldCoin.sol");

module.exports = function (deployer) {

    //We are planning to start crowdsale on 'Thu Jun 01 2017 09:00:00 GMT+0900 (JST)'
    var startDatetime = Math.floor(Date.parse('2017-06-01T00:00:00')/1000);

    deployer.deploy(MoldCoin, startDatetime);

};
