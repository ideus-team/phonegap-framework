#Notes and some issues

##Menu:

1. [DexException](#DexException)
1. [Server forever](#Server-forever)
1. [WebSocket and socket.io](#WebSocket-and-socket.io)
1. [Hide status bar in iOS](#Hide-status-bar-in-iOS)

###DexException
To solve the DexException must be imported via terminal this plugin:
cordova plugin add https://github.com/jwall149/cordova-multidex

###Server forever

If you need to run server forever, you must install foreverJS plugin for nodeJS:
```
npm install forever -g
```

Than run your server forever:
```
npm start forever
```


###WebSocket and socket.io
1. If you have error with ws:// - change socket.connect settings to ``transports: ['polling']``


###Hide status bar in iOS
1. Go to tab Info in xCode
   [xcode!](http://joxi.ru/lbrRDg4TdegM21.jpg)