const axios = require('axios');

const urlBlockNumber = 'https://api.etherscan.io/api?module=proxy&action=eth_blockNumber';
const averageBlockTime = 17;

async function calBlockNumber(startDatetime) {
  const response = await axios.get(urlBlockNumber);
  const result = response.data.result;
  const currentBlockNumber = parseInt(result, 16);
  const currentDatetime = new Date();

  const oneHourMS = 60*60*1000;

  const firstStageDatetime = new Date(startDatetime.valueOf() + 120 * oneHourMS);
  const secondStageDatetime = new Date(firstStageDatetime.valueOf() + 240 * oneHourMS);
  const endDatetime = new Date(secondStageDatetime.valueOf() + 2040 * oneHourMS);

  const startBlock = currentBlockNumber + (startDatetime.valueOf()-currentDatetime.valueOf())/1000/averageBlockTime;
  const firstStageBlock = currentBlockNumber + (firstStageDatetime.valueOf()-currentDatetime.valueOf())/1000/averageBlockTime;
  const secondStageBlock = currentBlockNumber + (secondStageDatetime.valueOf()-currentDatetime.valueOf())/1000/averageBlockTime;
  const endBlock = currentBlockNumber + (endDatetime.valueOf()-currentDatetime.valueOf())/1000/averageBlockTime;

  console.log('Current Date', currentDatetime.toLocaleString());
  console.log('Current block', Math.round(currentBlockNumber));

  console.log('Start Date', startDatetime.toLocaleString());
  console.log('Start block', Math.round(startBlock));

  console.log('First Stage Date', firstStageDatetime.toLocaleString());
  console.log('First Stage block', Math.round(firstStageBlock));

  console.log('Second Stage Date', secondStageDatetime.toLocaleString());
  console.log('Second Stage block', Math.round(secondStageBlock));

  console.log('End Date', endDatetime.toLocaleString());
  console.log('End block', Math.round(endBlock));


  console.log('init parameters:');
  console.log(`${Math.round(startBlock)},${Math.round(firstStageBlock)},${Math.round(secondStageBlock)},${Math.round(endBlock)}`)

}

//Beijing Timezone
calBlockNumber(new Date('2017-10-1 12:00:00 GMT+0800'));

//calBlockNumber(new Date('2017-8-21 12:00:00 GMT+0800'));
