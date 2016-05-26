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
    appSettings: '../settings',
    
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
  'utils'
], function ($, Router, app){
  if ( !app.socket ){
    app.initServer();
  }
  $('body').addClass('g-loading');
  app.router = new Router();
  Backbone.history.start();
  app.changePage('chat', true);
  //app.changePage('home', true);
});

File.prototype.convertToBase64 = function(callback){
  var FR = new FileReader();
  FR.onload = function(e) {
    callback(e.target.result)
  };       
  FR.readAsDataURL(this);
};