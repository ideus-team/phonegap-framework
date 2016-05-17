define([
  'jquery',
  'underscore',
  'Backbone',
  'junior',
  'utils',
  '../views/homeView'
], function ($, _, Backbone, Jr, app, HomeView) {

  var Router = Jr.Router.extend({
    routes: {
      'home': 'home'
    },

    home: function(){
      app.initialize();
      app.homeView = new HomeView();
      this.renderView(app.homeView, app.renderElem);
    },
    
  });
  
  return Router;
});