const MoldCoin = artifacts.require("./MoldCoin.sol");

module.exports = function (deployer, network) {
    if (network == "live") {
        //We are planning to start crowdsale on 'Thu Jun 01 2017 09:00:00 GMT+0900 (JST)'
        let startDatetime = Math.floor(Date.parse('2017-09-01T00:00:00Z') / 1000);
        deployer.deploy(MoldCoin, startDatetime);
    } else if (network == "testnet") {
        //We are planning to start crowdsale on 'Thu Jun 01 2017 09:00:00 GMT+0900 (JST)'
        let startDatetime = Math.floor(Date.parse('2017-09-01T00:00:00Z') / 1000);
        // var startDatetime = Math.floor(Date.now() / 1000);

        deployer.deploy(MoldCoin, startDatetime);
    } else {
        //We are planning to start crowdsale on 'Thu Jun 01 2017 09:00:00 GMT+0900 (JST)'
        let startDatetime = Math.floor(Date.parse('2017-09-01T00:00:00Z') / 1000);
        // var startDatetime = Math.floor(Date.now() / 1000);

        deployer.deploy(MoldCoin, startDatetime);
    }

};
