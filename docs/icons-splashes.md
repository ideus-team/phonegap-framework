#How to generate icons and splashes for Application

> !!! Look at file [config.xml](../application/config.xml) and structured your icons and splashes folders in that case.

#Icons

To create icons for all devices you must have one icon with resolution 1024px X 1024px.
Go to [makeappicon.com] (https://makeappicon.com), upload your icon and you receive needed resolution icons on your Email.

#Splashes

##For iOS ([more info](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/#ios-specific-information))

Name    | Resolution
------------ | -------------
Default~iphone.png | width="320" height="480"
Default@2x~iphone.png | width="640" height="960"
Default-Portrait~ipad.png | width="768" height="1024"
Default-Portrait@2x~ipad.png | width="1536" height="2048"
Default-Landscape~ipad.png | width="1024" height="768"
Default-Landscape@2x~ipad.png | width="2048" height="1536"
Default-568h@2x~iphone.png | width="640" height="1136"
Default-667h.png | width="750" height="1334"
Default-Portrait-736h.png | width="1242" height="2208"
Default-Landscape-736h@3x.png | width="2208" height="1242"

##For Android

> Please, locate all images to folder based in it's dpi:
> *Exapmle:* ldpi splashscreen must be in `drawable-ldpi` folder and with name screen.png

Name    | Resolution | Folder name
------------ | ------------- | -------------
LDPI: screen.png | Portrait: 200x320px / Landscape: 320x200px | drawable-port-ldpi / drawable-land-ldpi
MDPI: screen.png | Portrait: 320x480px / Landscape: 480x320px | drawable-port-mdpi / drawable-land-mdpi
HDPI: screen.png | Portrait: 480x800px / Landscape: 800x480px | drawable-port-hdpi / drawable-land-hdpi
XHDPI: screen.png | Portrait: 720px1280px / Landscape: 1280x720px | drawable-port-xhdpi / drawable-land-xhdpi
XXHDPI: screen.png | Portrait: 960px1600px / Landscape: 1600x960px | drawable-port-xxhdpi / drawable-land-xxhdpi
XXXHDPI: screen.png | Portrait: 1280px1920px / Landscape: 1920x1280px | drawable-port-xxxhdpi / drawable-land-xxxhdpi