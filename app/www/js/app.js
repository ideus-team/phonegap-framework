define([
  'jquery',
  'underscore',
  'Backbone',
  'socket',
  'junior'
], function($, _, Backbone, io, Jr){

  var app = {
    
    /*
     * If debug = true - browser verstion
     * will be displayed. You must check if ( !app.debug )
     * in all places where with cordova plugin method call
    */
    debug: true,
    
    // ios || android
    developVersio: 'ios',
    
    sqlServer: '',
    nodeServer: 'http://localhost:8000',
    
    // main element where will be render all app content
    renderElem: '#app-main',
    
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
    
    initServer: function(){
      app.socket = app.socket || io.connect(app.nodeServer);
      app.server = app.server || new app.socketServer(app.socket);
      if ( !app.start ){
        for ( var event in app.methodFn ){
          app.server.on(event, app.methodFn[event]);
          app.start = true;
        }
      }
    },
    
    send: function(e, btn){
      var $this = btn || $(e.currentTarget);
      var dataAttr = $this.data();
      var event = dataAttr.event;
      app.methodData[event](dataAttr, function(data){
        if ( data ){
          app.server.request(data.event, data);
        }
      });
      e.preventDefault();
    },
    
    socketServer: function(socket){
      /**
       * Запрос на сервер
       * @param method {string} - название евента
       * @param params {object} - параметры
       * @param cb {callback} - функция которая выполнится после обработки запроса
       */
      this.request = function(method, params, cb){
        var data = {
          method: method,
          params: params,
          id: socket.id
        };
        socket.once('response', function(res){
          if(typeof cb == 'function'){
            cb(res);
          }
        });
        socket.emit('client', data);
      };

      /**
       * Подписываемся на евент
       * @param eventName {string} - название евента
       * @param cb {callback} - функция которая должна выполнится при евенте
       */
      this.on = function (eventName, cb){
        socket.on(eventName,function(){
          var args = [].slice.call(arguments);
          if(cb){
            cb.apply(socket, args);
          }
        });
      };

      /**
       * Слушаем сервер только один раз
       * @param eventName {string} - название евента
       * @param cb {callback} - функция которая должна выполнится при евенте
       */
      this.once = function (eventName, cb){
        socket.once(eventName,function(){
          var args = [].slice.call(arguments);
          if(cb){
            cb.apply(socket, args);
          }
        });
      };
    },
    
    methodData: {
      
      test: function(dataAttr, send){
        var event = dataAttr.event;
        var data = {
          event: event,
          data: dataAttr
        }
        if ( send ){
          send(data);
        }
      }
      
    },
    
    methodFn: {
      
      test: function(data){
        console.log('Test socket succesful');
      },
      
      disconnect: function(){
        delete app.socket;
        console.log('Disconect');
      },
      
      connect: function(){
        console.log('Connect');
        if ( !app.socket ){
          app.initServer();
          console.log('Connect New');
        }
      }
      
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
  
  return app;
});