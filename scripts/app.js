var mifos = {};
mifos.url = "https://ec2-46-137-62-163.eu-west-1.compute.amazonaws.com:8443/mifosng-provider/api/v1/";
mifos.tenantId = "&tenantIdentifier=default"
mifos.users = "users"

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
                  mifos.loadHome();
                  //Load empty client page
                  var source   = $("#emptyClientPage").html();
                  var template = Handlebars.compile(source);
                  var html = template({errors : []});
                  mifos.render("#mainContent",html);
              }
          }
      },
      error : function(jqXHR, textStatus, errorThrown) {
          //Show error message
          mifos.loginFailed({errors : [{defaultUserMessage : "Login failed"}]});
      }
  });
}

mifos.render = function(elem, html)
{
    $(elem).empty();
    $(elem).append(html);
}

mifos.loadHome = function()
{
    var source   = $("#view-nav-main").html();
    var template = Handlebars.compile(source);
    var html = template();
    $('article').removeClass("isVisible");
    mifos.render("#sidebarContent", html);
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
     mifos.render("#mainContent", html);
}

mifos.executeAjaxRequest = function(request, requestType, inputData, successFunction)
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
        error : mifos.error(xhr)
    });
}

mifos.listUsers = function(fields)
{
	var request = fields ? mifos.users + "?" + "fields=" + fields : mifos.users;
	mifos.executeAjaxRequest(request, "GET", {}, mifos.listUsersSuccess);
}

mifos.listUsersSuccess = function(jsonResponse)
{
	//TODO
}

mifos.error = function(jsonResponse)
{
    var data;
    if(jsonResponse && jsonResponse.errors)
    {
        data = jsonResponse;
    }
    else
    {
        data = {errors : [{defaultUserMessage : "Operation failed"}]};
    }
	var source = $("#error-template").html();
    var template = Handlebars.compile(source);
    var html = template(data);
    mifos.render("#mainContent", html);
}

mifos.getRoles = function()
{
    mifos.executeAjaxRequest("roles", "GET", "{}", mifos.getRolesSuccess);
}

mifos.getRolesSuccess = function(jsonResponse) 
{
    return jsonResponse;
}

mifos.userDetails = function(id, fields)
{
	var request = mifos.users + "/" + userId + "?fields=" + fields;
	mifos.executeAjaxRequest(request, "GET", "{}", mifos.userDetailsSuccess);
}

mifos.userDetailsSuccess = function(jsonResponse)
{
    var user = jsonResponse;
    var roles = mifos.getRoles();
    var data = {"user": user, "roles" : roles};
    var source = $("#user-detail-template").html();
    var template = Handlebars.compile(source);
    var html = template(data);
    mifos.render("#users");
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

    $(document).on('click','#listUsers',function(e){
        e.preventDefault();
        var data = $(this).serializeArray();
        console.log(this);
        mifos.login('mifos','password');
    })

});