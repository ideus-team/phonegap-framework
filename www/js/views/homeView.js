var HomeView = Jr.View.extend({
  
  template: 'homeTemplate',
  
  render: function(){
    var data = {
      text: 'This text is example for load data from server',
      name: 'Alex'
    };
    
    this.$el.html(_.template(app.getTemplate(this.template), data));
    this.afterRender();
    return this;
  },

  afterRender: function() {
    console.log(this.$el.find('.content'));
  },

  events: {}
  
});