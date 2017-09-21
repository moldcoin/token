<template>
    <div class="am-container">
        <h2>MOLD Smart Contract</h2>
        <h4 v-if="isTestNetwork">Test network</h4>

        <div class="am-g">
            <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">Contract Address</div>
            <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                <div><code>{{ contractAddress }}</code></div>
                <div class="text-center" id="qrcode" ref="qrCode">
                </div>
            </div>
            <h4>Contract Details</h4>
            <div class="am-g">
                <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">Name</div>
                <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                    {{ name }}
                </div>
            </div>
            <div class="am-g">
                <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">Symbol</div>
                <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                    {{ symbol }}
                </div>
            </div>
            <div class="am-g">
                <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">Decimals</div>
                <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                    {{ decimals }}
                </div>
            </div>
            <div class="am-g">
                <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">Sales Volume</div>
                <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                    {{ salesVolume }} ETH
                </div>
            </div>
            <div class="am-g">
                <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">Pre-sell Start Time </div>
                <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                    {{ startDatetime | format }}
                </div>
            </div>
            <div class="am-g">
                <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">Pre-sell First Stage Time</div>
                <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                    {{ firstStageDatetime | format }}
                </div>
            </div>
            <div class="am-g">
                <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">Pre-sell Second Stage Time</div>
                <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                    {{ secondStageDatetime | format }}
                </div>
            </div>
            <div class="am-g">
                <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">Pre-sell End Time</div>
                <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                    {{ endDatetime | format}}
                </div>
            </div>
        </div>
        <p></p>
        <div v-if="walletProvider">
            <h4>Wallet Info</h4>
            <div class="am-g" v-if="isTestNetwork && network.chain == 'mainnet'">
                <div class="am-panel am-panel-danger">
                    <strong>No Match Network</strong>
                </div>
            </div>
            <div class="am-g">
                <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">Network</div>
                <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                    {{ network.chain }}
                </div>
            </div>

            <div v-if=" accounts.length>0 ">
                <div class="am-g">
                    <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">Account</div>
                    <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                        {{ accounts[0] }}
                    </div>
                </div>
                <div class="am-g">
                    <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">ETH Balance</div>
                    <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                        {{ balance }} ETH
                    </div>
                </div>
                <div class="am-g">
                    <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">MOLD Balance</div>
                    <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                        {{ moldBalance }} MLD
                    </div>
                </div>

                <hr>
                <div class="am-g">
                    <form class="am-form-inline" role="form">
                        <div class="am-form-group">
                            <input type="number" class="am-form-field" placeholder="xx ETH" v-model="inputEth">ETH
                        </div>
                        <button type="button" class="am-btn am-btn-default" v-on:click="buyMold">Back it</button>
                    </form>
                </div>
                <hr>

                <div class="am-g">
                    <form class="am-form-inline" role="form">

                        <div class="am-form-group">
                            Transfer Address:<input type="text" class="am-form-field" placeholder="0xABC...XYZ Addresss"
                                        v-model="inputTransferAddress">
                        </div>
                        <div class="am-form-group">
                            <input type="number" class="am-form-field" placeholder="xx MLD" v-model="inputMld">MLD
                        </div>
                        <button type="button" class="am-btn am-btn-default" v-on:click="TransferMold">Send</button>
                    </form>
                </div>

            </div>
            <div v-else>Please unlock wallet</div>
        </div>
        <div v-else>
            <h4>No Wallet</h4>
        </div>

    </div>
</template>
<style>
    body {
    }
</style>

