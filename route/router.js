
let router = require('express').Router();

let walletController = require("../controllers/wallet")
let webController = require("../controllers/web")
let transactionController = require("../controllers/transaction")


router.post("/wallet/create", walletController.walletCreate)
router.get("/wallet/list", walletController.walletList)
router.post("/wallet/address", walletController.walletAddress)
router.post("/wallet/balance", walletController.walletBalance)
router.post("/wallet/newsubaddress", walletController.walletNewSubAddress)


router.post("/import/mnemonic", walletController.walletImportWithMnemonic)
router.post("/export/mnemonic", walletController.walletExportMnemonic)
router.post("/export/privatekey", walletController.walletExportPrivateKey)


router.post("/transaction/send", transactionController.transactionSend)
router.post("/transaction/record", transactionController.transactionRecord)

router.get("/wallet.html", webController.getWalletHtml)
router.get("/Account.html", webController.getAccountHtml)
router.get("/transaction.html", webController.getTransactionHtml)
router.get("/transactionrecord.html", webController.getTransactionRecordHtml)

module.exports = router
