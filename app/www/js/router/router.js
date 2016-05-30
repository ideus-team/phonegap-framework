define([
  'jquery',
  'underscore',
  'Backbone',
  'junior',
  'utils',
  '../views/homeView',
  '../views/chatView',
  '../views/chatRoomView',
  '../views/errorView'
], function ($, _, Backbone, Jr, app, HomeView, SecondView, ChatView, ChatRoomView, ErrorView) {

  var Router = Jr.Router.extend({
    routes: {
      'home': 'home',
      'second': 'second',
      'chat': 'chat',
      'chat-room-:id': 'chatRoom',

      '*notFound': 'notFound'
    },

    home: function(){
      app.initialize();
      app.homeView = new HomeView();
      this.renderView(app.homeView, app.renderElem);
    },
    
    chat: function(){
      app.chatView = new ChatView();
      this.renderView(app.chatView, app.renderElem);
    },

    chatRoom: function (id) {
      app.chatRoomView = new ChatRoomView(id);
      this.renderView(app.chatRoomView, app.renderElem);
    },

    notFound: function () {
      app.errorView = new ErrorView();
      this.renderView(app.errorView, app.renderElem);
    }

  });
  
  return Router;
});