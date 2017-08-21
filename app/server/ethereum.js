const config = require('./config')
//const console = config.console;

const Web3 = require('web3');

var MoldCoin = require("../../build/contracts/MoldCoin.json");

async function showMoldInfo(web3, contract) {

  let that = {};
  // console.log(contract)

  try {
    that.name = await contract.methods.name().call();
    // console.log(that.name)
    that.symbol = await contract.methods.symbol().call();
    let decimals = await contract.methods.decimals().call();
    that.decimals = parseInt(decimals);
    let amountRaised = await contract.methods.amountRaised().call();

    that.amountRaised = parseFloat(web3.utils.fromWei(amountRaised, 'ether'));


    let startDatetime = await contract.methods.startDatetime().call();
    that.startDatetime = new Date(startDatetime * 1000);

    let firstStageDatetime = await contract.methods.firstStageDatetime().call();
    that.firstStageDatetime = new Date(firstStageDatetime * 1000);
    let secondStageDatetime = await contract.methods.secondStageDatetime().call();
    that.secondStageDatetime = new Date(secondStageDatetime * 1000);
    let endDatetime = await contract.methods.endDatetime().call();
    that.endDatetime = new Date(endDatetime * 1000);

    // console.log(that)

    //捕捉所有的事件
    contract.events.allEvents()
      .on('data', function (event) {
        console.log(event); // same results as the optional callback above
      })
      .on('changed', function (event) {
        // remove event from local database
      })
      .on('error', console.error);

    // 获取过去的事件
    contract.getPastEvents("allEvents")
      .then(function (events) {
        console.log(events) // same results as the optional callback above
      })

    /*
        // 获取事件对象
        contract.events.Buy()
          .on('data', function (event) {
            console.log(event); // same results as the optional callback above
          })
          .on('changed', function (event) {
            // remove event from local database
          })
          .on('error', console.error);


        // 获取事件对象
        let withdrawEvent = contract.events.Withdraw()
          .on('data', function (event) {
            console.log(event); // same results as the optional callback above
          })
          .on('changed', function (event) {
            // remove event from local database
          })
          .on('error', console.error);

        // 获取事件对象
        contract.events.AllocateFounderTokens()
          .on('data', function (event) {
            console.log(event); // same results as the optional callback above
          })
          .on('changed', function (event) {
            // remove event from local database
          })
          .on('error', console.error);

        // 获取事件对象
        contract.events.AllocateAngelTokens()
          .on('data', function (event) {
            console.log(event); // same results as the optional callback above
          })
          .on('changed', function (event) {
            // remove event from local database
          })
          .on('error', console.error);

        // 获取事件对象
        contract.events.Transfer()
          .on('data', function (event) {
            console.log(event); // same results as the optional callback above
          })
          .on('changed', function (event) {
            // remove event from local database
          })
          .on('error', console.error);

        // 获取事件对象
        contract.events.Approval()
          .on('data', function (event) {
            console.log(event); // same results as the optional callback above
          })
          .on('changed', function (event) {
            // remove event from local database
          })
          .on('error', console.error);
    */
  } catch (e) {
    console.log(e)
  }


}


function watchAddressEvent(host) {
  var provider = new Web3.providers.HttpProvider(host);
  console.log(provider);

  const web3 = new Web3(provider);

  const instance = new web3.eth.Contract(MoldCoin.abi, config.contaractAddress);

  showMoldInfo(web3, instance)
}


module.exports = {
  watchAddressEvent
}


//如果是直接执行的，打出log
if (!module.parent) {
  var chalk = require('chalk');
  var figlet = require('figlet');
  console.log(
    chalk.yellow(
      figlet.textSync('Mold', {font: 'Ghost', horizontalLayout: 'full'})
    )
  );

  watchAddressEvent(config.testnet)

}