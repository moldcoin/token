
const Web3 = require('web3')
const SolidityCoder = require('web3/lib/solidity/coder');

const web3 = new Web3()

const startDatetime = Math.floor(Date.parse('2017-09-01T00:00:00Z') / 1000);
const founder = '0x5B8B75Dd1E7831563a523F6bf277BEEF714ff3c8';
const admin = '0x5C8f033E2A29467D867c664D62BAa08C2d332761';

console.log(`${startDatetime},"${founder}"`)

//0x9a51f8fdd2d43c79da4549d452d35970bbefc48f

"0x0000000000000000000000000000000000000000000000000000000059a8a300"
"0x0000000000000000000000005b8b75dd1e7831563a523f6bf277beef714ff3c8"

//https://etherscanio.freshdesk.com/support/solutions/articles/16000053599-contract-verification-constructor-arguments
// 0000000000000000000000000000000000000000000000000000000059a8a3000000000000000000000000005b8b75dd1e7831563a523f6bf277beef714ff3c8

const c = SolidityCoder.encodeParams(['uint256','address'], [startDatetime, founder]);
console.log(c)
console.log(c == '0000000000000000000000000000000000000000000000000000000059a8a3000000000000000000000000005b8b75dd1e7831563a523f6bf277beef714ff3c8')