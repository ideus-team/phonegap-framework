#iDeus Phonegap framework

##About

This is a Cordova boilerplate for building HTML5 mobile apps with a native look and feel based on Backbone.js framework.

## Menu

New:
- [Installation] (/docs/install.md)
- [Config.xml settings] (/docs/config.md)
- [Used plugins] (/docs/plugins.md)

Old:
- [Notes and some issues] (#notes-and-some-issues)
- [Install phonegap framework] (#2-install-phonegap-framework)
- [Add icons and splashes] (#4-add-icons-and-splashes-for-iosandroid-platforms)
- [How to build Android production release] (#6-how-to-build-android-production-release)
- [CSS Media Queries for iPads & iPhones] (#7-css-media-queries-for-ipads--iphones)

NOTE: 
To solve the DexException must be imported via terminal this plugin:
cordova plugin add https://github.com/jwall149/cordova-multidex

##1. Get Framework
Git Clone:
- URL: https://github.com/ideus-team/phonegap-framework.git

##2. Install phonegap framework

### Server

**! If you don't need server at all, you must remove `server` folder from `app/www` !**

Server based on Node.js, MongoDB and Sockets.io. To install and run server you must go to `app/www/server`, then open terminal and install packages

```
npm install
```

After that you must edit port for server `default: 8000`. Go to `app/www/server/bin/www.js`
```
var port = normalizePort(process.env.PORT || '8000');
```

Also you must add server url for client side. Go to `app/www/js/app.js`
```
var app = {
  ...
  sqlServer: '',
  nodeServer: 'http://localhost:8000',
  ...
}
```

Open terminal and run server by command:
```
npm start
```

#####Note:
If you need to run server forever, you must install foreverJS plugin for nodeJS:
```
npm install forever -g
```

Than run your server forever:
```
npm start forever
```

Note: If you have error with ws:// - change socket.connect settings to ``transports: ['polling']``


### Grunt package, stylesheet and images

If you need to edit stylesheet for your views, you must install [Grunt package for Phonegap framework] (https://github.com/ideus-team/phonegap-framework/tree/master/dev).
Go to `phonegap-framework/dev/`, open terminal and install packages:

```
npm install
```

or run `install.cmd` file.

Folder for stylesheets file: `dev/src/sass/`.
For all images there is folder `dev/src/img/`.

After all this action run `start.cmd` file.

#####Small note:
Our phonegap package is based on [requireJS] (http://requirejs.org) with *json* and *text* plugins. You can load html templates and json objects in your code, just specify the path to your json\html file.
Example:
```js
define([
  'jquery',
  'underscore',
  'Backbone',
  'junior',
  'utils',
  'json!testdb/testdb.json',
  'text!templates/homeTemplate.html'
], function ($, _, Backbone, Jr, app, testdb, homeTemplate){
  var HomeView = Jr.View.extend({

    template: _.template(homeTemplate),
    
    render: function(){
      var $this = this;
      $this.$el.html($this.template(testdb[0]));
      return $this;
    },

    events: {}
    
  });
  
  return HomeView;
});
```

##3. Config.xml settings

Open config.xml file (app/config.xml). Change all variables by your project settings.

Examples:
```APPLICATION_ID: biz.ideus.mygamename```
```APPLICATION_NAME: Mygame```
```APPLICATION_DESCRIPTION: This game is for people with fast fingers!```
```AUTHOR_EMAIL: info@ideus.biz```
```AUTHOR_LINK: http://ideus.biz```
```AUTHOR: iDeus company```

##4. Add icons and splashes for iOS\Android platforms

### Icons

To create icons for all devices you must have one icon with resolution 1024px X 1024px.
Go to [makeappicon.com] (https://makeappicon.com), upload your icon and you receive needed resolution icons on your Email.

### Splashes

##5. Install plugins for your application from plugins.txt

Now we use this list of plugins:
- [cordova-plugin-device] (https://github.com/apache/cordova-plugin-device)
- [cordova-plugin-console] (https://github.com/apache/cordova-plugin-console)
- [cordova-plugin-device-orientation] (https://github.com/gbenvenuti/cordova-plugin-screen-orientation)
- [cordova-plugin-dialogs] (https://github.com/apache/cordova-plugin-dialogs)
- [cordova-plugin-file] (https://github.com/apache/cordova-plugin-file)
- [cordova-plugin-file-transfer] (https://github.com/apache/cordova-plugin-file-transfer)
- [cordova-plugin-inappbrowser] (https://github.com/apache/cordova-plugin-inappbrowser)
- [cordova-plugin-network-information] (https://github.com/apache/cordova-plugin-network-information)
- [cordova-plugin-splashscreen] (https://github.com/apache/cordova-plugin-splashscreen)
- [cordova-plugin-statusbar] (https://github.com/apache/cordova-plugin-statusbar)
- [phonegap-plugin-push] (https://github.com/phonegap/phonegap-plugin-push)
- iOS game center - [cordova-plugin-game-center] (https://github.com/leecrossley/cordova-plugin-game-center)
- Android game center - [cordova-plugin-play-games-services] (https://github.com/artberri/cordova-plugin-play-games-services)

For game center plugin we add some methods:

 - getFriends (get all friends in game center)
 - inviteFriends (send invite to friends)

Files for this two methods you can download here:
  - [GameCenter.h] (http://clients.ideus.biz/aliashenko/gamecenter/src/ios/GameCenter.h)
  - [GameCenter.m] (http://clients.ideus.biz/aliashenko/gamecenter/src/ios/GameCenter.m)
  - [gamecenter.js] (http://clients.ideus.biz/aliashenko/gamecenter/www/gamecenter.js)

##6. How to build Android production release

###Step 1:

  Open console. Go to application diractory and do:
  ```
  cordova build --release android
  ```
###Step 2:

  Go to YOUR_APP_PATH\platforms\android\build\outputs\apk\. There you can find android-release-unsigned.apk.
  
  Key Generation:
  
  ```
  keytool -genkey -v -keystore APPLICATION_TITLE.keystore -alias APPLICATION_TITLE -keyalg RSA -keysize 2048 -validity 10000
  ```
  
  Then answer all question:
  ```
  keystore password? : xxxxxxx
  What is your first and last name? :  xxxxxx
  What is the name of your organizational unit? :  xxxxxxxx
  What is the name of your organization? :  xxxxxxxxx
  What is the name of your City or Locality? :  xxxxxxx
  What is the name of your State or Province? :  xxxxx
  What is the two-letter country code for this unit? :  xxx
  ```
  
  Then the Key store has been generated with name as APPLICATION_TITLE.keystore.
  
###Step 3:

  To sign the unsigned APK, run the jarsigner tool which is also included in the JDK:
  
  ```
  jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore APPLICATION_TITLE.keystore android-release-unsigned.apk APPLICATION_TITLE
  ```
  
###Step 4:

  Finally, we need to run the zip align tool to optimize the APK:
  
  ```
  zipalign -v 4 android-release-unsigned.apk APPLICATION_TITLE_FOR_RELEASE.apk
  ```
  
  Now you have our final release binary called APPLICATION_TITLE_FOR_RELEASE.apk and you can release this on the Google Play Store.
  
  NOTE: If you have an errors in this step with zipalign try to follow this steps:
   - go to PATH_TO_ANDROID_SDK\AndroidSDK\build-tools\LAST_VESTION\ and copy zipalign.exe;
   - paste zipalign.exe to folder \platform-tools and \tools;
   - then try to do step 4 from the beginning;

To take SHA1 from debug apk follow this steps:
- c:\Users\USERNAME\.android\debug.keystore copy this file to your dir
- run command (password is 'android')
```
keytool -exportcert -alias androiddebug key -keystore debug.keystore -list -v
```

##7. CSS Media Queries for iPads & iPhones

###iPad Media Queries

####1. iPad in portrait & landscape

```
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px)  { /* STYLES GO HERE */}
```

####2. iPad in landscape

```
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : landscape) { /* STYLES GO HERE */}
```

####3. iPad in portrait

```
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : portrait) { /* STYLES GO HERE */ }
```

####4. iPad 3 & 4 Media Queries

If you're looking to target only 3rd and 4th generation Retina iPads (or tablets with similar resolution) to add @2x graphics, or other features for the tablet's Retina display, use the following media queries.

```
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px)
and (-webkit-min-device-pixel-ratio: 2) { /* STYLES GO HERE */}
```

####5. Retina iPad in landscape

```
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : landscape)
and (-webkit-min-device-pixel-ratio: 2) { /* STYLES GO HERE */}
```

####6. Retina iPad in portrait

```
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : portrait)
and (-webkit-min-device-pixel-ratio: 2) { /* STYLES GO HERE */ }
```

####7. iPad 1 & 2 Media Queries

```
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (-webkit-min-device-pixel-ratio: 1){ /* STYLES GO HERE */}
```

####8. iPad 1 & 2 in landscape

```
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : landscape)
and (-webkit-min-device-pixel-ratio: 1)  { /* STYLES GO HERE */}
```

####9. iPad 1 & 2 in portrait

```
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : portrait) 
and (-webkit-min-device-pixel-ratio: 1) { /* STYLES GO HERE */ }
```

###iPad mini Media Queries

####1. iPad mini in portrait & landscape

```
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px)
and (-webkit-min-device-pixel-ratio: 1)  { /* STYLES GO HERE */}
```

####2. iPad mini in landscape

```
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : landscape)
and (-webkit-min-device-pixel-ratio: 1)  { /* STYLES GO HERE */}
```

####2. iPad mini in portrait

```
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : portrait)
and (-webkit-min-device-pixel-ratio: 1)  { /* STYLES GO HERE */ }
```

##### iPad mini Resolution

```
Screen Width = 768px (CSS Pixels)
Screen Height = 1024px (CSS Pixels)

Screen Width = 768px (Actual Pixels)
Screen Height = 1024px (Actual Pixels)

Device-pixel-ratio: 1
```

###iPhone Media Queries

####1. iPhone 6 in portrait & landscape

```
@media only screen 
and (min-device-width : 375px) 
and (max-device-width : 667px) { /* STYLES GO HERE */}
```

####2. iPhone 6 in landscape

```
@media only screen 
and (min-device-width : 375px) 
and (max-device-width : 667px) 
and (orientation : landscape) { /* STYLES GO HERE */}
```

####3. iPhone 6 in portrait

```
@media only screen 
and (min-device-width : 375px) 
and (max-device-width : 667px) 
and (orientation : portrait) { /* STYLES GO HERE */ }
```

####4. iPhone 6 Plus in portrait & landscape

```
@media only screen 
and (min-device-width : 414px) 
and (max-device-width : 736px) { /* STYLES GO HERE */}
```

####5. iPhone 6 Plus in landscape

```
@media only screen 
and (min-device-width : 414px) 
and (max-device-width : 736px) 
and (orientation : landscape) { /* STYLES GO HERE */}
```

####6. iPhone 6 Plus in portrait

```
@media only screen 
and (min-device-width : 414px) 
and (max-device-width : 736px) 
and (orientation : portrait) { /* STYLES GO HERE */ }
```

####7. iPhone 5 & 5S in portrait & landscape

```
@media only screen 
and (min-device-width : 320px) 
and (max-device-width : 568px) { /* STYLES GO HERE */}
```

####8. iPhone 5 & 5S in landscape

```
@media only screen 
and (min-device-width : 320px) 
and (max-device-width : 568px) 
and (orientation : landscape) { /* STYLES GO HERE */}
```

####9. iPhone 5 & 5S in portrait

```
@media only screen 
and (min-device-width : 320px) 
and (max-device-width : 568px) 
and (orientation : portrait) { /* STYLES GO HERE */ }
```

### iPhone 2G, 3G, 4, 4S Media Queries
It's noteworthy that these media queries are also the same for iPod Touch generations 1-4.

####1. iPhone 2G-4S in portrait & landscape

```
@media only screen 
and (min-device-width : 320px) 
and (max-device-width : 480px) { /* STYLES GO HERE */}
```

####2. iPhone 2G-4S in landscape

```
@media only screen 
and (min-device-width : 320px) 
and (max-device-width : 480px) 
and (orientation : landscape) { /* STYLES GO HERE */}
```

####2. iPhone 2G-4S in portrait

```
@media only screen 
and (min-device-width : 320px) 
and (max-device-width : 480px) 
and (orientation : portrait) { /* STYLES GO HERE */ }
```

##### iPhone 5 Resolution

```
Screen Width = 320px (CSS Pixels)
Screen Height = 568px (CSS Pixels)

Screen Width = 640px (Actual Pixels)
Screen Height = 1136px (Actual Pixels)

Device-pixel-ratio: 2
```

##### iPhone 4/4S Resolution

```
Screen Width = 320px (CSS Pixels)
Screen Height = 480px (CSS Pixels)

Screen Width = 640px (Actual Pixels)
Screen Height = 960px (Actual Pixels)

Device-pixel-ratio: 2
```

##### iPhone 2G/3G/3GS Resolution

```
Screen Width = 320px (CSS Pixels)
Screen Height = 480px (CSS Pixels)

Screen Width = 320px (Actual Pixels)
Screen Height = 480px (Actual Pixels)

Device-pixel-ratio: 1
```


##Notes and some issues

 - (iOS): hide status bar:
 Go to tab Info in xCode
<img src="http://joxi.ru/lbrRDg4TdegM21.jpg" />
