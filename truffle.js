var HDWalletProvider = require("truffle-hdwallet-provider")
var mnemonic = "donated making tinsel unfrosted immerse pointed tamer utopia letdown security cherub revolt"
var public = "0x005B090Faeeb12dccC13E28B5Bf7e1B88736E942"
require('babel-register')({
  ignore: /node_modules\/(?!zeppelin-solidity)/
});
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
    },
    coverage: {
      host: "localhost",
      network_id: "*",
      port: 8545,
      gas: 0xfffffffffff,
      gasPrice: 0x01
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://kovan.infura.io/NimxY2XmGSe8dH1xb3BD")
      },
      network_id: 3
  }
  },
  mocha: {
   useColors: true
  }
};
