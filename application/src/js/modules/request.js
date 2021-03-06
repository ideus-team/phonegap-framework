import appLoader from './loader';
import settings from './settings';

let request = {};
export default request = {

  fetch(params, loader, success, error) {

    var promise = $.ajax();

    loader && appLoader.show();
    if ( /* App.online && */ params ) {
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
          //checkCallback(successFn, res);
        },
        error: function(error){
          //throw Error('Server error. Please try again later;');
          //request.logCommand(params, res);
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
    if ( !params.command ) { return }
    let _params = Array.isArray(params) ? params : [params];
    let _response = Array.isArray(response) ? response : [response];
    _params.forEach((param, index) => {
      console.groupCollapsed(param.command);
      log('----- '+param.command+' -----', 'black');
      console.log(_response[index].data);
      log('----- '+param.command+' -----', 'black');
      console.groupEnd();
    });
  }

}