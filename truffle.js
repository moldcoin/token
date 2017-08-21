//
// var providerUrl = "https://testnet.infura.io";
//
// var engine = new ProviderEngine();
// engine.addProvider(new WalletSubprovider(wallet, {}));
// engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)));
// engine.start(); // Required by the provider engine.

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    // ropsten: {
    //   provider: engine,
    //   from: address,
    //   network_id: 3 // Official ropsten network id
    // }

  }
};
