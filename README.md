#How to install and run Phonegap Framework

Our Phonegap Framework based on Cordova CLI with simple [Junior Framework] (http://justspamjustin.github.io/junior/) for building HTML5 mobile apps with a native look and feel.

To install Cordova CLI visit [cordova.apache.org] (http://cordova.apache.org/docs/en/dev/guide/cli/index.html).

##1. Get Framework
Git Clone:
- URL: https://github.com/ideus-team/phonegap-framework.git

##2. Create cordova hello world project in your directory:
```
cordova create app com.example.hello HelloWorld
```

##3. Copy Phonegap Framework to app directory

Our phonegap package is based on requireJS with json and text plugins. You can load html templates and json objects in your code, just specify the path to your json\html file.
Example:
```
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

##4. In config.xml rename all variable with your project settings

##5. Add icons and splashes for iOS\Android platforms

##6. Install plugins for your application from plugins.txt

##7. How to build Android production release

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
   - paste zipalign.exe to directory \platform-tools and \tools;
   - then try to do step 4 from the beginning;