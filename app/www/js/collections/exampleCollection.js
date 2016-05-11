define([
  'jquery',
  'underscore',
  'Backbone',
  'utils',
  'models/exampleModel'
], function($, _, Backbone, app, exampleModel){

  var ExampleCollection = Backbone.Collection.extend({
    
    model: exampleModel,
    
    defaultUrl: app.nodeServer+'/admin/getUserList',
    url: app.nodeServer+'/admin/getUserList',
    
    initialize: function(data){
      
    }
  });
  
  return ExampleCollection;
});