var jsforce = require('jsforce');

exports.updateStatus = function(event,context,callback){

  updatePIRStatus(event);

  var responseBody = {
        "Id": event.Id,
        "Status": event.Status
    };

    var response = {
        "statusCode": 200,
        "body": JSON.stringify(responseBody),
        "isBase64Encoded": false
    };
    callback(null, response);
}

function updatePIRStatus(pirData){
  var username = 'integration1@merck.com.hhusd15';
  var password = 'MRKp@ssw0rd0072JoBejcflDhEZFjBw2nyxHF8';

  var conn = new jsforce.Connection({
    oauth2 : {
      // you can change loginUrl to connect to sandbox or prerelease env.
      loginUrl : 'https://test.salesforce.com',
      clientId : '3MVG9zZht._ZaMunIw02Zmy.qM8Q3xMYMlER6B_4RchwkAlQKPFzGKwDRCOLFTIr8IS3wfrIKyg3zCYKSkIux',
      clientSecret : '1959802284468702395',
      redirectUri : 'https://test.salesforce.com'
    }
  });
  conn.login(username, password, function(err, userInfo) {
    if (err) { return console.error(err); }
    // Now you can get the access token and instance URL information.
    // Save them to establish connection next time.
    console.log(conn.accessToken);
    console.log(conn.instanceUrl);
    // logged in user property
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);

    // query PIR status with PIR Id
    // Single record update
    conn.sobject("Medical_Inquiry_vod__c").update({
      Id : pirData.Id,
      Status_vod__c : pirData.Status
      }, function(err, ret) {
      if (err || !ret.success) { return console.error(err, ret); }
      console.log('Updated Successfully : ' + ret.id);
      // ...
    });

  });


}
