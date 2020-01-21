

function formatDateTime(inputTime) {  
    var date = new Date(inputTime);
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;  
    second = second < 10 ? ('0' + second) : second; 
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
}

function updateTransactionList(wallet) {

    let params = { "walletname": wallet }
    
    $.post("/transaction/record", params, function (res, status) {
        console.log("/transaction/record:\n", status + JSON.stringify(res),"\n")
        if (res.code == 0) {

            let transactionListTable　= $("#transaction-list-table")
            if (res.data.length > 0) {
                transactionListTable.empty()
                for (let i = 0; i < res.data.length; i++) {
                    let transaction = res.data[i]
                    let isReceived = transaction.action == "received" ? true : false
                    let transactionTr = `<tr>
                        <td>${isReceived ? "Recived" : "Paid"}</td>
                        <td>${isReceived ? "+" : "-"}${transaction.amount/100000000}</td>                        
                        <td>${isReceived ? transaction.inputs[0].address : transaction.addressTo}</td>
                        <td>${formatDateTime(transaction.time*1000)}</td>
                        <td>${transaction.confirmations}</td>
                    </tr>`
                    transactionListTable.append(transactionTr)
                }
            } else {
                transactionListTable.text("No Tx record")
            }
        }
    })
}

$(document).ready(function () {
    let currentwallet = localStorage.getItem("currentwallet")

    let walletList = localStorage.getItem("walletlist")
    walletList = JSON.parse(walletList)
    console.log("accountList", walletList,currentwallet)

    let addressSelectList = $("#transaction-record-wallet-select")
    for (let i = 0; walletList && i < walletList.length; i++) {
        let walletname = walletList[i]
        let showWalletname = walletname.slice(walletname.indexOf("-")+1)
        let walletOption
        if (walletname == currentwallet) {
            walletOption = `<option selected="selected" value="${walletname}">${showWalletname}</option>`
        } else {
            walletOption = `<option value="${walletname}">${showWalletname}</option>`
        }
        addressSelectList.append(walletOption)
    }

    
    updateTransactionList(currentwallet)

    
    addressSelectList.change(function () {
        console.log(this.value)
        localStorage.setItem("currentwallet", this.value)
        updateTransactionList(this.value)
    })
})
