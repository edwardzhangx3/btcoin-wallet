

function exportMnemonic(walletName) {
    console.log(walletName)
    let password = prompt("Enter the password")
    if (password) {
        let params = { "walletname": walletName, "password": password }
        $.post("/export/mnemonic", params, function (res, status) {
            console.log(status, JSON.stringify(res))

            if (res.code == 0) {
                alert(res.data)
            }
        })
    }
}

$(document).ready(function () {

   
    $("#wallet-create-form").validate({
        rules: {
            walletname: {
                required: true,
            },
            password: {
                required: true,
            },
        },
        messages: {
            walletname: {
                required: "Enter the wallet name",
            },
            password: {
                required: "Enter the new password",
            },
        },
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                url: "/wallet/create",
                type: "post",
                dataType: "json",
                success: function (res, status) {
                    console.log(status + JSON.stringify(res))
                    alert(JSON.stringify(res.data))
                    if (res.code == 0) {
                        window.location.reload()
                    }
                },
                error: function (res, status) {
                    console.log(status + JSON.stringify(res))
                }
            });
        }
    })

    
    $.get("/wallet/list", function (res, status) {
        console.log(status, JSON.stringify(res))

        if (res.code == 0) {
            let walletTable = $("#wallet-list-table")
            localStorage.setItem("walletlist", JSON.stringify(res.data))
            res.data.forEach(wallet => {
                console.log(wallet)

                let walletTr = `<tr>
                    <td class="wallet-ele" id="${wallet}">${wallet}</td>
                    <td><button onclick="exportMnemonic('${wallet}')">export Mnemonic</button></td>
                </tr>`
                walletTable.append(walletTr)

                $(".wallet-ele").click(function () {
                    console.log($(this).attr("id"))
                    localStorage.setItem("currentwallet", $(this).attr("id"))
                    window.location.href = "/walletinfo.html"
                })
            });
        }
    })

   
    $("#wallet-mnemonic-importing-form").validate({
        rules: {
            walletname: {
                required: true,
            },
            password: {
                required: true,
            },
            mnemonic: {
                required: true,
            },
        },
        messages: {
            walletname: {
                required: "Enter the wallet name",
            },
            password: {
                required: "Enter new password",
            },
            mnemonic: {
                required: "Enter mnemonic words",
            },
        },
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                url: "/import/mnemonic",
                type: "post",
                dataType: "json",
                success: function (res, status) {
                    console.log(status + JSON.stringify(res))
                    alert(JSON.stringify(res.data))
                    if (res.code == 0) {
                        window.location.reload()
                    }
                },
                error: function (res, status) {
                    console.log(status + JSON.stringify(res))
                }
            });
        }
    })

})
