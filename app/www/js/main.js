requirejs.config({
  baseUrl: 'js/lib',
  paths: {
    // lib
    jquery: 'jquery-2.1.4.min',
    modernizr: 'modernizr.custom',
    underscore: 'underscore-min',
    Backbone: 'backbone-min',
    junior: 'junior',
    socket: 'socket',
    text: 'text',
    montage: 'montage',
    bxSlider: 'bxslider',
    json: 'json',

    SocketIOFileUpload: 'file-uploader',
    
    // js
    utils: '../app',

    // additional js modules
    settings: '../additional/settings',
    randomNum: '../additional/randomNum',
    appRequest: '../additional/request',
    scrollToEnd: '../additional/scrollToEnd',
    changePage: '../additional/changePage',
    getFormData: '../additional/getFormData',
    loader: '../additional/loader',
    uploader: '../additional/uploader',
    viewData: '../additional/viewData',

    clientServer: '../server/clientServer',
    socketServer: '../server/socketServer',
    eventsCallback: '../server/eventsCallback',
    eventsSend: '../server/eventsSend',
    
    // templates
    templates: '../templates',
    
    // models
    models: '../models',
    
    // collections
    collections: '../collections',
    
    // router
    router: '../router/router',
    
    // test db
    testdb: '../testdb'
  }
});

require([
  'jquery',
  'router',
  'utils',
  'clientServer'
], function ($, Router, app, server){
  if ( !app.socket ){
    server.initServer();
  }
  app.router = new Router();
  Backbone.history.start();
  app.changePage('home', true);
});

File.prototype.convertToBase64 = function(callback){
  var FR = new FileReader();
  FR.onload = function(e) {
    callback(e.target.result)
  };       
  FR.readAsDataURL(this);
};