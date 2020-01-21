
module.exports = {

    getWalletHtml: (req, res) => {
        res.render("wallet.html");
    },

    getAccountHtml: (req, res) => {
        res.render("Account.html")
    },

    getTransactionHtml: (req, res) => 　{
        res.render("transaction.html")
    },

    getTransactionRecordHtml: (req, res) => 　{
        res.render("transactionRecord.html")
    },
}
