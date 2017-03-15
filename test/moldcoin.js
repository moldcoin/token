var MoldCoin = artifacts.require("./MoldCoin.sol");
var logger = require("tracer").console();

contract('MoldCoin', function (accounts) {
    it("should be '2017-06-01T00:00:00'， 1496275200 seconds", function () {
        return MoldCoin.deployed().then(function (instance) {
            return instance.startDatetime();
        }).then(function (startDatetime) {
            var timestamp = Math.floor(Date.parse('2017-06-01T00:00:00')/1000);
            assert.equal(startDatetime, timestamp, "1496275200 seconds");
        });
    });
});
