define([
  'utils',
  'socket',
  'socketServer',
  'eventsCallback',
  'eventsSend'
], function (app, io, socketServer, eventsCallback, eventsSend) {
  
  return {

    initServer: function(){
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
      var target = btn || $(e.currentTarget || window.event.target);
      var dataAttr = target.data();
      var event = dataAttr.event || null;
      if ( event ) {
        eventsSend[event](dataAttr, function(data){
          if ( data && app.server ){
            app.server.request(data.event, data);
          }
        });
      } else {
        throw new Error('Error: No "event" in "clientServer.js" method "send"');
      }
      e.preventDefault();
    }
    
  };
});