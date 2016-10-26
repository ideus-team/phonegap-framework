######1. create new project & keys at the http://console.developers.google.com
######2. Install app plugin: cordova plugin add phonegap-plugin-push --variable SENDER_ID="XXXXXXX"
######3. Add the code below to the application and server, then replace the IDs and messages
*Full manual can be found [here](http://phonegappro.com/tutorials/apache-cordova-phonegap-push-notification-tutorial-part-1/) *

#####Client JS:

```js
    function onDeviceReady(){
      var push = PushNotification.init({android: {senderID: 220975263612}}); //replace senderID with own project ID

      push.on('registration', function(data) {
        //On subscribe to push notification we need to save the device ID (data.registrationId) in the database
      });

      push.on('notification', function(data) {
        alert(data.title + data.message); // data.title, data.count, data.sound, data.image, data.additionalData
      });

      push.on('error', function(e) {
        console.log(e.message);
      });
    }
```


#####NodeJS server code

```js
    var http = require("http");

    var API_ACCESS_KEY = 'AIzaSyBJsICXMgqjIergg-gbn6l87GyqApiInBw'; //server API key
    var to = 'cbwhbjGhKGE:APA91bHqNJTdDjbIm9HrvRDqO9xKKvgIm2EkOjJ1VwzAHyqOzmceM0VnzDC4SrQR-KrQBpm8vfw3Pw7QCAgdZCSjaayMsWDSGxuoJbV_ARSrhuEju8NI1WOAan7tY9mFi44i9XBiV04U'; //device registrationID

    var registrationIds = [to];
    var msg = {
      message: "%Title%",
      title: "%Message%",
      vibrate: 1,
      sound: 1
    };
    var fields = JSON.stringify({
      registration_ids: registrationIds,
      data: msg
    });

    var options = {
      host: 'android.googleapis.com',
      port: 80,
      path: '/gcm/send',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=' + API_ACCESS_KEY,
      }
    };

    var req = http.request(options, function(res) {
      //If res.results.error == "NotRegistered" - user has deleted the app and we need to remove the ID from database
      console.log('STATUS: ' + res.statusCode);
      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
      });
    });
    req.write(fields, 'utf8');
    req.end();
```