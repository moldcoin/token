<template>
    <div class="am-container">
        <h2>MoldCoin Ethereum SmartContract</h2>
        <h4>Buy token</h4>
        <p>Send your ethereum to the address to buy moldcoins</p>

        <div class="am-g">
            <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">Smart contract address</div>
            <div class="am-u-sm-6 am-u-md-8 am-u-lg-9"><code>{{ address }}</code></div>
        </div>
        <div class="am-g">
            <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">Smart contract QR code</div>
            <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                <div class="text-center" id="qrcode" ref="qrCode">
                </div>
            </div>
        </div>
        <hr>
        <div class="am-g">
        <form class="am-form-inline" role="form">
            <div class="am-form-group">
                <label for="doc-ipt-3" class="am-u-sm-4 am-u-md-4 am-u-lg-3 am-form-label">Buyer Address</label>
                <div class="am-u-sm-4 am-u-md-6 am-u-lg-7">
                    <input type="text" id="doc-ipt-3" placeholder="0x0000000">
                </div>
            </div>
            <button type="submit" class="am-btn am-btn-default am-btn-sm">Query</button>
        </form>
        </div>
        <h3>Token stats</h3>

        <div class="sale">
        </div>

    </div>
</template>
<style>
    body {
    }
</style>

<script>
    module.exports = {
        data() {
            return {
                address: "0x12345678901234567890123456789012345678901234567890",
                loginFail: false,
                uuid: ""
            }
        },

        components: {},

        methods: {
            showQR() {
                const qrCode = this.address;
                this.$refs.qrCode.innerHTML = '';
                new QRCode(this.$refs.qrCode, {
                    text:qrCode,
                    width: 150,
                    height: 150,
                });
            },
        },

        mounted() {

            var Web3 = require('web3');
            var MoldCoin = require("../../build/contracts/MoldCoin.json");
            var contract = require("truffle-contract");

            var mold = contract(MoldCoin);
            var provider = new Web3.providers.HttpProvider("http://localhost:8545");

            mold.setProvider(provider);

            let networks = Object.values(mold.networks);
            console.log(networks[networks.length-1].address);

            this.address = networks[networks.length-1].address;
            this.showQR();

            var coin;
            mold.deployed().then(function(instance) {
                coin = instance;
                return coin.name.call();
            }).then(function(result){
                console.log(result);
                return coin.startDatetime.call();
            }).then(function(result){
                console.log(result);
                return coin.totalSupply();
            }).then(function(result){
                console.log(result);
                return coin.saleTokenSupply();
            }).then(function(result){
                console.log(result);
            });


        }
    }

</script>
