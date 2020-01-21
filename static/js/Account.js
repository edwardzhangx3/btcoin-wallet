

function createSubAddress() {
    
    let params = {"walletname":currentwallet}
    $.post("/wallet/newsubaddress", params, function (res, status) {
        console.log(status + JSON.stringify(res))
        if (res.code == 0) {
            updateWalletAddressList()
        }
    })
}


function exportPrivatekey(walletName,path) {
    console.log(walletName)
    let password = prompt("Enter this password")
    if (password) {
        let params = { 
            "walletname": walletName,
            "password": password, 
            "childpath":path
        }
        $.post("/export/privatekey", params, function (res, status) {
            console.log(status, JSON.stringify(res))

            if (res.code == 0) {
                alert(res.data)
            }
        })
    }
}


function updateWalletAddressList() {
    let params = {"walletname":currentwallet}
    $.post("/wallet/address", params, function (res, status) {
        console.log(status + JSON.stringify(res))
        if (res.code == 0) {
            if (res.data.length > 0) {
                let mainAddress = res.data[0].address
                $("#main-address").text(mainAddress)
            } else {
                $("#main-address").text("Error：No address created")
            }

            let addressTable = $("#address-list-table")
            addressTable.empty()
            for (let i = 0; i < res.data.length; i++) {
                let account = res.data[i]
                let accountTr = `<tr>
                    <td>${account.path.slice(2)}</td>
                    <td>${account.address}</td>
                    <td><button onclick="exportPrivatekey('${currentwallet}','${account.path}')">Export privateKey</button></td>
                </tr>`
                addressTable.append(accountTr)
            }
        }
    })
}

let currentwallet = localStorage.getItem("currentwallet")

$(document).ready(function () {
    if (!currentwallet) {
        return
    }
    $("h1").text(currentwallet.slice(currentwallet+" Wallet"))

    let params = {"walletname":currentwallet}
    
    $.post("/wallet/balance", params, function (res, status) {
        console.log(status + JSON.stringify(res))
        if (res.code == 0) {
            $("#balance").text(res.data.availableAmount/100000000)
            $("#unc_balance").text(res.data.lockedAmount/100000000)
        }
    })

    
    updateWalletAddressList()
})
