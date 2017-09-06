
const Web3 = require('web3');

const mainnet = 'https://mainnet.infura.io/YhHYu1TQSarPFPYvEQbW'
const testnet = 'https://ropsten.infura.io/YhHYu1TQSarPFPYvEQbW'
const testrpc = 'http://localhost:8545'

function wait(ms) {
  let start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

const contractAddress = '0xB38BFB880323fB5Ef3c9Ef00284505B707C4f09a'

const network = testnet;

let provider, isWalletProvider;
if (typeof web3 !== 'undefined') {
  provider = web3.currentProvider;
  isWalletProvider = true;
} else {
  provider = new Web3.providers.HttpProvider(network);
  isWalletProvider = false;
}

const web3 = new Web3(provider);

module.exports = {
  wait,
  network,
  contractAddress,
  isWalletProvider,
  provider,
  web3
}