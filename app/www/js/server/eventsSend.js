define(['socket', 'utils'], function (io, app) {
  
  return {

    test: function(dataAttr, send){
      var event = dataAttr.event;
      var data = {
        event: event,
        data: dataAttr
      }
      
      send && typeof send === 'function' && send(data);
    }

  };
});