define([
  'jquery',
  'underscore',
  'Backbone',
  'utils'
], function($, _, Backbone, app){

  var MODEL_NAME_Model = Backbone.Model.extend({
    
    //defaultUrl: app.nodeServer+'user',
    url: app.nodeServer+'YOUR_REQUEST_URL',
    
    idAttribute: '_id',
    
    defaults: {},
    
    initialize: function(data){
      
    }
  });
  
  return MODEL_NAME_Model;
});