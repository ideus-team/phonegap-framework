define([
  'loader'
], function(appLoader){
  
  return {

    /**
     * Server request and fetch data
     * @param command {string} - server command
     * @param params {object} - command params
     * @param callback {function} - callback for success response
     */
    fetch: function(command, params, success, loader){
      
      var data = {
        command: command,
        params: params
      };

      loader && appLoader.show();
      
      $.ajax(settings.sqlServer, {
        method: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        crossDomain: true,
        cache: false,
        dataType: 'json',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        success: function(res){
          console.log('Request success: ', command, res);
          
          //init success callback if defined
          success && typeof success === 'function' && success(res);
        },
        error: function(error){
          console.log('Request error: ', command, error);
          return error;
        }
      });
      
    },
    
    /**
     * Server request and fetch data
     * @param command {string} - server command
     * @param model {object} - model
     * @param successFn {function} - callback for success response
     * @param errorFn {function} - callback for error response
     * @param loader {boolean} - loader
     */
    sync: function(command, model, loader, successFn, errorFn){
      // show loader
      loader && appLoader.show();

      Backbone.sync(command, model, {
        success: function(response){
          // hide loader
          loader && appLoader.hide();

          // console.log(command, ': ', response);

          //init success callback if defined
          successFn && typeof successFn === 'function' && successFn(response);
        },
        error: function(error){
          // hide loader
          loader && appLoader.hide();

          //console.log(command, ': ', error);

          //init error callback if defined
          errorFn && typeof errorFn === 'function' && errorFn(error);
        }
      });
    },
  };
  
});