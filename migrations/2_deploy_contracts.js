var MoldCoin = artifacts.require("./MoldCoin.sol");

var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");

module.exports = function (deployer) {

    //We are planning to start crowdsale on 'Thu Jun 01 2017 09:00:00 GMT+0900 (JST)'
    var startDatetime = Math.floor(Date.parse('2017-06-01T00:00:00')/1000);

    deployer.deploy(MoldCoin, startDatetime);

    deployer.deploy(ConvertLib);
    deployer.link(ConvertLib, MetaCoin);
    deployer.deploy(MetaCoin);

};
