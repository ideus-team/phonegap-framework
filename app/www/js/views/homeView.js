define([
  'jquery',
  'underscore',
  'Backbone',
  'junior',
  'utils',
  'models/exampleModel',
  'json!testdb/testdb.json',
  'text!templates/homeTemplate.html'
], function ($, _, Backbone, Jr, app, exampleModel, testdb, homeTemplate){
  
  var HomeView = Jr.View.extend({

    template: _.template(homeTemplate),
    
    render: function(){
      var $this = this;
      var viewData = {
        settings: {
          header: {
            visible: true,
            title: 'Main'
          },
          footer: {
            visible: true
          }
        },
        data: testdb[0]
      };
      $this.$el.html($this.template(viewData));
      $this.afterRender();
      return $this;
    },

    afterRender: function() {
      $('body').removeClass('g-loading');
      app.initServer();
    },

    events: {
      'click [data-event]' : 'socketSend',
      'click [data-node-event]' : 'serverSend'
    },
    
    socketSend: app.send,
    
    serverSend: function(){
      var model = Backbone.Model.extend({
        url: app.nodeServer+'/test'
      });
      model = new model();
      app.sync('read', model, false, function(res){
        console.log(res.data);
      });
    },
    
  });
  
  return HomeView;
});