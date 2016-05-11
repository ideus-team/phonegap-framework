requirejs.config({
  baseUrl: 'js/lib',
  paths: {
    // lib
    jquery: 'jquery-2.1.4.min',
    modernizr: 'modernizr.custom',
    underscore: 'underscore-min',
    Backbone: 'backbone-min',
    junior: 'junior',
    text: 'text',
    json: 'json',
    
    // js
    utils: '../app',
    appSettings: '../settings',
    
    // templates
    templates: '../templates',
    
    // models
    models: '../models',
    
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
  $('body').addClass('g-loading');
  app.router = new Router();
  Backbone.history.start();
  app.changePage('home', true);
});