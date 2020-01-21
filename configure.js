var path = require('path');

module.exports = {
    BWS_INSTANCE_URL: 'https://bws.bitpay.com/bws/api',
    networkType: "testnet",
    coinType: "btc",
    copayerName: "Edward Zhang",
    walletFilePath: path.join(__dirname, "../static/wallet_file"),
}
