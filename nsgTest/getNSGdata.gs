function myFunction() {
  
}

function getServicePrincipalToken(tenantId, clientId, clientSecret, resource) {
  var url = "https://login.microsoftonline.com/" + tenantId + "/oauth2/token";
  var payload = {
    "grant_type": "client_credentials",
    "client_id": clientId,
    "client_secret": clientSecret,
    "resource": resource
  };
  var options = {
    "method": "post",
    "contentType": "application/x-www-form-urlencoded",
    "payload": payload
  };
  var response = UrlFetchApp.fetch(url, options);
  var token = JSON.parse(response.getContentText()).access_token;
  return token;
}

function testGetServicePrincipalToken() {
  var tenantId = PropertiesService.getScriptProperties().getProperty("db10testpr_tenantId");
  var clientId = PropertiesService.getScriptProperties().getProperty("db10testpr_clientId");
  var clientSecret = PropertiesService.getScriptProperties().getProperty("db10testpr_clientSecret");
  var resource = "https://management.azure.com/";
  var token = getServicePrincipalToken(tenantId, clientId, clientSecret, resource);
  Logger.log(token);
  return token;
}

function getNSGInfo(resourceGroupName) {
  var subscriptionId = PropertiesService.getScriptProperties().getProperty("db10test_subscriptionId");
  var accessToken = testGetServicePrincipalToken();
  var url = 'https://management.azure.com/subscriptions/' + subscriptionId + '/resourceGroups/' + resourceGroupName + '/providers/Microsoft.Network/networkSecurityGroups?api-version=2022-01-01';

  var headers = {
    'Authorization': 'Bearer ' + accessToken
  };

  var options = {
    'method': 'GET',
    'headers': headers
  };

  var response = UrlFetchApp.fetch(url, options);
  var nsgInfo = JSON.parse(response.getContentText());
  return nsgInfo;
}

function showNSG(){
  var resourceGroupName = "AZR-DB10TEST";
  var result = getNSGInfo(resourceGroupName);
  createJsonFile(JSON.stringify(result, null, 2), "NSGData.json");
  Logger.log(result);
}
