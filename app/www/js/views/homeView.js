define([

  // libs
  'jquery',
  'underscore',
  'Backbone',
  'junior',

  // modules
  'utils',
  'settings',
  'viewData',
  'loader',
  'changePage',
  'clientServer',

  // models
  'models/exampleModel',

  // data
  'json!testdb/testdb.json',

  // templates
  'text!templates/homeTemplate.html'
], function ($, _, Backbone, Jr, app, settings, viewData, loader, changePage, clientServer, exampleModel, testdb, homeTemplate){
  
  var HomeView = Jr.View.extend({

    template: _.template(homeTemplate),
    
    render: function(){

      new viewData.call(this, true, false);

      this.viewData.data = testdb[0];

      this.$el.html(this.template(this.viewData));
      this.afterRender();
      return this;
    },

    afterRender: function() {
      loader.hide();
    },

    events: {
      'click [data-event]' : 'socketSend',
      'click [data-node-event]' : 'serverSend',
      'click .js-second' : 'second'
    },
    
    socketSend: clientServer.send,
    
    serverSend: function(){
      var model = Backbone.Model.extend({
        url: settings.nodeServer+'/test'
      });

      model = new model();

      app.sync('read', model, false, function(res){
        console.log(res.data);
      });
    },
    
    second: function(){
      changePage('chat', true, 'left');
    }
    
  });
  
  return HomeView;
});