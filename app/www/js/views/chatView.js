define([
  'jquery',
  'underscore',
  'Backbone',
  'junior',
  'utils',
  'SocketIOFileUpload',
  'text!templates/chatTemplate.html'
], function ($, _, Backbone, Jr, app, SocketIOFileUpload, chatTemplate){
  var $this;
  var ChatView = Jr.View.extend({

    template: _.template(chatTemplate),
    
    render: function(){
      $this = this;

      if ( app.socket ){
        var roomsData = {
          clientEvent: 'getRooms',
          data: {}
        };
        app.server.request(roomsData.clientEvent, roomsData);
      }

      return $this;
    },

    afterRender: function() {
      $('body').removeClass('g-loading');
      app.destroyUploader(app.chatView.uploader);
      $this.uploader = new SocketIOFileUpload(app.socket);
      
      $this.uploader.addEventListener('start', function(event){
        $('body').addClass('g-loading');
      });

      $this.uploader.addEventListener('progress', function(event){
        var percent = event.bytesLoaded / event.file.size * 100;
        console.log("File is", percent.toFixed(2), "percent loaded");
      });

      $this.uploader.addEventListener('complete', function(event){
        $('body').removeClass('g-loading');
        var file = event.file;
        var fileStream = event.detail.stream;
        $this.groupImage = fileStream.path;
      });
    },

    events: {
      'mouseup [data-roomid]': 'gotoroom',
      'click .js-back': 'back',
      'click .js-addRoom': 'addRoom',
      'change #loadImageRoom': 'loadImage',
      'submit #add-room': 'createRoom',
    },

    back: function () {
      app.destroyUploader($this.uploader);
      app.changePage('home', true, 'right');
    },
    
    gotoroom: function (e) {
      var roomHolder = $(e.currentTarget);
      var id = roomHolder.data().roomid;
      app.destroyUploader($this.uploader);
      app.changePage('chat-room-'+id, true, 'left');
    },

    addRoom: function(){
      //app.changePage('addroom', true, 'left');
      var addRoom = $this.$el.find('.js-addRoom');
      addRoom.addClass('-state_active');
    },

    loadImage: function(e){
      var input = $(e.currentTarget);
      var files = input[0].files;
      if ( files ){
        $this.uploader.submitFiles(files);
      }
    },

    createRoom: function (e) {
      e.preventDefault();
      var form = $(e.currentTarget);
      var formData = app.getFormData(form);
      var addRoom = $this.$el.find('.js-addRoom');
      addRoom.removeClass('-state_active');
      form.find('input').val('');
      formData.img = $this.groupImage || 'img/nophoto.jpg';
      $this.$el.find('#message').val('');
      if ( app.socket ){
        var roomData = {
          clientEvent: 'newRoom',
          data: {
            title: formData.title,
            img: formData.img,
            creator: app.userdata.username,
            users: 0,
            messages: 0,
            lastMessage: null,
            lastMessageUser: null
          }
        };

        app.server.request(roomData.clientEvent, roomData);
      }
      //console.log(formData);
    }

  });
  
  return ChatView;
});