<script>
  const Web3 = require('web3')
  const moment = require('moment')
  //moment.locale('zh-cn')

  const QRCode = require('qrcodejs2')

  const mainnet = 'https://mainnet.infura.io/YhHYu1TQSarPFPYvEQbW'
  const testnet = 'https://ropsten.infura.io/YhHYu1TQSarPFPYvEQbW'
  //使用测试网络
  const network = mainnet

  //
  let web3

  module.exports = {
    data () {
      return {
        isTestNetwork: false,
        contractAddress: '0x52E30201f31283dc5F7928b4198896083F604416',
        walletProvider: undefined,
        infuraProvider: '',
        accounts: [],
        balance: 0,
        network: {},
        name: '',
        symbol: '',
        decimals: 0,
        salesVolume: 0,
        startDatetime: null,
        firstStageDatetime: null,
        secondStageDatetime: null,
        endDatetime: null,
        Mold: null,
        moldBalance: 0,
        inputEth: 0.1,
        inputMld: 100,
        inputTransferAddress: ''
      }
    },

    filters: {
      format (date) {
        if (date)
          return date.format() + ' - ' + date.fromNow();
        else return ''
      }
    },

    components: {},

    methods: {
      wait (ms) {
        let start = new Date().getTime()
        let end = start
        while (end < start + ms) {
          end = new Date().getTime()
        }
      },

      showQR () {
        const text = this.contractAddress
        console.log(this.$refs)
        this.$refs.qrCode.innerHTML = ''
        new QRCode(this.$refs.qrCode, {
          text: text,
          width: 150,
          height: 150,
        })
      },
      async showMoldInfo () {
        let Mold = this.Mold
        let instance = await Mold.at(this.contractAddress)
        console.log(instance)

        this.name = await instance.name()
        this.symbol = await instance.symbol()
        let decimals = await instance.decimals()
        this.decimals = parseInt(decimals)
        let salesVolume = await instance.salesVolume()

        this.salesVolume = parseFloat(web3.fromWei(salesVolume, 'ether'))

        let startDatetime = await instance.startDatetime()
        this.startDatetime = new moment(startDatetime * 1000)
        let firstStageDatetime = await instance.firstStageDatetime()
        this.firstStageDatetime = new moment(firstStageDatetime * 1000)
        let secondStageDatetime = await instance.secondStageDatetime()
        this.secondStageDatetime = new moment(secondStageDatetime * 1000)
        let endDatetime = await instance.endDatetime()
        this.endDatetime = new moment(endDatetime * 1000)

        // 获取事件对象
        let buyEvent = instance.Buy()
        // 监听事件，监听到事件后会执行回调函数
        buyEvent.watch((err, result) => {
          if (!err) {
            console.log(result)
            this.showMoldInfo()
            this.updateAccount()
          } else {
            console.log(err)
          }
        })
        // 获取事件对象
        let transferEvent = instance.Transfer()
        // 监听事件，监听到事件后会执行回调函数
        transferEvent.watch((err, result) => {
          if (!err) {
            console.log(result)
            this.updateAccount()
          } else {
            console.log(err)
          }
        })
      },
      async getBalance (account) {
//        let web3 = this.web3;

        web3.eth.getBalance(account, (err, balance) => {
          if (err) {
            console.log(err, balance)
            return
          }
          this.balance = parseFloat(web3.fromWei(balance, 'ether'))

        })
        let Mold = this.Mold
        let instance = await Mold.at(this.contractAddress)
        console.log(instance)
        let moldBalance = await instance.balanceOf(account)
        console.log(moldBalance)
        this.moldBalance = parseFloat(web3.fromWei(moldBalance, 'ether'))

      },
      updateAccount () {

        web3.eth.getAccounts((err, accounts) => {
          console.log(err, accounts)

          if (err) {
            console.log(err, accounts)
            return
          }
          this.accounts = accounts
          if (accounts.length > 0) {
            this.getBalance(accounts[0])
          }
        })

        web3.eth.getBlock(0, (err, block) => {
          var data = {}

          if (block && block.hash === '0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3') {
            data.chain = 'mainnet'
            data.etherscan = 'https://etherscan.io'
          }
          else if (block && block.hash === '0x41941023680923e0fe4d74a34bdac8141f2540e3ae90623718e47d66d1ca4a2d') {
            data.chain = 'ropsten'
            data.etherscan = 'https://testnet.etherscan.io'
          }
          else if (block && block.hash === '0xa3c565fc15c7478862d50ccd6561e3c06b24cc509bf388941c25ea985ce32cb9') {
            data.chain = 'kovan'
            data.etherscan = 'https://kovan.etherscan.io'
          }
          else {
            data.chain = 'privatenet'
            data.etherscan = 'https://testnet.etherscan.io'
          }

          this.network = data
        })

//        web3.version.getNetwork((err, result) => {
//
//          console.log(err, result)
//        })
      },

      async buyMold () {
        let Mold = this.Mold
        let instance = await Mold.at(this.contractAddress)
        console.log(instance)

        Mold.defaults({from: window.web3.eth.coinbase})
//        let result = await instance.buy({value: web3.toWei(this.inputEth)})
        let result = await instance.sendTransaction({value: web3.toWei(this.inputEth)})
        console.log(result)

      },

      async TransferMold () {
        let Mold = this.Mold
        let instance = await Mold.at(this.contractAddress)
        console.log(instance)

        web3.eth.defaultAccount = this.accounts[0]
        Mold.defaults({from: window.web3.eth.coinbase})
        console.log(this.inputTransferAddress, web3.toWei(this.inputMld))
        let result = await instance.transfer(this.inputTransferAddress, web3.toWei(this.inputMld))
        console.log(result)

      }

    },

    mounted () {

      //显示二维码
      this.showQR()

      //判断是否有web钱包
      let provider
      if (typeof window.web3 !== 'undefined') {
        provider = this.walletProvider = window.web3.currentProvider
      } else {
        provider = this.infuraProvider = new Web3.providers.HttpProvider(network)
      }

      console.log(web3, window.web3)
      console.log(provider, this.walletProvider, this.infuraProvider)

      web3 = new Web3(provider)

      const MoldCoin = require('../contracts/MoldCoin.json')
      const contract = require('truffle-contract')

      console.log(MoldCoin)

      const Mold = contract(MoldCoin)
      Mold.setProvider(provider)
      this.Mold = Mold
      this.showMoldInfo()

      this.updateAccount()
      setInterval(() => {
        web3.eth.getAccounts((err, accounts) => {
          if (err) {
            console.log(err, accounts)
            return
          }

          if (accounts[0] !== this.accounts[0]) {
            this.updateAccount()
          }
        })
      }, 2000)

    }
  }

</script>
