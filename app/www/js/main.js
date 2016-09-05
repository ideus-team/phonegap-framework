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

    // js modules
    settings: '../modules/settings',
    randomNum: '../modules/randomNum',
    appRequest: '../modules/request',
    scrollToEnd: '../modules/scrollToEnd',
    changePage: '../modules/changePage',
    getFormData: '../modules/getFormData',
    loader: '../modules/loader',
    uploader: '../modules/uploader',
    viewData: '../modules/viewData',
    checkCallback: '../modules/checkCallback',

    clientServer: '../server/clientServer',
    socketServer: '../server/socketServer',
    eventsCallback: '../server/eventsCallback',
    eventsSend: '../server/eventsSend',
    
    // templates
    templates: '../templates',

    // views
    views: '../views',
    
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
  'clientServer',
  'changePage'
], function ($, Router, app, server, changePage){
  if ( !app.socket ){
    server.initServer();
  }
  app.router = new Router();
  Backbone.history.start();
  changePage('home', true);
});

File.prototype.convertToBase64 = function(callback){
  var FR = new FileReader();
  FR.onload = function(e) {
    callback(e.target.result)
  };       
  FR.readAsDataURL(this);
};