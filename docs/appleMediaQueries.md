##CSS Media Queries for iPads & iPhones

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