define([
  'jquery',
  'underscore',
  'Backbone',
  'junior',
  'utils',
  'loader',
  'uploader',
  'settings',
  'changePage',
  'getFormData',
  'SocketIOFileUpload',
  'text!templates/chatTemplate.html'
], function ($, _, Backbone, Jr, app, loader, uploader, settings, changePage, getFormData, SocketIOFileUpload, chatTemplate){

  return Jr.View.extend({

    template: _.template(chatTemplate),
    
    render: function(){
      
      if ( app.socket ){
        var roomsData = {
          clientEvent: 'getRooms',
          data: {}
        };
        app.server.request(roomsData.clientEvent, roomsData);
      }

      return this;
    },

    afterRender: function() {
      loader.hide();
      this.uploader && uploader.destroyUploader(app.chatView.uploader);
      this.uploader = new SocketIOFileUpload(app.socket);
      
      this.uploader.addEventListener('start', function(event){
        $('body').addClass('g-loading');
      });

      this.uploader.addEventListener('progress', function(event){
        var percent = event.bytesLoaded / event.file.size * 100;
        console.log("File is", percent.toFixed(2), "percent loaded");
      });

      this.uploader.addEventListener('complete', function(event){
        $('body').removeClass('g-loading');
        var file = event.file;
        var fileStream = event.detail.stream;
        app.chatView.groupImage = fileStream.path;
      });
    },

    events: {
      'mouseup [data-roomid]': 'gotoroom',
      'click .js-back': 'back',
      'click .js-addRoom': 'addRoom',
      'click .js-closeAddRoom': 'addRoomClose',
      'change #loadImageRoom': 'loadImage',
      'submit #add-room': 'createRoom',
    },

    back: function () {
      this.uploader && uploader.destroyUploader(this.uploader);
      changePage('home', true, 'right');
    },
    
    gotoroom: function (e) {
      var roomHolder = $(e.currentTarget);
      var id = roomHolder.data().roomid;
      this.uploader && uploader.destroyUploader(this.uploader);
      changePage('chat-room-'+id, true, 'left');
    },

    addRoom: function(){
      var addRoom = $this.$('.js-addRoomPopup');
      addRoom.addClass('-state_active');
    },

    addRoomClose: function(){
      var addRoom = $this.$('.js-addRoomPopup');
      addRoom.removeClass('-state_active');
    },

    loadImage: function(e){
      var input = $(e.currentTarget);
      var files = input[0].files;
      if ( files ){
        app.chatView.uploader.submitFiles(files);
      }
    },

    createRoom: function (e) {
      e.preventDefault();
      var form = $(e.currentTarget);
      var formData = getFormData(form);
      var addRoom = this.$('.js-addRoom');
      addRoom.removeClass('-state_active');
      form.find('input').val('');
      formData.img = this.groupImage || 'img/nophoto.jpg';
      this.$('#message').val('');
      if ( app.socket ){
        var roomData = {
          clientEvent: 'newRoom',
          data: {
            title: formData.title,
            img: formData.img,
            creator: app.userdata && app.userdata.username ? app.userdata.username : settings.testUser.username,
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

});