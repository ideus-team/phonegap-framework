define([
  'jquery',
  'underscore',
  'Backbone',
  'socket',
  'junior',
  'text!templates/chatMessage.html'
], function($, _, Backbone, io, Jr, chatMessage){

  var app = {
    
    /*
     * If debug = true - browser verstion
     * will be displayed. You must check if ( !app.debug )
     * in all places where with cordova plugin method call
    */
    debug: true,

    uploadsDir: 'img/uploads',
    
    // ios || android
    developVersion: 'ios',
    
    sqlServer: '',

    nodeServer: 'http://localhost:8888',
    
    // main element where will be render all app content
    renderElem: '#app-main',

    userdata: {
      username: 'Alex',
      uid: '2sd23'
    },
    
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
    
    start: false,
    
    

    destroyUploader: function (uploader) {
      if ( uploader ){
        uploader.removeEventListener('start', function(){}, false);
        uploader.removeEventListener('progress', function(){}, false);
        uploader.removeEventListener('complete', function(){}, false);
        uploader.destroy();
        uploader = null;
      }
    },
    
    scrollDuration: 1000,

    scrollToLastMessage: function () {
      var $scrollEl = $('.b-viewMain');
      $scrollEl.animate({
        scrollTop: $scrollEl[0].scrollHeight
      }, app.scrollDuration);
    },

    /**
     * change page
     * @param page {string} - page name
     * @param trigger {boolean} - must be 'true'
     * @param dir {string} - direction to slide page // left|right|up|down
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
      
      setTimeout(function() {
        $('body').addClass('g-loading');
      }, 1)

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
    
    getFormData: function(form){
      var o = {};
      var a = form.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || undefined);
          } else {
              o[this.name] = this.value || undefined;
          }
      });
      return o;
    },
    
    /**
     * Server request and fetch data
     * @param command {string} - server command
     * @param params {object} - command params
     * @param callback {function} - callback for success response
     */
    fetch: function(command, params, callback, loader){
      
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
    
    /**
     * Server request and fetch data
     * @param command {string} - server command
     * @param model {object} - model
     * @param successFn {function} - callback for success response
     * @param errorFn {function} - callback for error response
     * @param loader {boolean} - loader
     */
    sync: function(command, model, loader, successFn, errorFn){
      if ( loader ){$('body').addClass('g-loading');}
      Backbone.sync(command, model, {
        success: function(response){
          // console.log(command, ': ', response);
          $('body').removeClass('g-loading');
          if ( successFn ){ successFn(response); }
        },
        error: function(error){
          //console.log(command, ': ', error);
          $('body').addClass('g-loading');
          if ( errorFn ){ errorFn(error); }
        }
      });
    },
    
    randomNum: function (min, max, num) {
      var i, arr = [], res = [];
      for (i = min; i <= max; i++ ) arr.push(i);
      for (i = 0; i < num; i++) res.push(arr.splice(Math.floor(Math.random() * (arr.length)), 1)[0])
      return res;
    },
  };

  window.app = app;
  
  return app;
});