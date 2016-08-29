define([
  'socket',
  'utils',
  'viewData',
  'scrollToEnd'
  'clientServer'
], function (io, app, viewData, scrollToEnd, clientServer) {
  
  return {
      
      test: function(data){
        console.log('Test socket succesful');
      },

      create: function(data){
        console.log('User ', data.user.username, 'connect to room ', data.roomId);
      },

      chatmessages: function(data){
        var template = _.template(chatMessage);
        var messagesHolder = app.chatRoomView.$el.find('.js-messages');
        data.messageOwner = data.user.uid === app.userdata.uid ? true : false;
        messagesHolder.append(template(data));
        app.chatRoomView.sendData.files = [];
        app.chatRoomView.$('#messagefiles').val('');
        setTimeout(function(){
          app.chatRoomView.initGallery(messagesHolder.children().filter(':last').find('.js-imagesContainer'));
          scrollToEnd.scroll('.b-viewMain');
        }, 400);
      },
      
      disconnect: function(){
        delete app.socket;
        console.log('Disconect');
      },
      
      connect: function(){
        console.log('Connect');
        if ( !app.socket ){
          clientServer.initServer();
          console.log('Connect New');
        }
      },

      getHistory: function(data){
        new viewData.call(app.chatRoomView, true, true);
        app.chatRoomView.viewData.settings.header.title = 'Chat room #'+app.chatRoomView.roomid;
        app.chatRoomView.viewData.data = { user: app.userdata, history: data };
        app.chatRoomView.$el.html(app.chatRoomView.template(app.chatRoomView.viewData));
        app.chatRoomView.afterRender();
      },
      
      getRooms: function(data){
        var fragment = Backbone.history.getFragment();
        if ( fragment === 'chat' ){
          new viewData.call(app.chatView, true, false);
          app.chatView.viewData.settings.header.title = 'Chat';
          app.chatView.viewData.data = { rooms: data };
          app.chatView.$el.html(app.chatView.template(app.chatView.viewData));
          app.chatView.afterRender();
        }
      },

      newUserConnect: function(data){
        console.log(data);
      },

      leaveroom: function(data){
        console.log(data);
      },

    },

  };

});