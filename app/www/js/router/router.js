define([
  'jquery',
  'underscore',
  'Backbone',
  'junior',
  'utils',
  'settings',
  'views/homeView',
  'views/chatView',
  'views/chatRoomView',
  'views/errorView'
], function ($, _, Backbone, Jr, app, settings, HomeView, ChatView, ChatRoomView, ErrorView) {

  return Jr.Router.extend({
    routes: {
      'home': 'home',
      'second': 'second',
      'chat': 'chat',
      'chat-room-:id': 'chatRoom',

      '*notFound': 'notFound'
    },

    home: function() {
      app.initialize();
      app.homeView = new HomeView();
      this.renderView(app.homeView, settings.renderElem);
    },
    
    chat: function() {
      app.chatView = new ChatView();
      this.renderView(app.chatView, settings.renderElem);
    },

    chatRoom: function(id) {
      app.chatRoomView = new ChatRoomView(id);
      this.renderView(app.chatRoomView, settings.renderElem);
    },

    notFound: function() {
      app.errorView = new ErrorView();
      this.renderView(app.errorView, settings.renderElem);
    }

  });
});