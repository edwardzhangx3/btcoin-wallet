
let config = require("../configure")
/*code from bitpay/bitcore-wallet-client*/
module.exports = {
    getClient: () => {
        var Client = require('bitcore-wallet-client');
        
        var client = new Client({
            baseUrl: config.BWS_INSTANCE_URL,
            verbose: false,
        });
        return client
    },

}
