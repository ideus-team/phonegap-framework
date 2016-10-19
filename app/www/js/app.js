import React from 'react';
import ReactDOM from 'reactDom';
import MainComponent from 'es6!../components/main';

export default class App {

  start: false

  constructor() {
    this.init();
  }

  init() {
    this.mobileDependence();
    this.uiDependence();
  }

  mobileDependence() {
    this.hideSplash();
  }

  uiDependence() {
    ReactDOM.render(
      <MainComponent />,
      document.getElementById('app-main')
    );
  }
  
  onDeviceOffline() {
    'notification' in navigator && !settings.debug && navigator.notification.alert('Offline');
  }
  
  onDeviceOnline() {
    'notification' in navigator && !settings.debug && navigator.notification.alert('Online');
  }
  
  exitApp() {
    !settings.debug && settings.developVersion === 'android' && navigator.app.exitApp();
  }
  
  showSplash() {
    'splashscreen' in navigator && !settings.debug &&navigator.splashscreen.show();
  }
  
  hideSplash() {
    console.log('hideSplash');
    'splashscreen' in navigator && !settings.debug && navigator.splashscreen.hide();
  }

};

// define([
//   'jquery',
//   'underscore',
//   'Backbone',
//   'socket',
//   'junior',
//   'settings',
//   'text!templates/chatMessage.html'
// ], function($, _, Backbone, io, Jr, settings, chatMessage){

//   var app = {
    
//     start: false,

//     initialize: function() {
//       app.bindEvents();
//     },
    
//     bindEvents: function() {
//       app.onDeviceReady();
//       document.addEventListener(settings.debug ? 'DOMContentLoaded' : 'deviceready', app.onDeviceReady, false);
//     },
    
//     onDeviceReady: function() {
//       app.hideSplash();
//     },
    
//     onDeviceOffline: function(){
//       'notification' in navigator && !settings.debug && navigator.notification.alert('Offline');
//     },
    
//     onDeviceOnline: function(){
//       'notification' in navigator && !settings.debug && navigator.notification.alert('Online');
//     },
    
//     exitApp: function(){
//       !settings.debug && settings.developVersion === 'android' && navigator.app.exitApp();
//     },
    
//     showSplash: function(){
//       'splashscreen' in navigator && !settings.debug &&navigator.splashscreen.show();
//     },
    
//     hideSplash: function(){
//       'splashscreen' in navigator && !settings.debug && navigator.splashscreen.hide();
//     },

//   };

//   window.app = app;
//   return app;
// });