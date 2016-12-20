#How to build Android production release

##Step 1:

Open console. Go to application diractory and do:

```cli
cordova build --release android
```

##Step 2:

Go to YOUR_APP_PATH\platforms\android\build\outputs\apk\. There you can find android-release-unsigned.apk.

Key Generation:

> keytool is located "C:\Program Files\Java\jdk[LATEST_VERSION]\bin\keytool.exe"

```
keytool -genkey -v -keystore APPLICATION_KEYSTORE_TITLE.keystore -alias KEYSTORE_ALIAS -keyalg RSA -keysize 2048 -validity 10000
```

or user full path to keytool.exe

```
"C:/Program Files/Java/jdk[LATEST_VERSION]/bin/keytool.exe" -genkey -v -keystore APPLICATION_KEYSTORE_TITLE.keystore -alias KEYSTORE_ALIAS -keyalg RSA -keysize 2048 -validity 10000
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

Then the Key store has been generated with name as APPLICATION_KEYSTORE_TITLE.keystore.

> !!! You must save generated keystore file, alias and password in project or git repository. Keystore file created once and linked with application in Google Play store !!!
  
##Step 3:

To sign the unsigned APK, run the jarsigner tool which is also included in the JDK:

> jarsigner is located "C:\Program Files\Java\jdk[LATEST_VERSION]\bin\jarsigner.exe"

```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore APPLICATION_KEYSTORE_TITLE.keystore android-release-unsigned.apk KEYSTORE_ALIAS
```
or use full path to jarsigner:

```
"C:/Program Files/Java/jdk[LATEST_VERSION]/bin/jarsigner.exe" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore APPLICATION_KEYSTORE_TITLE.keystore android-release-unsigned.apk KEYSTORE_ALIAS
```
  
##Step 4:

Finally, we need to run the zipalign tool to optimize the APK:

> zipalign is located "PATH_TO_ANDROID_SDK\AndroidSDK\build-tools\LAST_VESTION\zipalign.exe"

```
zipalign -v 4 android-release-unsigned.apk APPLICATION_TITLE_FOR_RELEASE.apk
```

or use full path:

```
"PATH_TO_ANDROID_SDK\AndroidSDK\build-tools\LAST_VESTION\zipalign.exe" -v 4 android-release-unsigned.apk APPLICATION_TITLE_FOR_RELEASE.apk
```

Now you have your final release binary called APPLICATION_TITLE_FOR_RELEASE.apk and you can release this on the Google Play Store.

##Some notes:

###To take SHA1 from debug keystore follow this steps:
1. C:\Users\USERNAME\.android\debug.keystore copy this file to your dir
2. Run command (password is 'android')

```
keytool -exportcert -alias androiddebug key -keystore debug.keystore -list -v
```

###To take SHA1 from release keystore follow this steps:
1. Go to dir where is your release APPLICATION_KEYSTORE_TITLE.keystore located
2. Run command in console (password: YOUR_SAVED_PASSWORD_WHEN_YOUR_CREATED_KEYSTORE_FILE):

```
keytool -exportcert -alias KEYSTORE_ALIAS key -keystore APPLICATION_KEYSTORE_TITLE.keystore -list -v
```

##Submit\update APK in your account on Google Play Store:

1. You must be sure, that application version in config.xml is higher, than previose one.
2. [Open account](https://play.google.com/apps/publish/)
3. Upload your APPLICATION_TITLE_FOR_RELEASE.apk
   ![GooglePlayStore](http://joxi.ru/WKAxepOIoJvnr8.jpg)
   ![GooglePlayStore2](http://joxi.ru/812M1gMiJewK2J.jpg)
4. Wait for uploading, then submit new version

Your application will be updated\approved in 5 hours.