host_addr="";

sendData = function(_method,_url,_data,_success,_error) {
    var json_data = JSON.stringify(_data);
    $.ajax({
        type:_method,
        url:  host_addr + _url,
        contentType: "application/json; charset=utf-8",
        data:json_data,
        success:_success,
        error: function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status == '401')
                toLogin(XMLHttpRequest)
            _error(XMLHttpRequest, textStatus, errorThrown);
        },
    });
}

postData=function(_url,_data,_success,_error) {
    sendData("POST",_url,_data,_success,_error)
}
deleteData=function(_url,_data,_success,_error) {
    sendData("DELETE",_url,_data,_success,_error)
}
putData=function(_url,_data,_success,_error) {
    sendData("PUT",_url,_data,_success,_error)
}
patchData=function(_url,_data,_success,_error) {
    sendData("PATCH",_url,_data,_success,_error)
}

getData=function(_url,params,_success,_error) {
    var paramsStr = "1=1";
    _.map(params,function(v,k) {
        if( !isNullOrEmpty(v)) {
            paramsStr+= ("&"+k+"="+v);
        }
    })
    $.ajax({
        url: host_addr + _url+"?"+paramsStr,
        contentType: "application/json; charset=utf-8",
        cache:false,
        async:true,
        success:_success,

        error: function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status == '401')
                toLogin(XMLHttpRequest)
            _error(XMLHttpRequest, textStatus, errorThrown);
        },
    });
}
toLogin = function(XMLHttpRequest) {
        $(window.location).attr('href', "login.html");
}

function trim(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
function isNullOrEmpty(strVal) {
    if (strVal == '' || strVal == null || strVal == undefined) {
        return true;
    } else {
        return false;
    }
}