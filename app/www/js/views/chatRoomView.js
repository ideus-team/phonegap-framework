define([
  'jquery',
  'underscore',
  'Backbone',
  'junior',
  'utils',
  'montage',
  'bxSlider',
  'SocketIOFileUpload',
  'text!templates/chatRoomTemplate.html'
], function ($, _, Backbone, Jr, app, montage, bxSlider, SocketIOFileUpload, chatRoomTemplate){

  var $this;

  var ChatRoomView = Jr.View.extend({

    template: _.template(chatRoomTemplate),
    
    initialize: function (id) {
      $this = this;
      $this.roomid = id;
    },

    render: function(){

      if ( app.socket ){
        var historyData = {
          clientEvent: 'getHistory',
          data: {
            roomid: $this.roomid
          }
        };
        app.server.request(historyData.clientEvent, historyData);
      }

      return $this;
    },

    afterRender: function() {
      $('body').removeClass('g-loading');
      $this.timeoutGallaryInit();
      $(window).resize($this.timeoutGallaryInit);
      $(document).on('keyup', $this.keyUp);

      setTimeout(function(){
        $this.joinToRoom($this.roomid);
        app.destroyUploader(app.chatView.uploader);
        app.destroyUploader($this.uploader);
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
          var ext = file.name.split('.')[file.name.split('.').length-1];
          console.log(fileStream);
          var fileData = {
            src: fileStream.path,
            title: file.name.split('.')[0],
            ext: ext
          };
          app.chatRoomView.sendData.files.push(fileData);
        });

      }, 100);
    },

    events: {
      'mousedown .js-imagesContainer a': 'galleryPopup',
      'submit .js-formMessage': 'sendMessage',
      'click .js-galleryClose': 'galleryClose',
      'click .js-back': 'back',
      'touchstart .js-imageGallery': 'popupTouchstart',
      'touchmove .js-imageGallery': 'popupTouchmove',
      'touchend .js-imageGallery': 'popupTouchend',
      'change #messagefiles': 'loadImage',
    },
    
    joinToRoom: function(roomid){
      if ( app.socket ){
        var joinData = {
          clientEvent: 'create',
          data: {
            roomId: roomid,
            user: app.userdata
          }
        };
        app.server.request(joinData.clientEvent, joinData);
      }
    },

    back: function () {
      app.destroyUploader($this.uploader);
      if ( app.socket ){
        var roomData = {
          clientEvent: 'leaveroom',
          data: {
            username: app.userdata.username,
            uid: app.userdata.uid,
            roomid: $this.roomid
          }
        };

        app.server.request(roomData.clientEvent, roomData);
      }
      app.changePage('chat', true, 'right');
    },

    keyUp: function (e) {
      var $galleryHolder = $('.js-imageGallery');
      if ( e.keyCode === 27 && $galleryHolder.is(':visible') ){
        $this.galleryClose();
      }
    },

    timeoutGallaryInit: function(){
      setTimeout($this.initGallery, 10);
    },

    popupTouchstart: function(e){
      $this.popuptouch = {
        x: e.originalEvent.touches[0].pageX,
        y: e.originalEvent.touches[0].pageY
      };
    },

    popupTouchend: function(e){
      $this.th = {
        x: e.originalEvent.changedTouches[0].pageX - $this.popuptouch.x,
        y: e.originalEvent.changedTouches[0].pageY - $this.popuptouch.y
      };
      console.log($this.th.y);
      if ( $this.th.y < -150 && ($this.th.x < 30 && $this.th.x > -30) ){
        $this.galleryClose();
      } else {
        $this.popupY = 0;
        var bxViewport = $this.$el.find('.js-imageGallery .bx-viewport');
        $this.setY($this.popupY, bxViewport);
      }
    },

    popupTouchmove: function(e){
      $this.th = {
        x: e.originalEvent.changedTouches[0].pageX - $this.popuptouch.x,
        y: e.originalEvent.changedTouches[0].pageY - $this.popuptouch.y
      };
      if ( /*$this.th.y < -150 && */($this.th.x < 30 && $this.th.x > -30) ){
        $this.popupY -= 5;
        var bxViewport = $this.$el.find('.js-imageGallery .bx-viewport');
        $this.setY($this.popupY, bxViewport);
      }
    },

    setY: function(y, el){
      el.css({
        '-webkit-transform': 'translateY('+$this.popupY+'px)',
        '-moz-transform': 'translateY('+$this.popupY+'px)',
        '-ms-transform': 'translateY('+$this.popupY+'px)',
        '-o-transform': 'translateY('+$this.popupY+'px)',
        'transform': 'translateY('+$this.popupY+'px)'
      });
    },

    initGallery: function(wraps){
      var galleryContainers = wraps || $this.$el.find('.js-imagesContainer');

      if ( galleryContainers.length ){
        galleryContainers.each(function(ind, container){
          var $container = $(container);
          var $links = $container.find('>a');
          var $imgs = $container.find('img');
          var k = $imgs.length;
          var n = 0;
          $imgs.hide();
          $imgs.each(function(ind, image){
            var $img = $(this);
            $('<img/>').load(function(){
              n++;
              $img.fadeIn();
              if ( k >= n ){
                var settings1 = {
                  fillLastRow : true,
                  alternateHeight : true,
                  alternateHeightRange : { min : 80, max : 300 },
                  margin: 1
                };
                var settings2 = {
                  fillLastRow : false,
                  alternateHeight : true,
                  alternateHeightRange : { min : 100, max : 400 },
                  margin: 1
                };
                var settings = $container.children().length > 1 ? settings1 : settings2;
                $container.montage(settings);

              }
            }).attr('src', $img.attr('src'));;
          });
        });
      }
    },

    galleryPopup: function(e){
      e.preventDefault();
      var photo = $(e.currentTarget);
      var photoIndex = photo.index();
      var messageHolder = photo.parents('.js-imagesContainer');
      var allPhotos = messageHolder.find('>a');
      var $galleryHolder = $('.js-imageGallery');
      var $galleryList = $('.js-galleryList');
      $galleryList.html('');
      $.each(allPhotos, function(index, link){
        var $link = $(link);
        var src = $link.data('image');
        var tpl = '<li class="b-imageGallery__item"><img src="'+src+'" alt=""></li>';
        $galleryList.append($(tpl));
        if ( (index+1) >= allPhotos.length ){
          $galleryHolder.fadeIn(function(){
            $this.gallery = $galleryList.bxSlider({
              pager: false,
              infiniteLoop: false,
              swipeThreshold: 20,
              speed: 200,
              preloadImages: 'visible',
              controls: false,
              startSlide: photoIndex
            });
        });
        }
      });
    },

    galleryClose: function(e){
      if ( e ){ e.preventDefault() }
      var $galleryHolder = $('.js-imageGallery');
      var $galleryList = $('.js-galleryList');
      $galleryHolder.fadeOut(function(){
        $this.gallery.destroySlider();
        $galleryList.html('');
        $this.popupY = 0;
        var bxViewport = $this.$el.find('.js-imageGallery .bx-viewport');
        $this.setY($this.popupY, bxViewport);
      });
    },

    sendMessage: function(e){
      if ( e ){ e.preventDefault() }
      var form = $(e.currentTarget);
      var formData = app.getFormData(form);
      $this.$el.find('#message').val('');
      if ( app.socket ){
        var messageData = {
          clientEvent: 'chatmessages',
          data: {
            form: formData,
            files: app.chatRoomView.sendData.files,
            user: app.userdata,
            socketId: app.socket.id,
            roomid: $this.roomid
          }
        };
        app.server.request(messageData.clientEvent, messageData);
      }
    },

    sendData: {
      files:  []
    },

    loadImage: function(e){
      var input = $(e.currentTarget);
      var files = input[0].files;
      if ( files ){
        $this.uploader.submitFiles(files);
      }
    },

  });
  
  return ChatRoomView;
});