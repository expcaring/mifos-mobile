var mifos = {}
mifos.api.url = "https://ec2-46-137-62-163.eu-west-1.compute.amazonaws.com:8443/";
mifos.api.tenantId = "&tenantIdentifier=default"
mifos.api.users = "api/v1/users"
mifos.api.login = function(username, password)
{
var jqxhr = $.ajax({
        url : mifos.api.url + "authentication?username=" + username + "&password=" + password,
        type : 'POST',
        contentType : "application/json; charset=utf-8",
        dataType : 'json',
        data : "{}",
        cache : false,
        success : function(data, textStatus, jqXHR) {     
            mifos.api.basicAuthKey = data.base64EncodedAuthenticationKey;
        },
        error : function(jqXHR, textStatus, errorThrown) {
            //
        }
    });
}

mifos.api.executeAjaxRequest = function(request, requestType, inputData, successFunction, errorFunction)
{
	var jqxhr = $.ajax({
        url : mifos.api.url +  request,
        type : requestType, //POST, GET, PUT or DELETE
        contentType : "application/json; charset=utf-8",
        dataType : 'json',
        data : inputData, //As JSON
        cache : false,
        beforeSend : function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + mifos.api.basicAuthKey);
        },
        success : successFunction(xhr),
        error : errorFunction(xhr)
    });
}

mifos.api.listUsers = function(fields)
{
	var request = fields ? mifos.api.users + "?" + "fields=" + fields : mifos.api.users;
	mifos.api.executeAjaxRequest(request, "GET", {}, mifos.api.listUsersSuccess, mifos.api.listUsersError);
}

mifos.api.listUsersSuccess = function(jsonResponse)
{
	//TODO
}

mifos.api.listUsersError = function(jsonResponse)
{
	//TODO
}

mifos.api.userDetails = function(id, fields)
{
	var request = mifos.api.users + "/" + userId + "?fields=" + fields;
	mifos.api.executeAjaxRequest = function(request, "GET", {}, mifos.api.userDetailsSuccess, mifos.api.userDetailsError);
}

mifos.api.userDetailsSuccess = function(jsonResponse)
{
	//TODO
}

mifos.api.userDetailsError = function(jsonResponse)
{
	//TODO
}