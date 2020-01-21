


function updateWalletBalance(wallet) {
    $("#balance").text("uploading...")
    
    let params = {"walletname":wallet}
    
    $.post("/wallet/balance", params, function (res, status) {
        console.log(status + JSON.stringify(res))
        if (res.code == 0) {
            $("#balance").text(res.data.availableAmount/100000000)
        }
    })
}
    
$(document).ready(function () {
    let currentWallet = localStorage.getItem("currentwallet")
    
    
    let walletList = localStorage.getItem("walletlist")
    walletList = JSON.parse(walletList)
    console.log("accountList",walletList)

    let addressSelectList = $("#transaction-send-address-select")
    for(let i = 0;  i < walletList.length && walletList; i++) {
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
    
   
    updateWalletBalance(currentwallet)

    
    addressSelectList.change(function() {
        console.log(this.value)
        localStorage.setItem("currentwallet", this.value)
        updateWalletBalance(this.value)
    })

    
    $("#transaction-send-form").validate({
        rules: {
            from: {required: true,},
            to: {required: true,},
            amount: {required: true,},
            password: {required: true,},
        },
        messages: {
            from: {required: "Select Account",},
            to: {required: "Enter the account pay to",},
            amount: {required: "Enter the amount",},
            password: {required: "Enter the password",},
        },
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                url: "/transaction/send",
                type: "post",
                dataType: "json",
                success: function (res, status) {
                    console.log(status + JSON.stringify(res))
                    alert(JSON.stringify(res.data))
                    if (res.code == 0) {
                    }
                },
                error: function (res, status) {
                    console.log(status + JSON.stringify(res))
                    alert(res.data)
                }
            });
        }
    })
})
