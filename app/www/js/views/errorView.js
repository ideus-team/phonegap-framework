define([
  'jquery',
  'underscore',
  'Backbone',
  'junior',
  'utils',
  'text!templates/errorTemplate.html'
], function ($, _, Backbone, Jr, app, errorTemplate){
  
  var ErrorView = Jr.View.extend({

    template: _.template(errorTemplate),
    
    render: function(){
      var $this = this;
      $this.$el.html($this.template());
      $this.afterRender();
      return $this;
    },

    afterRender: function() {
      $('body').removeClass('g-loading');
    },

    events: {},
    
  });
  
  return ErrorView;
});