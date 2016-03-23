var AppRouter = Jr.Router.extend({
  routes: {
    'home': 'home'
  },

  home: function(){
    app.homeView = new HomeView();
    this.renderView(app.homeView);
  }

});