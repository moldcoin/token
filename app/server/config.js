/**
 * Created by lilong on 2017/07/08.
 */

const demohost = "https://mainnet.infura.io/MEDIUMTUTORIAL"

const mainnet = 'https://mainnet.infura.io/YhHYu1TQSarPFPYvEQbW'

const testnet = 'https://ropsten.infura.io/YhHYu1TQSarPFPYvEQbW'

const console = require('tracer').colorConsole();


function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

module.exports = {
  wait,
  console,
  mainnet,
  testnet
}