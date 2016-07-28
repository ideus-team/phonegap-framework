define(['socket', 'utils'], function (io, app) {

  var $this;

  var eventsCallback = {
      
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
        app.chatRoomView.$el.find('#messagefiles').val('');
        setTimeout(function(){
          app.chatRoomView.initGallery(messagesHolder.children().filter(':last').find('.js-imagesContainer'));
          app.scrollToLastMessage();
        }, 400);
      },
      
      disconnect: function(){
        delete app.socket;
        console.log('Disconect');
      },
      
      connect: function(){
        console.log('Connect');
        if ( !app.socket ){
          app.initServer();
          console.log('Connect New');
        }
      },

      getHistory: function(data){
        var viewData = {
          settings: {
            header: {
              visible: true,
              title: 'Chat room #'+app.chatRoomView.roomid
            },
            footer: {
              visible: true
            }
          },
          data: {
            user: app.userdata,
            history: data
          }
        };
        app.chatRoomView.$el.html(app.chatRoomView.template(viewData));
        app.chatRoomView.afterRender();
      },
      
      getRooms: function(data){
        var fragment = Backbone.history.getFragment();
        if ( fragment === 'chat' ){
          var viewData = {
            settings: {
              header: {
                visible: true,
                title: 'Chat'
              },
              footer: {
                visible: false
              }
            },
            data: {
              rooms: data
            }
          };

          app.chatView.$el.html(app.chatView.template(viewData));
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
  
  return eventsCallback;
});