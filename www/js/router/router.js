var AppRouter = Jr.Router.extend({
  routes: {
    'home': 'home'
  },

  home: function(){
    var homeView = new HomeView();
    this.renderView(homeView);
  }

});