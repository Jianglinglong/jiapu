var urlBase = 'http://api.yunji128.com/homage';
var imgBase = 'http://img.yunji128.com/';

function getDataFromServer(api, data, success, error,async) {
    $.ajax({
        headers: {
            tokenInfo: window.localStorage.getItem("tokenInfo")
        },
        async: async || true,
        type: "GET",
        url: urlBase + api,
        data: data,
        dataType: "json",
        success: success,
        error: error
    });
}

function postDataToServer(api, data, success, error,async) {
    $.ajax({
        contentType: 'application/json',
        headers: {
           tokenInfo: window.localStorage.getItem("tokenInfo")
        },
        async: async || true,
        type: "POST",
        url: urlBase + api,
        data: data,
        dataType: "json",
        success: success,
        error: error
    });
}
function ajax(options) {
    if (options.method == 'get') {
        getDataFromServer(options.url,options.params,options.success,options.error,options.async);
    }else {
        postDataToServer(options.url,options.params,options.success,options.error,options.async);
    }
}
