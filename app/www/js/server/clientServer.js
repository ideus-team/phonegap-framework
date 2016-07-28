define([
  'utils',
  'socket',
  'socketServer',
  'eventsCallback',
  'eventsSend'
], function (app, io, socketServer, eventsCallback, eventsSend) {

  var $this;

  var clientServer = {

    initServer: function(){
      $this = this;
      app.socket = app.socket || io.connect(app.nodeServer);
      app.server = app.server || new socketServer(app.socket);
      if ( !app.start ){
        for ( var event in eventsCallback ){
          app.server.on(event, eventsCallback[event]);
        }
        app.start = true;
      }
    },

    send: function(e, btn){
      var $this = btn || $(e.currentTarget);
      var dataAttr = $this.data();
      var event = dataAttr.event || null;
      if ( event ) {
        eventsSend[event](dataAttr, function(data){
          if ( data && app.server ){
            app.server.request(data.event, data);
          }
        });
      } else {
        console.log('Er');
      }
      e.preventDefault();
    }
    
  };
  
  return clientServer;
});