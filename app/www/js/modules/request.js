define([
  'loader'
  'checkCallback'
], function(appLoader, checkCallback){
  
  return {

    /**
     * Server request and fetch data
     * @param command {string} - server command
     * @param params {object} - command params
     * @param callback {function} - callback for success\error response
     */
    fetch: function(command, params, successFn, errorFn, loader){
      
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
          
          //init success callback if defined and is function
          checkCallback(successFn, res);
        },
        error: function(error){
          console.log('Request error: ', command, error);
          //init error callback if defined and is function
          checkCallback(errorFn, error);
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
          console.log(command, ': ', response);
          // hide loader
          loader && appLoader.hide();

          //init success callback if defined
          checkCallback(successFn, response);
        },
        error: function(error){
          console.log(command, ': ', error);

          // hide loader
          loader && appLoader.hide();

          //init error callback if defined
          checkCallback(errorFn, error);
        }
      });
    },
  };
  
});