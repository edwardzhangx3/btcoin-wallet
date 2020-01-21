module.exports = {

    success: (data) => {
        responseData = {
            code: 0,
            status: "success",
            data: data
        }
        return responseData
    },

    fail: (msg) => {
        responseData = {
            code: 1,
            status: "fail",
            data: msg
        }
        return responseData
    },

    stringWithSubstrEnd: (str, substr) => {
        var start = str.length - substr.length;
        var sub = str.substr(start, substr.length);
        if (sub == substr) {
            return true;
        }
        return false;
    },
}

