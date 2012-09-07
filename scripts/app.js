var mifos = {}
mifos.api.url = "https://ec2-46-137-62-163.eu-west-1.compute.amazonaws.com:8443/";
mifos.api.tenantId = "&tenantIdentifier=default"
mifos.login = function(username, password)
{
var jqxhr = $.ajax({
        url : mifos.api.url + "authentication?username=" + username + "&password=" + password + mifos.api.tenantId,
        type : 'POST',
        contentType : "application/json; charset=utf-8",
        dataType : 'json',
        data : "{}",
        cache : false,
        success : function(data, textStatus, jqXHR) {     
            mifos.basicAuthKey = data.base64EncodedAuthenticationKey;
        },
        error : function(jqXHR, textStatus, errorThrown) {
            //
        }
    });
}