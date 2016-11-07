export default request = {

  fetch(params, success, error, loader) {

    var promise = $.ajax();

    loader && appLoader.show();
    if ( app.online && params ) {
      promise = $.ajax(settings.sqlServer.url(), {
        method: 'POST',
        data: JSON.stringify(params),
        contentType: 'application/json',
        crossDomain: true,
        cache: false,
        dataType: 'json',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        success: function(res){
          request.logCommand(params, res);
          
          //init success callback if defined and is function
          checkCallback(successFn, res);
        },
        error: function(error){
          request.logCommand(params, res);
          //init error callback if defined and is function
          //checkCallback(errorFn, error);
        }
      });
    } else {
      appLoader && appLoader.hide();
      //popup.notification('disconnect', app.l10n.disconnect.popup, 522);
    }

    return promise;

  },

  logCommand(params, response){
    let _params = Array.isArray(params) ? params : [params];
    let _data = Array.isArray(response.data) ? response.data : [response.data];
    _params.forEach((param, index) => {
      let text = param.command+ ' : '+ _data[index];
      console.groupCollapsed(param.command);
      log('----- '+param.command+' -----', 'green');
      console.log(_data[index]);
      log('----- '+param.command+' -----', 'green');
      console.groupEnd();
    });
  }

}