#iDeus Cordova Framework

##About

This is a Cordova boilerplate for building HTML5 mobile apps with a native look and feel based on Backbone.js framework.

Attention please! ==> [BEM only](https://github.com/ideus-team/guidelines/blob/master/frontend/bem.md)

## Menu

New:
- [Installation] (/docs/install.md)
- [API] (/docs/api.md)
- [Icons and Splashes] (/docs/icon-splashes.md)
- [Config.xml settings] (/docs/config.md)
- [Used plugins] (/docs/plugins.md)
- [How to build Android production release] (/docs/android-release.md)
- [CSS Media Queries for iPads & iPhones] (/docs/appleMediaQueries.md)

Old:
- [Notes and some issues] (#notes-and-some-issues)

NOTE: 
To solve the DexException must be imported via terminal this plugin:
cordova plugin add https://github.com/jwall149/cordova-multidex

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


##Notes and some issues

 - (iOS): hide status bar:
 Go to tab Info in xCode
<img src="http://joxi.ru/lbrRDg4TdegM21.jpg" />
