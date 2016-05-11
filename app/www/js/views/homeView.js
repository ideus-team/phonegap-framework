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
      $this.$el.html($this.template(testdb[0]));
      $this.afterRender();
      return $this;
    },

    afterRender: function() {
     $('body').removeClass('g-loading');
    },

    events: {}
    
  });
  
  return HomeView;
});