var mifos = {};
mifos.url = "https://ec2-46-137-62-163.eu-west-1.compute.amazonaws.com:8443/mifosng-provider/api/v1/";
mifos.tenantId = "&tenantIdentifier=default"
mifos.users = "users/"

mifos.login = function(username, password)
{
var jqxhr = $.ajax({
      url : mifos.url + "authentication?username=" + username + "&password=" + password + mifos.tenantId,
      type : 'POST',
      contentType : "application/json; charset=utf-8",
      dataType : 'json',
      data : "{}",
      cache : false,
      success : function(data, textStatus, jqXHR) {     
            alert("Success!");
          mifos.basicAuthKey = data.base64EncodedAuthenticationKey;
          if(data)
          {
              if(data.errors)
              {
                  //Show error message
                  mifos.loginFailed(data);
              }
              else
              {
                  //Load main menu
                  
              }
          }
      },
      error : function(jqXHR, textStatus, errorThrown) {
          //Show error message
          alert("Fail!");
          mifos.loginFailed({errors : [{defaultUserMessage : "loginFailed"}]});
      }
  });
}

mifos.loginFailed = function(data)
{
    var source   = $("#signIn-template").html();
    var template = Handlebars.compile(source);
    var html;
    if(data.errors)
     {
        html = template(data);
     }
     else
     {
        html = template({errors : []});
     }
    $("mainContent").append(html);
}

mifos.executeAjaxRequest = function(request, requestType, inputData, successFunction, errorFunction)
{
	var jqxhr = $.ajax({
        url : mifos.url +  request + mifos.tenantId,
        type : requestType, //POST, GET, PUT or DELETE
        contentType : "application/json; charset=utf-8",
        dataType : 'json',
        data : inputData, //As JSON
        cache : false,
        beforeSend : function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + mifos.basicAuthKey);
        },
        success : successFunction(xhr),
        error : errorFunction(xhr)
    });
}

mifos.listUsers = function(fields)
{
	var request = fields ? mifos.users + "?" + "fields=" + fields : mifos.users;
	mifos.executeAjaxRequest(request, "GET", {}, mifos.listUsersSuccess, mifos.listUsersError);
}

mifos.listUsersSuccess = function(jsonResponse)
{
	//TODO
}

mifos.listUsersError = function(jsonResponse)
{
	//TODO
}

mifos.userDetails = function(id, fields)
{
	var request = mifos.users + "/" + userId + "?fields=" + fields;
	mifos.executeAjaxRequest(request, "GET", {}, mifos.userDetailsSuccess, mifos.userDetailsError);
}

mifos.userDetailsSuccess = function(jsonResponse)
{
	//TODO
}

mifos.userDetailsError = function(jsonResponse)
{
	//TODO
}

$(document).ready(function(){
    var source   = $("#signIn-template").html();
    var template = Handlebars.compile(source);
    var html = template({errors : []});
    $("#mainContent").append(html);
    
    $(document).on('submit','#signInForm',function(e){
        e.preventDefault();
        var data = $(this).serializeArray();
        console.log(this);
        mifos.login('mifos','password');
    })
});