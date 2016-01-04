var HomeView = Jr.View.extend({
  render: function(){
    var data = {
      text: 'This text is example for load data from server',
      name: 'Alex'
    };
    
    this.$el.html(_.template(app.getTemplate('homeTemplate'), data));
    this.afterRender();
    return this;
  },

  afterRender: function() {
    
  },

  events: {}
  
});