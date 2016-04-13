define([
  'jquery',
  'underscore',
  'Backbone',
  'junior'
], function($, _, Backbone, Jr){

  var app = {
    
    /*
     * If debug = true - browser verstion
     * will be displayed. You must check if ( !app.debug )
     * in all places where with cordova plugin method call
    */
    debug: true,
    
    sqlServer: '',
    
    initialize: function() {
      app.bindEvents();
    },
    
    bindEvents: function() {
      app.onDeviceReady();
      //var domEvent = app.debug ? 'DOMContentLoaded' : 'deviceready';
      //d.addEventListener(domEvent, this.onDeviceReady, false);
      
      if ( !app.debug ){
        document.addEventListener('offline', app.onDeviceOffline, false);
        document.addEventListener('online', app.onDeviceOnline, false);
      }
    },
    
    onDeviceReady: function() {
      app.hideSplash();
    },
    
    /**
     * change page
     * @param page {string} - page name
     * @param trigger {boolean} - must be 'true'
     * @param dir {string} - direction to slide page // left|right|top|bottom
     */
    changePage: function(page, trigger, dir){
      var anim = {
        type: Jr.Navigator.animations.SLIDE_OVER,
        direction: dir ? Jr.Navigator.directions[dir.toUpperCase()] : ''
      };
      
      var params = {
        trigger: trigger,
        animation: anim
      };
      
      Jr.Navigator.navigate(page, params);
    },
    
    onDeviceOffline: function(){
      if ( 'notification' in navigator && !app.debug ){
        navigator.notification.alert('Offline');
      }
    },
    
    onDeviceOnline: function(){
      if ( 'notification' in navigator && !app.debug ){
        navigator.notification.alert('Online');
      }
    },
    
    exitApp: function(){
      if ( !app.debug ){
        navigator.app.exitApp();
      }
    },
    
    showSplash: function(){
      if ( 'splashscreen' in navigator && !app.debug ){
        navigator.splashscreen.show();
      }
    },
    
    hideSplash: function(){
      if ( 'splashscreen' in navigator && !app.debug ){
        navigator.splashscreen.hide();
      }
    },
    
    /**
     * Server request and fetch data
     * @param command {string} - server command
     * @param params {object} - command params
     * @param callback {function} - callback for success response
     */
    fetch: function(command, params, callback){
      
      var data = {
        command: command,
        params: params
      };
      
      $.ajax(app.sqlServer, {
        method: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        crossDomain: true,
        cache: false,
        dataType: 'json',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        success: function(res){
          console.log('Request success: ', command, res);
          if ( callback ){
            callback(res);
          }
        },
        error: function(error){
          console.log('Request error: ', command, error);
          return error;
        }
      });
      
    },
  };
  
  return app;
});