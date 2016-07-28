define(['socket', 'utils'], function (io, app) {

  var $this;

  var eventsSend = {

    test: function(dataAttr, send){
      var event = dataAttr.event;
      var data = {
        event: event,
        data: dataAttr
      }
      if ( send ){
        send(data);
      }
    }

  }
  
  return eventsSend;
});