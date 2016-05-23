define([
  'jquery',
  'underscore',
  'Backbone',
  'junior',
  'utils',
  '../views/homeView',
  '../views/errorView'
], function ($, _, Backbone, Jr, app, HomeView, ErrorView) {

  var Router = Jr.Router.extend({
    routes: {
      'home': 'home',
      'second': 'second',

      '*notFound': 'notFound'
    },

    home: function(){
      app.initialize();
      app.homeView = new HomeView();
      this.renderView(app.homeView, app.renderElem);
    },
    
    notFound: function () {
      app.errorView = new ErrorView();
      this.renderView(app.errorView, app.renderElem);
    }

  });
  
  return Router;
});